import { ScrollToService } from 'ngx-tethys/core';
import { IThyListOptionParentComponent, THY_LIST_OPTION_PARENT_COMPONENT, ThyListLayout, ThyListOption } from 'ngx-tethys/shared';
import { coerceBooleanProperty, dom, helpers, keycodes } from 'ngx-tethys/util';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, Input, NgZone, OnDestroy, OnInit, Output, QueryList, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ThySelectionListChange } from './selection.interface';

export type ThyListSize = 'sm' | 'md' | 'lg';

const listSizesMap = {
    sm: 'thy-list-sm'
};

/**
 * @name thy-selection-list,[thy-selection-list]
 * @order 20
 */
@Component({
    selector: 'thy-selection-list,[thy-selection-list]',
    template: '<ng-content></ng-content>',
    providers: [
        {
            provide: THY_LIST_OPTION_PARENT_COMPONENT,
            useExisting: ThySelectionList
        },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySelectionList),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ThySelectionList implements OnInit, OnDestroy, AfterContentInit, IThyListOptionParentComponent, ControlValueAccessor {
    private renderer = inject(Renderer2);
    private elementRef = inject(ElementRef);
    private ngZone = inject(NgZone);
    private changeDetectorRef = inject(ChangeDetectorRef);

    private _keyManager: ActiveDescendantKeyManager<ThyListOption>;

    private _selectionChangesUnsubscribe$ = Subscription.EMPTY;

    private _bindKeyEventUnsubscribe: () => void;

    private _modelValues: any[];

    private hostRenderer = useHostRenderer();

    /** The currently selected options. */
    selectionModel: SelectionModel<any>;

    disabled: boolean;

    layout: ThyListLayout = 'list';

    @HostBinding(`class.thy-list`) _isList = true;

    @HostBinding(`class.thy-selection-list`) _isSelectionList = true;

    @HostBinding(`class.thy-multiple-selection-list`) multiple = true;

    @HostBinding(`class.thy-grid-list`) isLayoutGrid = false;

    /**
     * @internal
     */
    @ContentChildren(ThyListOption, { descendants: true }) options: QueryList<ThyListOption>;

    /**
     * 改变 grid item 的选择模式，使其支持多选
     * @default true
     */
    @Input({ transform: coerceBooleanProperty })
    set thyMultiple(value: boolean) {
        const previousValue = this.multiple;
        this.multiple = value;
        if (previousValue !== this.multiple) {
            this._instanceSelectionModel();
        }
    }

    /**
     * 绑定键盘事件的容器
     * @type HTMLElement | ElementRef | string
     * @default thy-selection-list 组件绑定的元素
     */
    @Input() thyBindKeyEventContainer: HTMLElement | ElementRef | string;

    /**
     * 出现滚动条的容器
     * @type HTMLElement | ElementRef | string
     * @default thy-selection-list 组件绑定的元素
     */
    @Input() thyScrollContainer: HTMLElement | ElementRef | string;

    /**
     * 键盘事件触发 Before 调用，如果返回 false 则停止继续执行
     */
    @Input() thyBeforeKeydown: (event?: KeyboardEvent) => boolean;

    /**
     * Option Value 唯一的 Key，用于存储哪些选择被选中的唯一值，只有 Option 的 thyValue 是对象的时才可以传入该选项
     */
    @Input() thyUniqueKey: string;

    /**
     * 比较2个选项的 Value 是否相同
     */
    @Input() thyCompareWith: (o1: any, o2: any) => boolean;

    /**
     * grid item 的展示样式
     * @type list | grid
     * @default list
     */
    @Input() set thyLayout(value: ThyListLayout) {
        this.layout = value;
        this.isLayoutGrid = value === 'grid';
    }

    /**
     * 是否自动激活第一项
     */
    @Input({ transform: coerceBooleanProperty }) set thyAutoActiveFirstItem(value: boolean) {
        this.autoActiveFirstItem = value;
    }

    /**
     * 改变 grid item 的大小，支持默认以及 sm 两种大小
     * @type sm | md | lg
     */
    @Input() set thySize(value: ThyListSize) {
        this._setListSize(value);
    }

    private spaceEnabled = true;

    /**
     * 是否按下空格切换聚焦选项
     */
    @Input({ transform: coerceBooleanProperty }) set thySpaceKeyEnabled(value: boolean) {
        this.spaceEnabled = value;
    }

    /**
     * 每当选项的选定状态发生更改时，都会触发更改事件
     * @type EventEmitter<ThySelectionListChange>
     */
    @Output() readonly thySelectionChange: EventEmitter<ThySelectionListChange> = new EventEmitter<ThySelectionListChange>();

    private autoActiveFirstItem: boolean;

    private _onTouched: () => void = () => {};

    private _onChange: (value: any) => void = (_: any) => {};

    private _emitChangeEvent(option: ThyListOption, event: Event) {
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
        this._keyManager = new ActiveDescendantKeyManager<ThyListOption>(this.options)
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

    private _compareValue(value1: any, value2: any) {
        if (this.thyCompareWith) {
            const compareFn = this.thyCompareWith as (o1: any, o2: any) => boolean;
            return compareFn(value1, value2);
        } else if (this.thyUniqueKey) {
            return value1 && value1[this.thyUniqueKey] === value2 && value2[this.thyUniqueKey];
        } else {
            return value1 === value2;
        }
    }

    private _getOptionSelectionValue(option: ThyListOption) {
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

    private _getOptionByValue(value: any) {
        return this.options.find(option => {
            return this._compareValue(option.thyValue, value);
        });
    }

    private _getActiveOption() {
        if (this._keyManager.activeItem) {
            return this._getOptionByValue(this._keyManager.activeItem.thyValue);
        } else {
            return null;
        }
    }

    private _setListSize(size: ThyListSize) {
        for (const key in listSizesMap) {
            if (listSizesMap.hasOwnProperty(key)) {
                this.hostRenderer.removeClass(listSizesMap[key]);
            }
        }
        if (size) {
            this.hostRenderer.addClass(listSizesMap[size]);
        }
    }

    ngOnInit() {
        const bindKeyEventElement = this._getElementBySelector(this.thyBindKeyEventContainer);
        this.ngZone.runOutsideAngular(() => {
            this._bindKeyEventUnsubscribe = this.renderer.listen(bindKeyEventElement, 'keydown', this.onKeydown.bind(this));
        });
        this._instanceSelectionModel();
    }

    writeValue(value: any[] | any): void {
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && value) {
            if (this.multiple && !helpers.isArray(value)) {
                throw new Error(`The multiple selection ngModel must be an array.`);
            }
            if (!this.multiple && helpers.isArray(value)) {
                throw new Error(`The single selection ngModel should not be an array.`);
            }
        }
        const values = helpers.isArray(value) ? value : value ? [value] : [];
        this._modelValues = values;
        if (this.options) {
            this._setSelectionByValues(values);
        }
        this.changeDetectorRef.markForCheck();
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
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

    toggleOption(option: ThyListOption, event?: Event) {
        if (option && !option.disabled) {
            this.selectionModel.toggle(this._getOptionSelectionValue(option));
            // Emit a change event because the focused option changed its state through user
            // interaction.
            this._emitModelValueChange();
            this._emitChangeEvent(option, event);
        }
    }

    setActiveOption(option: ThyListOption) {
        this._keyManager.updateActiveItem(option); // .updateActiveItemIndex(this._getOptionIndex(option));
    }

    scrollIntoView(option: ThyListOption) {
        const scrollContainerElement = dom.getHTMLElementBySelector(this.thyScrollContainer, this.elementRef);
        ScrollToService.scrollToElement(option.element.nativeElement, scrollContainerElement);
    }

    isSelected(option: ThyListOption) {
        return this.selectionModel.isSelected(this._getOptionSelectionValue(option));
    }

    clearActiveItem() {
        if (this._keyManager.activeItem) {
            this._keyManager.setActiveItem(-1);
        }
    }

    determineClearActiveItem() {
        if (!this._getActiveOption()) {
            this.clearActiveItem();
        }
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
