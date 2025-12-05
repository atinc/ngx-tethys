import { ScrollToService } from 'ngx-tethys/core';
import { IThyListOptionParentComponent, THY_LIST_OPTION_PARENT_COMPONENT, ThyListOption , ThyListLayout } from 'ngx-tethys/shared';
import { coerceBooleanProperty, dom, helpers, keycodes, ThyBooleanInput } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    NgZone,
    OnDestroy,
    OnInit,
    QueryList,
    Renderer2,
    inject,
    input,
    computed,
    effect,
    output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThySelectionListChange } from './selection.interface';
import { startWith } from 'rxjs/operators';

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
    host: {
        class: 'thy-list thy-selection-list',
        '[class.thy-multiple-selection-list]': 'multiple()',
        '[class.thy-grid-list]': 'isLayoutGrid()'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThySelectionList implements OnInit, OnDestroy, AfterContentInit, IThyListOptionParentComponent, ControlValueAccessor {
    private renderer = inject(Renderer2);

    private elementRef = inject(ElementRef);

    private ngZone = inject(NgZone);

    private changeDetectorRef = inject(ChangeDetectorRef);

    private keyManager: ActiveDescendantKeyManager<ThyListOption>;

    private bindKeyEventUnsubscribe: () => void;

    private modelValues: any[];

    private hostRenderer = useHostRenderer();

    /** The currently selected options. */
    selectionModel!: SelectionModel<any>;

    disabled!: boolean;

    /**
     * @internal
     */
    @ContentChildren(ThyListOption, { descendants: true }) options: QueryList<ThyListOption>;

    /**
     * 改变 grid item 的选择模式，使其支持多选
     */
    readonly multiple = input<boolean, ThyBooleanInput>(true, { alias: 'thyMultiple', transform: coerceBooleanProperty });

    /**
     * 绑定键盘事件的容器
     * @type HTMLElement | ElementRef | string
     * @default thy-selection-list 组件绑定的元素
     */
    readonly thyBindKeyEventContainer = input<HTMLElement | ElementRef | string>();

    /**
     * 出现滚动条的容器
     * @type HTMLElement | ElementRef | string
     * @default thy-selection-list 组件绑定的元素
     */
    readonly thyScrollContainer = input<HTMLElement | ElementRef | string>();

    /**
     * 键盘事件触发 Before 调用，如果返回 false 则停止继续执行
     */
    readonly thyBeforeKeydown = input<(event?: KeyboardEvent) => boolean>();

    /**
     * Option Value 唯一的 Key，用于存储哪些选择被选中的唯一值，只有 Option 的 thyValue 是对象的时才可以传入该选项
     */
    readonly thyUniqueKey = input<string>();

    /**
     * 比较2个选项的 Value 是否相同
     */
    readonly thyCompareWith = input<(o1: any, o2: any) => boolean>();

    /**
     * grid item 的展示样式
     * @type list | grid
     */
    readonly layout = input<ThyListLayout>('list', { alias: 'thyLayout' });

    readonly isLayoutGrid = computed<boolean>(() => this.layout() === 'grid');

    /**
     * 是否自动激活第一项
     */
    readonly thyAutoActiveFirstItem = input(false, { transform: coerceBooleanProperty });

    /**
     * 改变 grid item 的大小，支持默认以及 sm 两种大小
     * @type sm | md | lg
     */
    readonly thySize = input<ThyListSize>();

    /**
     * 是否按下空格切换聚焦选项
     */
    readonly thySpaceKeyEnabled = input(true, { transform: coerceBooleanProperty });

    /**
     * 每当选项的选定状态发生更改时，都会触发更改事件
     */
    readonly thySelectionChange = output<ThySelectionListChange>();

    private onTouched: () => void = () => {};

    private onChange: (value: any) => void = (_: any) => {};

    constructor() {
        effect(() => {
            this.setListSize();
        });

        effect(() => {
            this.instanceSelectionModel();
        });
    }

    private emitChangeEvent(option: ThyListOption, event: Event) {
        this.thySelectionChange.emit({
            source: this,
            value: option.thyValue(),
            option: option,
            event: event,
            selected: this.isSelected(option)
        });
    }

    private emitModelValueChange() {
        const uniqueKey = this.thyUniqueKey();
        if (this.options) {
            let selectedValues = this.selectionModel.selected;
            if (uniqueKey) {
                selectedValues = selectedValues.map(selectedValue => {
                    const selectedOption = this.options.find(option => {
                        return option.thyValue()[uniqueKey] === selectedValue;
                    });
                    if (selectedOption) {
                        return selectedOption.thyValue();
                    } else {
                        return this.modelValues.find(value => {
                            return value[uniqueKey] === selectedValue;
                        });
                    }
                });
            }
            this.modelValues = selectedValues;
            let changeValue = selectedValues;
            if (!this.multiple() && selectedValues && selectedValues.length > 0) {
                changeValue = selectedValues[0];
            }
            this.onChange(changeValue);
        }
    }

    private toggleFocusedOption(event: KeyboardEvent): void {
        if (this.keyManager.activeItem) {
            this.ngZone.run(() => {
                this.toggleOption(this.keyManager.activeItem, event);
            });
        }
    }

    private initializeFocusKeyManager() {
        this.keyManager = new ActiveDescendantKeyManager<ThyListOption>(this.options)
            .withWrap()
            // .withTypeAhead()
            // Allow disabled items to be focusable. For accessibility reasons, there must be a way for
            // screenreader users, that allows reading the different options of the list.
            .skipPredicate(() => false);
    }

    private instanceSelectionModel() {
        this.selectionModel = new SelectionModel<any>(this.multiple());
    }

    private getElementBySelector(element: HTMLElement | ElementRef | string): HTMLElement {
        return dom.getHTMLElementBySelector(element, this.elementRef);
    }

    private compareValue(value1: any, value2: any) {
        const thyUniqueKey = this.thyUniqueKey();
        const thyCompareWith = this.thyCompareWith();
        if (thyCompareWith) {
            const compareFn = thyCompareWith as (o1: any, o2: any) => boolean;
            return compareFn(value1, value2);
        } else if (thyUniqueKey) {
            return value1 && value1[thyUniqueKey] === value2 && value2[thyUniqueKey];
        } else {
            return value1 === value2;
        }
    }

    private getOptionSelectionValue(option: ThyListOption) {
        const thyValue = option.thyValue();
        if (thyValue) {
            const thyUniqueKey = this.thyUniqueKey();
            return thyUniqueKey ? thyValue[thyUniqueKey] : thyValue;
        } else {
            return option;
        }
    }

    private setSelectionByValues(values: any[]) {
        this.selectionModel.clear();
        values.forEach(value => {
            const thyUniqueKey = this.thyUniqueKey();
            if (thyUniqueKey) {
                this.selectionModel.select(value[thyUniqueKey]);
            } else {
                this.selectionModel.select(value);
            }
        });
    }

    private setAllOptionsSelected(toIsSelected: boolean) {
        // Keep track of whether anything changed, because we only want to
        // emit the changed event when something actually changed.
        let hasChanged = false;

        this.options.forEach(option => {
            const fromIsSelected = this.selectionModel.isSelected(option.thyValue());
            if (fromIsSelected !== toIsSelected) {
                hasChanged = true;
                this.selectionModel.toggle(option.thyValue());
            }
        });

        if (hasChanged) {
            this.emitModelValueChange();
        }
    }

    private getOptionByValue(value: any) {
        return this.options.find(option => {
            return this.compareValue(option.thyValue(), value);
        });
    }

    private getActiveOption() {
        if (this.keyManager.activeItem) {
            return this.getOptionByValue(this.keyManager.activeItem.thyValue());
        } else {
            return null;
        }
    }

    private setListSize() {
        const size = this.thySize();
        for (const key in listSizesMap) {
            if (listSizesMap.hasOwnProperty(key)) {
                this.hostRenderer.removeClass(listSizesMap[key as keyof typeof listSizesMap]);
            }
        }
        if (size) {
            this.hostRenderer.addClass(listSizesMap[size as keyof typeof listSizesMap]);
        }
    }

    ngOnInit() {
        const bindKeyEventElement = this.getElementBySelector(this.thyBindKeyEventContainer());
        this.ngZone.runOutsideAngular(() => {
            this.bindKeyEventUnsubscribe = this.renderer.listen(bindKeyEventElement, 'keydown', this.onKeydown.bind(this));
        });
        this.instanceSelectionModel();
    }

    writeValue(value: any[] | any): void {
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && value) {
            const multiple = this.multiple();
            if (multiple && !helpers.isArray(value)) {
                throw new Error(`The multiple selection ngModel must be an array.`);
            }
            if (!multiple && helpers.isArray(value)) {
                throw new Error(`The single selection ngModel should not be an array.`);
            }
        }
        const values = helpers.isArray(value) ? value : value ? [value] : [];
        this.modelValues = values;
        if (this.options) {
            this.setSelectionByValues(values);
        }
        this.changeDetectorRef.markForCheck();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onKeydown(event: KeyboardEvent) {
        const thyBeforeKeydown = this.thyBeforeKeydown();
        if (thyBeforeKeydown) {
            // stop key down event
            const isContinue = thyBeforeKeydown(event);
            if (!isContinue) {
                return;
            }
        }
        const keyCode = event.keyCode || event.which;
        const manager = this.keyManager;
        const previousFocusIndex = manager.activeItemIndex;

        switch (keyCode) {
            case keycodes.SPACE:
            case keycodes.ENTER:
                if (keyCode === keycodes.SPACE && !this.thySpaceKeyEnabled()) {
                    return;
                }
                this.toggleFocusedOption(event);
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
            this.toggleFocusedOption(event);
        }
    }

    toggleOption(option: ThyListOption, event?: Event) {
        if (option && !option.thyDisabled()) {
            this.selectionModel.toggle(this.getOptionSelectionValue(option));
            // Emit a change event because the focused option changed its state through user
            // interaction.
            this.emitModelValueChange();
            this.emitChangeEvent(option, event);
        }
    }

    setActiveOption(option: ThyListOption) {
        this.keyManager.updateActiveItem(option); // .updateActiveItemIndex(this._getOptionIndex(option));
    }

    scrollIntoView(option: ThyListOption) {
        const scrollContainerElement = dom.getHTMLElementBySelector(this.thyScrollContainer(), this.elementRef);
        ScrollToService.scrollToElement(option.element.nativeElement, scrollContainerElement);
    }

    isSelected(option: ThyListOption) {
        return this.selectionModel.isSelected(this.getOptionSelectionValue(option));
    }

    clearActiveItem() {
        if (this.keyManager.activeItem) {
            this.keyManager.setActiveItem(-1);
        }
    }

    determineClearActiveItem() {
        if (!this.getActiveOption()) {
            this.clearActiveItem();
        }
    }

    /** Selects all of the options. */
    selectAll() {
        this.setAllOptionsSelected(true);
    }

    /** Deselects all of the options. */
    deselectAll() {
        this.setAllOptionsSelected(false);
    }

    ngAfterContentInit(): void {
        this.initializeFocusKeyManager();
        this.options.changes.pipe(startWith(true)).subscribe(() => {
            if (this.thyAutoActiveFirstItem()) {
                if (!this.keyManager.activeItem || this.options.toArray().indexOf(this.keyManager.activeItem) < 0) {
                    this.keyManager.setFirstItemActive();
                }
            }
        });
    }

    ngOnDestroy() {
        if (this.bindKeyEventUnsubscribe) {
            this.bindKeyEventUnsubscribe();
        }
    }
}
