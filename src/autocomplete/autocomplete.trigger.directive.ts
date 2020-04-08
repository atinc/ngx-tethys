import {
    Directive,
    ElementRef,
    Injectable,
    NgZone,
    OnDestroy,
    Input,
    TemplateRef,
    OnInit,
    ViewContainerRef,
    HostBinding,
    HostListener,
    Optional,
    Inject
} from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ThyOverlayDirectiveBase, ThyPlacement } from '../core/overlay';
import { ThyAutocompleteService } from './overlay/autocomplete.service';
import { ThyAutocompleteRef } from './overlay/autocomplete-ref';
import { ThyAutocompleteComponent } from './autocomplete.component';
import { ThyAutoOptionComponent } from './option.component';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
    selector: 'input[thyAutocompleteTrigger]',
    host: {
        '(input)': 'handleInput($event)'
    }
})
export class ThyAutocompleteTriggerDirective extends ThyOverlayDirectiveBase implements OnInit, OnDestroy {
    @HostBinding(`class.thy-autocomplete-opened`) autocompleteOpened = false;

    @Input('thyAutocomplete') autocompleteComponent: ThyAutocompleteComponent;

    @Input() thyOffset = 8;

    @Input() thyAutocompleteWidth: number;

    @Input() thyPlacement: ThyPlacement = 'bottomLeft';

    private autocompleteRef: ThyAutocompleteRef<any>;

    constructor(
        elementRef: ElementRef,
        platform: Platform,
        focusMonitor: FocusMonitor,
        ngZone: NgZone,
        private overlay: Overlay,
        private autocompleteService: ThyAutocompleteService,
        private viewContainerRef: ViewContainerRef,
        @Optional() @Inject(DOCUMENT) private document: any
    ) {
        super(elementRef, platform, focusMonitor, ngZone);
    }

    ngOnInit(): void {
        this.trigger = 'click';
        this.initialize();
        this.autocompleteComponent.optionSelected.subscribe((option: ThyAutoOptionComponent) => {
            this.hide();
            this.setValue(option.thyLabelText);
        });
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
            this.autocompleteOpened = false;
            this.autocompleteComponent.autocompleteOpened = false;
            this.autocompleteComponent.closed.emit();
        });
        return this.autocompleteRef.getOverlayRef();
    }

    show() {
        if (this.disabled || (this.overlayRef && this.overlayRef.hasAttached())) {
            return;
        }
        const overlayRef = this.createOverlay();
        this.overlayRef = overlayRef;
        this.autocompleteOpened = true;
        this.autocompleteComponent.opened.emit();
        this.autocompleteComponent.open();
    }

    hide() {
        if (this.autocompleteRef) {
            this.autocompleteRef.close();
        }
    }

    handleInput(event: KeyboardEvent) {
        if (this.canOpen() && document.activeElement === event.target) {
            this.show();
        }
    }

    setValue(value: string) {
        this.elementRef.nativeElement.value = value;
        this.elementRef.nativeElement.focus();
    }

    private canOpen(): boolean {
        const element: HTMLInputElement = this.elementRef.nativeElement;
        return !element.readOnly && !element.disabled;
    }

    ngOnDestroy() {
        this.dispose();
    }
}
