import {
    Directive,
    ElementRef,
    Injectable,
    NgZone,
    OnDestroy,
    Input,
    OnInit,
    ViewContainerRef,
    HostBinding,
    Optional,
    Inject,
    ChangeDetectorRef
} from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { InputBoolean, InputNumber, ThyPlacement } from 'ngx-tethys/core';
import { ThyAutocompleteService } from './overlay/autocomplete.service';
import { ThyAutocompleteRef } from './overlay/autocomplete-ref';
import { ThyAutocomplete } from './autocomplete.component';
import { ThyOption, ThyOptionSelectionChangeEvent } from 'ngx-tethys/shared';
import { DOCUMENT } from '@angular/common';
import { Subject, Observable, merge, fromEvent, of, Subscription } from 'rxjs';
import { ESCAPE, UP_ARROW, ENTER, DOWN_ARROW, TAB } from 'ngx-tethys/util';
import { filter, map, take, tap, delay, switchMap } from 'rxjs/operators';
import { ScrollToService } from 'ngx-tethys/core';
import { warnDeprecation } from 'ngx-tethys/util';

/**
 * 自动完成触发指令
 * @name thyAutocomplete
 */
@Directive({
    selector:
        'input[thyAutocompleteTrigger], textarea[thyAutocompleteTrigger], thy-input[thyAutocompleteTrigger], thy-input-search[thyAutocompleteTrigger], input[thyAutocomplete], textarea[thyAutocomplete], thy-input[thyAutocomplete], thy-input-search[thyAutocomplete]',
    exportAs: 'thyAutocompleteTrigger, thyAutocomplete',
    host: {
        '(input)': 'handleInput($event)',
        '(focusin)': 'onFocus()',
        '(keydown)': 'onKeydown($event)'
    },
    standalone: true
})
export class ThyAutocompleteTriggerDirective implements OnInit, OnDestroy {
    protected overlayRef: OverlayRef;

    private autocompleteRef: ThyAutocompleteRef<ThyAutocomplete>;

    private readonly closeKeyEventStream = new Subject<void>();

    private closingActionsSubscription: Subscription;

    private _autocompleteComponent: ThyAutocomplete;

    @HostBinding(`class.thy-autocomplete-opened`) panelOpened = false;

    /**
     * 下拉菜单组件实例。已废弃，请使用 thyAutocomplete
     * @type thyAutocompleteComponent
     * @deprecated
     */
    @Input('thyAutocompleteComponent')
    set autocompleteComponent(data: ThyAutocomplete) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            warnDeprecation(`The property thyAutocompleteComponent will be deprecated, please use thyAutocomplete instead.`);
        }
        this._autocompleteComponent = data;
    }

    /**
     * 下拉菜单组件实例
     * @type thyAutocompleteComponent
     */
    @Input('thyAutocomplete')
    set autocomplete(data: ThyAutocomplete) {
        this._autocompleteComponent = data;
    }

    get autocompleteComponent() {
        return this._autocompleteComponent;
    }

    /**
     * 弹出框默认 offset
     * @type number
     */
    @Input() @InputNumber() thyOffset = 4;

    /**
     * 下拉菜单的宽度，不设置默认与输入框同宽
     * @type number
     */
    @Input() @InputNumber() thyAutocompleteWidth: number;

    /**
     * 下拉菜单的显示位置，'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'
     * @type string
     */
    @Input() thyPlacement: ThyPlacement = 'bottomLeft';

    /**
     * 是否允许聚焦时打开下拉菜单
     * @type boolean
     */
    @Input() @InputBoolean() thyIsFocusOpen = true;

    get activeOption(): ThyOption | null {
        if (this.autocompleteComponent && this.autocompleteComponent.keyManager) {
            return this.autocompleteComponent.keyManager.activeItem;
        }

        return null;
    }

    get panelClosingActions(): Observable<ThyOptionSelectionChangeEvent | null> {
        return merge(
            this.autocompleteComponent.thyOptionSelected,
            this.autocompleteComponent.keyManager.tabOut.pipe(filter(() => this.panelOpened)),
            this.closeKeyEventStream,
            this.getOutsideClickStream(),
            this.overlayRef ? this.overlayRef.detachments().pipe(filter(() => this.panelOpened)) : of()
        ).pipe(
            // Normalize the output so we return a consistent type.
            map(event => (event instanceof ThyOptionSelectionChangeEvent ? event : null))
        );
    }

    constructor(
        private elementRef: ElementRef,
        private ngZone: NgZone,
        private overlay: Overlay,
        private autocompleteService: ThyAutocompleteService,
        private viewContainerRef: ViewContainerRef,
        @Optional() @Inject(DOCUMENT) private document: any,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {}

    onFocus() {
        if (this.canOpen() && this.thyIsFocusOpen) {
            this.openPanel();
        }
    }

    onKeydown(event: KeyboardEvent) {
        const keyCode = event.keyCode;
        // Prevent the default action on all escape key presses. This is here primarily to bring IE
        // in line with other browsers. By default, pressing escape on IE will cause it to revert
        // the input value to the one that it had on focus, however it won't dispatch any events
        // which means that the model value will be out of sync with the view.
        if (keyCode === ESCAPE) {
            event.preventDefault();
        }
        if (this.activeOption && keyCode === ENTER && this.panelOpened) {
            this.activeOption.selectViaInteraction();
            this.resetActiveItem();
            event.preventDefault();
        } else if (this.autocompleteComponent) {
            const prevActiveItem = this.autocompleteComponent.keyManager.activeItem;
            const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;
            if (this.panelOpened || keyCode === TAB) {
                this.autocompleteComponent.keyManager.onKeydown(event);
            } else if (isArrowKey && this.canOpen()) {
                this.openPanel();
            }
            if (
                (isArrowKey || this.autocompleteComponent.keyManager.activeItem !== prevActiveItem) &&
                this.autocompleteComponent.keyManager.activeItem
            ) {
                ScrollToService.scrollToElement(
                    this.autocompleteComponent.keyManager.activeItem.element.nativeElement,
                    this.autocompleteComponent.optionsContainer.nativeElement
                );
            }
        }
    }

    handleInput(event: KeyboardEvent) {
        if (this.canOpen() && document.activeElement === event.target) {
            this.openPanel();
        }
    }

    openPanel() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            return;
        }
        const overlayRef = this.createOverlay();
        this.overlayRef = overlayRef;
        overlayRef.keydownEvents().subscribe(event => {
            // Close when pressing ESCAPE or ALT + UP_ARROW, based on the a11y guidelines.
            // See: https://www.w3.org/TR/wai-aria-practices-1.1/#textbox-keyboard-interaction
            if (event.keyCode === ESCAPE || (event.keyCode === UP_ARROW && event.altKey)) {
                this.resetActiveItem();
                this.closeKeyEventStream.next();
                // We need to stop propagation, otherwise the event will eventually
                // reach the input itself and cause the overlay to be reopened.
                event.stopPropagation();
                event.preventDefault();
            }
        });
        this.panelOpened = true;
        this.autocompleteComponent.open();
    }

    closePanel() {
        if (this.autocompleteRef) {
            this.autocompleteRef.close();
            this.cdr.detectChanges();
            this.closingActionsSubscription.unsubscribe();
        }
    }

    createOverlay(): OverlayRef {
        const config = Object.assign({
            origin: this.elementRef.nativeElement,
            viewContainerRef: this.viewContainerRef,
            placement: this.thyPlacement,
            offset: this.thyOffset,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            width: this.thyAutocompleteWidth || this.elementRef.nativeElement.clientWidth
        });
        this.autocompleteRef = this.autocompleteService.open(this.autocompleteComponent.contentTemplateRef, config);
        this.autocompleteRef.afterClosed().subscribe(() => {
            this.panelOpened = false;
            this.autocompleteComponent.close();
        });
        // delay 200ms to prevent emit document click rightnow
        this.autocompleteRef
            .afterOpened()
            .pipe(delay(200))
            .subscribe(() => {
                this.closingActionsSubscription = this.subscribeToClosingActions();
            });
        return this.autocompleteRef.getOverlayRef();
    }

    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    private subscribeToClosingActions(): Subscription {
        const firstStable = this.ngZone.onStable.asObservable().pipe(take(1));
        const optionChanges = this.autocompleteComponent.options.changes.pipe(
            // Defer emitting to the stream until the next tick, because changing
            // bindings in here will cause "changed after checked" errors.
            delay(0)
        );
        // When the zone is stable initially, and when the option list changes...
        return (
            merge(firstStable, optionChanges)
                .pipe(
                    // create a new stream of panelClosingActions, replacing any previous streams
                    // that were created, and flatten it so our stream only emits closing events...
                    switchMap(() => {
                        this.resetActiveItem();

                        if (this.panelOpened) {
                            this.overlayRef.updatePosition();
                        }
                        return this.panelClosingActions;
                    }),
                    // when the first closing event occurs...
                    take(1)
                )
                // set the value, close the panel, and complete.
                .subscribe(event => this.setValueAndClose(event))
        );
    }

    private setValueAndClose(event: ThyOptionSelectionChangeEvent | null): void {
        if (event && event.option) {
            this.setValue(event.option.thyLabelText);
        }
        this.closePanel();
    }

    /** Stream of clicks outside of the autocomplete panel. */
    private getOutsideClickStream(): Observable<any> {
        return merge(
            fromEvent(this.document, 'click') as Observable<MouseEvent>,
            fromEvent(this.document, 'touchend') as Observable<TouchEvent>
        ).pipe(
            filter(event => {
                // If we're in the Shadow DOM, the event target will be the shadow root, so we have to
                // fall back to check the first element in the path of the click event.
                const clickTarget = event.target as HTMLElement;
                const formField: any = null;

                return (
                    this.panelOpened &&
                    clickTarget !== this.elementRef.nativeElement &&
                    !this.elementRef.nativeElement.contains(clickTarget) &&
                    (!formField || !formField.contains(clickTarget)) &&
                    !!this.overlayRef &&
                    !this.overlayRef.overlayElement.contains(clickTarget)
                );
            })
        );
    }

    private setValue(value: string) {
        const input = this.elementRef.nativeElement.querySelector('input');
        const element = input ? input : this.elementRef.nativeElement;
        element.value = value;
        element.focus();
    }

    private canOpen(): boolean {
        const element: HTMLInputElement = this.elementRef.nativeElement;
        return !element.readOnly && !element.disabled;
    }

    private resetActiveItem(): void {
        this.autocompleteComponent.keyManager.setActiveItem(this.autocompleteComponent.thyAutoActiveFirstOption ? 0 : -1);
    }

    private destroyPanel(): void {
        if (this.overlayRef) {
            this.closePanel();
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }

    ngOnDestroy() {
        this.closeKeyEventStream.complete();
        this.destroyPanel();
    }
}
