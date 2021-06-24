import { ScrollToService, UpdateHostClassService } from 'ngx-tethys/core';
import { IThyListOptionParentComponent, THY_LIST_OPTION_PARENT_COMPONENT, ThyListLayout, ThyListOptionComponent } from 'ngx-tethys/shared';
import { coerceBooleanProperty, dom, helpers, keycodes } from 'ngx-tethys/util';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ThySelectionListChange } from './selection.interface';

export type ThyListSize = 'sm' | 'md' | 'lg';

const listSizesMap = {
    sm: 'thy-list-sm'
};

@Component({
    selector: 'thy-selection-list,[thy-selection-list]',
    template: '<ng-content></ng-content>',
    providers: [
        UpdateHostClassService,
        {
            provide: THY_LIST_OPTION_PARENT_COMPONENT,
            useExisting: ThySelectionListComponent
        },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySelectionListComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThySelectionListComponent implements OnInit, OnDestroy, AfterContentInit, IThyListOptionParentComponent, ControlValueAccessor {
    private _keyManager: ActiveDescendantKeyManager<ThyListOptionComponent>;

    private _selectionChangesUnsubscribe$ = Subscription.EMPTY;

    private _bindKeyEventUnsubscribe: () => void;

    private _modelValues: any[];

    /** The currently selected options. */
    selectionModel: SelectionModel<any>;

    disabled: boolean;

    layout: ThyListLayout = 'list';

    @HostBinding(`class.thy-list`) _isList = true;

    @HostBinding(`class.thy-selection-list`) _isSelectionList = true;

    @HostBinding(`class.thy-multiple-selection-list`) multiple = true;

    @HostBinding(`class.thy-grid-list`) isLayoutGrid = false;

    /** The option components contained within this selection-list. */
    @ContentChildren(ThyListOptionComponent) options: QueryList<ThyListOptionComponent>;

    @Input()
    set thyMultiple(value: any) {
        const previousValue = this.multiple;
        this.multiple = coerceBooleanProperty(value);
        if (previousValue !== this.multiple) {
            this._instanceSelectionModel();
        }
    }

    @Input() thyBindKeyEventContainer: HTMLElement | ElementRef | string;

    @Input() thyScrollContainer: HTMLElement | ElementRef | string;

    @Input() thyBeforeKeydown: (event?: KeyboardEvent) => boolean;

    @Input() thyUniqueKey: string;

    @Input() thyCompareWith: (o1: any, o2: any) => boolean;

    @Input() set thyLayout(value: ThyListLayout) {
        this.layout = value;
        this.isLayoutGrid = value === 'grid';
    }

    @Input() set thyAutoActiveFirstItem(value: boolean) {
        this.autoActiveFirstItem = coerceBooleanProperty(value);
    }

    @Input() set thySize(value: ThyListSize) {
        this._setListSize(value);
    }

    private spaceEnabled = true;
    /** Whether keydown space toggle focused option */
    @Input() set thySpaceKeyEnabled(value: boolean) {
        this.spaceEnabled = coerceBooleanProperty(value);
    }

    /** Emits a change event whenever the selected state of an option changes. */
    @Output() readonly thySelectionChange: EventEmitter<ThySelectionListChange> = new EventEmitter<ThySelectionListChange>();

    private autoActiveFirstItem: boolean;

    private _onTouched: () => void = () => {};

    private _onChange: (value: any) => void = (_: any) => {};

    private _emitChangeEvent(option: ThyListOptionComponent, event: Event) {
        this.thySelectionChange.emit({
            source: this,
            value: option.thyValue,
            option: option,
            event: event,
            selected: this.isSelected(option)
        });
    }

    private _emitModelValueChange() {
        if (this.options) {
            let selectedValues = this.selectionModel.selected;
            if (this.thyUniqueKey) {
                selectedValues = selectedValues.map(selectedValue => {
                    const selectedOption = this.options.find(option => {
                        return option.thyValue[this.thyUniqueKey] === selectedValue;
                    });
                    if (selectedOption) {
                        return selectedOption.thyValue;
                    } else {
                        return this._modelValues.find(value => {
                            return value[this.thyUniqueKey] === selectedValue;
                        });
                    }
                });
            }
            this._modelValues = selectedValues;
            let changeValue = selectedValues;
            if (!this.multiple && selectedValues && selectedValues.length > 0) {
                changeValue = selectedValues[0];
            }
            this._onChange(changeValue);
        }
    }

    private _toggleFocusedOption(event: KeyboardEvent): void {
        if (this._keyManager.activeItem) {
            this.ngZone.run(() => {
                this.toggleOption(this._keyManager.activeItem, event);
            });
        }
    }

    private _initializeFocusKeyManager() {
        this._keyManager = new ActiveDescendantKeyManager<ThyListOptionComponent>(this.options)
            .withWrap()
            // .withTypeAhead()
            // Allow disabled items to be focusable. For accessibility reasons, there must be a way for
            // screenreader users, that allows reading the different options of the list.
            .skipPredicate(() => false);
    }

    private _instanceSelectionModel() {
        this.selectionModel = new SelectionModel<any>(this.multiple);
    }

    private _getElementBySelector(element: HTMLElement | ElementRef | string): HTMLElement {
        return dom.getHTMLElementBySelector(element, this.elementRef);
    }

    private _getOptionSelectionValue(option: ThyListOptionComponent) {
        if (option.thyValue) {
            return this.thyUniqueKey ? option.thyValue[this.thyUniqueKey] : option.thyValue;
        } else {
            return option;
        }
    }

    private _setSelectionByValues(values: any[]) {
        this.selectionModel.clear();
        values.forEach(value => {
            if (this.thyUniqueKey) {
                this.selectionModel.select(value[this.thyUniqueKey]);
            } else {
                this.selectionModel.select(value);
            }
        });
    }

    private _setAllOptionsSelected(toIsSelected: boolean) {
        // Keep track of whether anything changed, because we only want to
        // emit the changed event when something actually changed.
        let hasChanged = false;

        this.options.forEach(option => {
            const fromIsSelected = this.selectionModel.isSelected(option.thyValue);
            if (fromIsSelected !== toIsSelected) {
                hasChanged = true;
                this.selectionModel.toggle(option.thyValue);
            }
        });

        if (hasChanged) {
            this._emitModelValueChange();
        }
    }

    private _setListSize(size: ThyListSize) {
        for (const key in listSizesMap) {
            if (listSizesMap.hasOwnProperty(key)) {
                this.updateHostClassService.removeClass(listSizesMap[key]);
            }
        }
        if (size) {
            this.updateHostClassService.addClass(listSizesMap[size]);
        }
    }

    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private ngZone: NgZone,
        private updateHostClassService: UpdateHostClassService
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        const bindKeyEventElement = this._getElementBySelector(this.thyBindKeyEventContainer);
        this.ngZone.runOutsideAngular(() => {
            this._bindKeyEventUnsubscribe = this.renderer.listen(bindKeyEventElement, 'keydown', this.onKeydown.bind(this));
        });
        this._instanceSelectionModel();
    }

    writeValue(value: any[] | any): void {
        if (value) {
            if (this.multiple && !helpers.isArray(value)) {
                throw new Error(`multiple selection ngModel must be array.`);
            }
            if (!this.multiple && helpers.isArray(value)) {
                throw new Error(`single selection ngModel not be array.`);
            }
        }
        const values = helpers.isArray(value) ? value : value ? [value] : [];
        this._modelValues = values;
        if (this.options) {
            this._setSelectionByValues(values);
        }
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
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
                if (keyCode === keycodes.SPACE && !this.spaceEnabled) {
                    return;
                }
                this._toggleFocusedOption(event);
                // Always prevent space from scrolling the page since the list has focus
                event.preventDefault();
                break;
            default:
                manager.onKeydown(event);
        }
        if (
            (keyCode === keycodes.UP_ARROW || keyCode === keycodes.DOWN_ARROW) &&
            event.shiftKey &&
            manager.activeItemIndex !== previousFocusIndex
        ) {
            this._toggleFocusedOption(event);
        }
    }

    toggleOption(option: ThyListOptionComponent, event?: Event) {
        if (option && !option.disabled) {
            this.selectionModel.toggle(this._getOptionSelectionValue(option));
            // Emit a change event because the focused option changed its state through user
            // interaction.
            this._emitModelValueChange();
            this._emitChangeEvent(option, event);
        }
    }

    setActiveOption(option: ThyListOptionComponent) {
        this._keyManager.updateActiveItem(option); // .updateActiveItemIndex(this._getOptionIndex(option));
    }

    scrollIntoView(option: ThyListOptionComponent) {
        const scrollContainerElement = dom.getHTMLElementBySelector(this.thyScrollContainer, this.elementRef);
        ScrollToService.scrollToElement(option.element.nativeElement, scrollContainerElement);
    }

    isSelected(option: ThyListOptionComponent) {
        return this.selectionModel.isSelected(this._getOptionSelectionValue(option));
    }

    /** Selects all of the options. */
    selectAll() {
        this._setAllOptionsSelected(true);
    }

    /** Deselects all of the options. */
    deselectAll() {
        this._setAllOptionsSelected(false);
    }

    ngAfterContentInit(): void {
        this._initializeFocusKeyManager();
        this.options.changes.pipe(startWith(true)).subscribe(() => {
            if (this.autoActiveFirstItem) {
                if (!this._keyManager.activeItem || this.options.toArray().indexOf(this._keyManager.activeItem) < 0) {
                    this._keyManager.setFirstItemActive();
                }
            }
        });
    }

    ngOnDestroy() {
        this._selectionChangesUnsubscribe$.unsubscribe();
        if (this._bindKeyEventUnsubscribe) {
            this._bindKeyEventUnsubscribe();
        }
    }
}
