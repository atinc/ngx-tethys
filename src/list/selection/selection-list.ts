import {
    Component,
    Input,
    HostBinding,
    ContentChildren,
    QueryList,
    ChangeDetectionStrategy,
    AfterContentInit,
    Renderer2,
    ElementRef,
    OnInit,
    EventEmitter,
    Output,
    OnDestroy,
    Inject,
    NgZone
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {
    ThyListOptionComponent,
    THY_OPTION_PARENT_COMPONENT,
    IThyOptionParentComponent
} from '../../core/option';
import { keycodes, helpers } from '../../util';
import { inputValueToBoolean } from '../../util/helpers';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/platform-browser';
import { ThySelectionListChange } from './selection.interface';


@Component({
    selector: 'thy-selection-list,[thy-selection-list]',
    template: '<ng-content></ng-content>',
    providers: [
        {
            provide: THY_OPTION_PARENT_COMPONENT,
            useExisting: ThySelectionListComponent
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThySelectionListComponent implements OnInit, OnDestroy, IThyOptionParentComponent, AfterContentInit {

    private _keyManager: FocusKeyManager<ThyListOptionComponent>;

    private _selectionChangesUnsubscribe$ = Subscription.EMPTY;

    private _bindKeyEventUnsubscribe: () => void;

    /** The currently selected options. */
    selectionModel: SelectionModel<ThyListOptionComponent>;

    @HostBinding(`class.thy-list`) _isList = true;

    @HostBinding(`class.thy-selection-list`) _isSelectionList = true;

    @HostBinding(`class.thy-multiple-selection-list`) multiple?: boolean;

    /** The option components contained within this selection-list. */
    @ContentChildren(ThyListOptionComponent) options: QueryList<ThyListOptionComponent>;

    @Input()
    set thyMultiple(value: any) {
        const previousValue = this.multiple;
        this.multiple = inputValueToBoolean(value);
        if (previousValue !== this.multiple) {
            this._instanceSelectionModel();
            this._subscribeSelectionModelChanges();
        }
    }

    @Input() thyBindKeyEventContainer: HTMLElement | ElementRef | string;

    @Input() thyBeforeKeydown: (event?: KeyboardEvent) => boolean;

    /** Emits a change event whenever the selected state of an option changes. */
    @Output() readonly thySelectionChange: EventEmitter<ThySelectionListChange> =
        new EventEmitter<ThySelectionListChange>();

    private _emitChangeEvent(option: ThyListOptionComponent) {
        this.thySelectionChange.emit({
            source: this,
            option: option
        });
    }

    private _toggleFocusedOption(): void {
        if (this._keyManager.activeItem) {
            this.ngZone.run(() => {
                this.toggleOption(this._keyManager.activeItem);
            });
        }
    }

    private _initializeFocusKeyManager() {
        this._keyManager = new FocusKeyManager<ThyListOptionComponent>(this.options)
            .withWrap()
            // .withTypeAhead()
            // Allow disabled items to be focusable. For accessibility reasons, there must be a way for
            // screenreader users, that allows reading the different options of the list.
            .skipPredicate(() => false);
    }

    private _subscribeSelectionModelChanges() {
        // Sync external changes to the model back to the options.
        this._selectionChangesUnsubscribe$ = this.selectionModel.onChange.subscribe(event => {
            if (event.added) {
                for (const item of event.added) {
                    item.selected = true;
                }
            }

            if (event.removed) {
                for (const item of event.removed) {
                    item.selected = false;
                }
            }
        });
    }

    private _instanceSelectionModel() {
        this.selectionModel = new SelectionModel<ThyListOptionComponent>(this.multiple);
    }

    private _getSelectorElement(element: HTMLElement | ElementRef | string) {
        if (!element) {
            return this.elementRef.nativeElement;
        } else if (element === 'body') {
            return this.document;
        } else if (helpers.isString(element)) {
            return this.document.querySelector(element as string);
        } else if (element instanceof ElementRef) {
            return element.nativeElement;
        } else {
            return element;
        }
    }

    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef,
        @Inject(DOCUMENT) private document: Document,
        private ngZone: NgZone
    ) {
    }

    ngOnInit() {
        const bindKeyEventElement = this._getSelectorElement(this.thyBindKeyEventContainer);
        this.ngZone.runOutsideAngular(() => {
            this._bindKeyEventUnsubscribe = this.renderer.listen(bindKeyEventElement, 'keydown', this.onKeydown.bind(this));
        });
        this._instanceSelectionModel();
    }

    onKeydown(event: KeyboardEvent) {
        if (this.thyBeforeKeydown) {
            // stop key down event
            const isContinue = this.thyBeforeKeydown(event);
            if (!isContinue) {
                return;
            }
        }
        const keyCode = event.keyCode || event.which;
        const manager = this._keyManager;
        const previousFocusIndex = manager.activeItemIndex;

        switch (keyCode) {
            case keycodes.SPACE:
            case keycodes.ENTER:
                this._toggleFocusedOption();
                // Always prevent space from scrolling the page since the list has focus
                event.preventDefault();
                break;
            default:
                manager.onKeydown(event);
        }

        if ((keyCode === keycodes.UP_ARROW || keyCode === keycodes.DOWN_ARROW) && event.shiftKey &&
            manager.activeItemIndex !== previousFocusIndex) {
            this._toggleFocusedOption();
        }
    }

    toggleOption(option: ThyListOptionComponent) {
        if (option && !option.disabled) {
            this.selectionModel.toggle(option);
            // Emit a change event because the focused option changed its state through user
            // interaction.
            this._emitChangeEvent(option);
        }
    }

    setFocusedOption(option: ThyListOptionComponent) {
        this._keyManager.updateActiveItem(option); // .updateActiveItemIndex(this._getOptionIndex(option));
    }

    ngAfterContentInit(): void {
        this._initializeFocusKeyManager();
        this._subscribeSelectionModelChanges();
        // if (this._tempValues) {
        //     this._setOptionsFromValues(this._tempValues);
        //     this._tempValues = null;
        // }

        // // Sync external changes to the model back to the options.
        // this._modelChanges = this.selectedOptions.onChange.subscribe(event => {
        //     if (event.added) {
        //         for (let item of event.added) {
        //             item.selected = true;
        //         }
        //     }

        //     if (event.removed) {
        //         for (let item of event.removed) {
        //             item.selected = false;
        //         }
        //     }
        // });
    }

    ngOnDestroy() {
        this._selectionChangesUnsubscribe$.unsubscribe();
        if (this._bindKeyEventUnsubscribe) {
            this._bindKeyEventUnsubscribe();
        }
    }
}
