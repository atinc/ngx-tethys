import {
    AbstractControlValueAccessor,
    Constructor,
    EXPANDED_DROPDOWN_POSITIONS,
    InputBoolean,
    InputNumber,
    mixinDisabled,
    mixinTabIndex,
    ScrollToService,
    ThyCanDisable,
    ThyHasTabIndex
} from 'ngx-tethys/core';
import { SelectControlSize, SelectOptionBase } from 'ngx-tethys/shared';
import { coerceBooleanProperty, elementMatchClosest, helpers, isArray, isEmpty, set } from 'ngx-tethys/util';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, take, takeUntil } from 'rxjs/operators';

import { SelectionModel } from '@angular/cdk/collections';
import {
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    ConnectedOverlayPositionChange,
    ConnectionPositionPair,
    ViewportRuler
} from '@angular/cdk/overlay';
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThySelectControlComponent } from 'ngx-tethys/shared';

import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ThyEmptyComponent } from 'ngx-tethys/empty';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { Id } from 'ngx-tethys/types';
import { ThyCascaderOptionComponent } from './cascader-li.component';
import { ThyCascaderSearchOptionComponent } from './cascader-search-option.component';
import { ThyCascaderExpandTrigger, ThyCascaderOption, ThyCascaderSearchOption, ThyCascaderTriggerType } from './types';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';

function toArray<T>(value: T | T[]): T[] {
    let ret: T[];
    if (value == null) {
        ret = [];
    } else if (!Array.isArray(value)) {
        ret = [value];
    } else {
        ret = value;
    }
    return ret;
}

function arrayEquals<T>(array1: T[], array2: T[]): boolean {
    if (!array1 || !array2 || array1.length !== array2.length) {
        return false;
    }

    const len = array1.length;
    for (let i = 0; i < len; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

const defaultDisplayRender = (label: any) => label.join(' / ');

const _MixinBase: Constructor<ThyHasTabIndex> & Constructor<ThyCanDisable> & typeof AbstractControlValueAccessor = mixinTabIndex(
    mixinDisabled(AbstractControlValueAccessor)
);

/**
 * 级联选择菜单
 * @name thy-cascader
 */
@Component({
    selector: 'thy-cascader,[thy-cascader]',
    templateUrl: './cascader.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyCascaderComponent),
            multi: true
        }
    ],
    host: {
        '[attr.tabindex]': `tabIndex`,
        '(blur)': 'onBlur($event)'
    },
    styles: [
        `
            .thy-cascader-menus {
                position: relative;
            }
        `
    ],
    standalone: true,
    imports: [
        CdkOverlayOrigin,
        NgIf,
        ThySelectControlComponent,
        NgClass,
        NgTemplateOutlet,
        CdkConnectedOverlay,
        NgStyle,
        NgFor,
        ThyCascaderOptionComponent,
        ThyCascaderSearchOptionComponent,
        ThyEmptyComponent,
        ThyIconComponent
    ]
})
export class ThyCascaderComponent extends _MixinBase implements ControlValueAccessor, OnInit, OnDestroy {
    /**
     * 选项的实际值的属性名
     */
    @Input() thyValueProperty = 'value';

    /**
     * 选项的显示值的属性名
     */
    @Input() thyLabelProperty = 'label';

    /**
     * 描述输入字段预期值的简短的提示信息
     */
    @Input() thyPlaceholder = '请选择';

    /**
     * 控制大小（4种）
     * @type 'sm' | 'md' | 'lg' | ''
     */
    @Input() thySize: SelectControlSize = '';

    /**
     * 数据项
     * @type ThyCascaderOption[]
     * @default []
     */
    @Input()
    set thyOptions(options: ThyCascaderOption[] | null) {
        this.columns = options && options.length ? [options] : [];
        if (this.defaultValue && this.columns.length) {
            this.initOptions(0);
        }
    }

    /**
     * 点击父级菜单选项时，可通过该函数判断是否允许值的变化
     */
    @Input() thyChangeOn: (option: ThyCascaderOption, level: number) => boolean;

    /**
     * 点击项时，表单是否动态展示数据项
     * @type boolean
     */
    @Input() @InputBoolean() thyChangeOnSelect = false;

    /**
     * 显示输入框
     * @type boolean
     */
    @Input() @InputBoolean() thyShowInput = true;

    /**
     * 用户自定义模板
     * @type TemplateRef
     */
    @Input()
    set thyLabelRender(value: TemplateRef<any>) {
        this.labelRenderTpl = value;
        this.isLabelRenderTemplate = value instanceof TemplateRef;
    }

    get thyLabelRender(): TemplateRef<any> {
        return this.labelRenderTpl;
    }

    /**
     * 用于动态加载选项
     */
    @Input() thyLoadData: (node: ThyCascaderOption, index?: number) => PromiseLike<any>;

    /**
     * 控制触发状态, 支持 `click` | `hover`
     * @type ThyCascaderTriggerType | ThyCascaderTriggerType[]
     */
    @Input() thyTriggerAction: ThyCascaderTriggerType | ThyCascaderTriggerType[] = ['click'];

    /**
     * 鼠标经过下方列表项时，是否自动展开列表，支持 `click` | `hover`
     * @type ThyCascaderExpandTrigger | ThyCascaderExpandTrigger[]
     */
    @Input() thyExpandTriggerAction: ThyCascaderExpandTrigger | ThyCascaderExpandTrigger[] = ['click'];

    /**
     * 自定义浮层样式
     */
    @Input() thyMenuStyle: { [key: string]: string };

    /**
     * 自定义浮层类名
     * @type string
     */
    @Input()
    set thyMenuClassName(value: string) {
        this.menuClassName = value;
        this.setMenuClass();
    }

    get thyMenuClassName(): string {
        return this.menuClassName;
    }

    /**
     * 自定义浮层列类名
     * @type string
     */
    @Input()
    set thyColumnClassName(value: string) {
        this.columnClassName = value;
        this.setMenuClass();
    }

    get thyColumnClassName(): string {
        return this.columnClassName;
    }

    /**
     * 是否只读
     * @default false
     */
    @Input()
    // eslint-disable-next-line prettier/prettier
    override get thyDisabled(): boolean {
        return this.disabled;
    }

    override set thyDisabled(value: boolean) {
        this.disabled = coerceBooleanProperty(value);
    }

    disabled = false;

    /**
     * 空状态下的展示文字
     * @default 暂无可选项
     */
    @Input()
    set thyEmptyStateText(value: string) {
        this.emptyStateText = value;
    }

    /**
     * 是否多选
     * @type boolean
     * @default false
     */
    @Input()
    @InputBoolean()
    set thyMultiple(value: boolean) {
        this.isMultiple = value;
        this.initSelectionModel();
    }

    get thyMultiple(): boolean {
        return this.isMultiple;
    }

    /**
     * 设置多选时最大显示的标签数量，0 表示不限制
     * @type number
     */
    @Input() @InputNumber() thyMaxTagCount = 0;

    /**
     * @private 当多选时是否只能选择叶子项, 暂无实现
     */
    @Input()
    @InputBoolean()
    thyIsOnlySelectLeaf = true;

    /**
     * 是否支持搜索
     * @default false
     */
    @Input() @InputBoolean() thyShowSearch: boolean = false;

    /**
     * 值发生变化时触发，返回选择项的值
     * @type EventEmitter<any[]>
     */
    @Output() thyChange = new EventEmitter<any[]>();

    /**
     * 值发生变化时触发，返回选择项列表
     * @type EventEmitter<ThyCascaderOption[]>
     */
    @Output() thySelectionChange = new EventEmitter<ThyCascaderOption[]>();

    /**
     * 选择选项时触发
     */
    @Output() thySelect = new EventEmitter<{
        option: ThyCascaderOption;
        index: number;
    }>();

    /**
     * @private 暂无实现
     */
    @Output() thyDeselect = new EventEmitter<{
        option: ThyCascaderOption;
        index: number;
    }>();

    /**
     * 清空选项时触发
     */
    @Output() thyClear = new EventEmitter<void>();

    @ViewChildren('cascaderOptions', { read: ElementRef }) cascaderOptions: QueryList<ElementRef>;

    @ViewChildren('cascaderOptionContainers', { read: ElementRef }) cascaderOptionContainers: QueryList<ElementRef>;

    @ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay: CdkConnectedOverlay;

    @ViewChild('trigger', { read: ElementRef, static: true }) trigger: ElementRef<any>;

    @ViewChild('input') input: ElementRef;

    @ViewChild('menu') menu: ElementRef;

    public dropDownPosition = 'bottom';
    public menuVisible = false;
    public isLoading = false;
    public showSearch = false;
    public labelRenderText: string;
    public labelRenderContext: any = {};
    public isLabelRenderTemplate = false;
    public triggerRect: DOMRect;
    public columns: ThyCascaderOption[][] = [];
    public emptyStateText = '暂无可选项';

    public selectionModel: SelectionModel<SelectOptionBase>;
    private prefixCls = 'thy-cascader';
    private menuClassName: string;
    private columnClassName: string;
    private _menuColumnCls: any;
    private defaultValue: any[];
    private readonly destroy$ = new Subject<void>();
    private _menuCls: { [name: string]: any };
    private _labelCls: { [name: string]: any };
    private labelRenderTpl: TemplateRef<any>;
    private hostRenderer = useHostRenderer();
    private cascaderPosition: ConnectionPositionPair[];
    positions: ConnectionPositionPair[];

    private value: any[];

    private selectedOptions: ThyCascaderOption[] = [];

    private activatedOptions: ThyCascaderOption[] = [];

    get selected(): SelectOptionBase | SelectOptionBase[] {
        this.cdkConnectedOverlay?.overlayRef?.updatePosition();
        return this.thyMultiple ? this.selectionModel.selected : this.selectionModel.selected[0];
    }

    private isMultiple = false;

    private prevSelectedOptions: ThyCascaderOption[] = [];

    public menuMinWidth = 122;

    private searchText$ = new BehaviorSubject('');

    public searchResultList: ThyCascaderSearchOption[] = [];

    public isShowSearchPanel: boolean = false;

    /**
     * 解决搜索&多选的情况下，点击搜索项会导致 panel 闪烁
     * 由于点击后，thySelectedOptions变化，导致 thySelectControl
     * 又会触发 searchFilter 函数，即 resetSearch 会执行
     * 会导致恢复级联状态再变为搜索状态
     */
    private isSelectingSearchState: boolean = false;

    private focusOrigin: FocusOrigin;

    ngOnInit(): void {
        this.setClassMap();
        this.setMenuClass();
        this.setMenuColumnClass();
        this.setLabelClass();
        this.initPosition();
        this.initSearch();
        if (!this.selectionModel) {
            this.selectionModel = new SelectionModel<SelectOptionBase>(this.thyMultiple);
        }
        this.viewPortRuler
            .change(100)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                if (this.menuVisible) {
                    this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
                    this.cdr.markForCheck();
                }
            });

        this.focusMonitor
            .monitor(this.elementRef, true)
            .pipe(takeUntil(this.destroy$))
            .subscribe((origin: FocusOrigin) => {
                this.focusOrigin = origin;

                if (origin && origin !== 'mouse') {
                    // mark：点击tab键聚焦，focusOrigin返回keyboard；点击搜索框聚焦，focusOrigin返回program
                    // selectControl在thyPanelOpened值发生改变时，会根据thyShowSearch的值判断是否要调inputElement.focus()，所以这里不需要再手动调用inputElement.focus()，只需要在组件被聚焦时打开下拉菜单
                    this.setMenuVisible(true);
                }
            });
    }

    private initSelectionModel() {
        if (this.selectionModel) {
            this.selectionModel.clear();
        } else {
            this.selectionModel = new SelectionModel(this.isMultiple);
        }
    }

    private initPosition() {
        this.cascaderPosition = EXPANDED_DROPDOWN_POSITIONS.map(item => {
            return { ...item };
        });
        this.cascaderPosition[0].offsetY = 4; // 左下
        this.cascaderPosition[1].offsetY = 4; // 右下
        this.cascaderPosition[2].offsetY = -4; // 右下
        this.cascaderPosition[3].offsetY = -4; // 右下
        this.positions = this.cascaderPosition;
    }

    private initOptions(index: number) {
        const vs = this.defaultValue;
        const load = () => {
            this.activateOnInit(index, vs[index]);
            if (index < vs.length - 1) {
                this.initOptions(index + 1);
            }
            if (index === vs.length - 1) {
                this.afterWriteValue();
            }
        };

        if (this.isLoaded(index) || !this.thyLoadData) {
            load();
        } else {
            const node = this.activatedOptions[index - 1] || {};
            this.loadChildren(node, index - 1, load, this.afterWriteValue.bind(this));
        }
    }

    private activateOnInit(index: number, value: any): void {
        let option = this.findOption(value, index);
        if (!option) {
            option =
                typeof value === 'object'
                    ? value
                    : {
                          [`${this.thyValueProperty || 'value'}`]: value,
                          [`${this.thyLabelProperty || 'label'}`]: value
                      };
        }
        this.updatePrevSelectedOptions(option, true);
        this.setActiveOption(option, index, false, false);
    }

    private updatePrevSelectedOptions(option: ThyCascaderOption, isActivateInit = false) {
        if (isActivateInit) {
            set(option, 'selected', true);
            this.prevSelectedOptions.push(option);
        } else {
            const isSelected = !option.selected;
            while (this.prevSelectedOptions.length && !this.thyMultiple) {
                set(this.prevSelectedOptions.pop(), 'selected', false);
            }
            set(option, 'selected', isSelected);
            this.prevSelectedOptions.push(option);
        }
    }

    writeValue(value: any): void {
        if (!this.selectionModel) {
            this.initSelectionModel();
        }
        if (!this.isMultiple) {
            const vs = (this.defaultValue = toArray(value));
            if (vs.length) {
                this.initOptions(0);
            } else {
                this.value = vs;
                this.activatedOptions = [];
                this.afterWriteValue();
            }
        } else {
            const values = toArray(value);
            values.forEach(item => {
                const vs = (this.defaultValue = toArray(item));
                if (vs.length) {
                    this.initOptions(0);
                } else {
                    this.value = vs;
                    this.activatedOptions = [];
                    this.afterWriteValue();
                }
            });
            this.cdr.detectChanges();
        }
    }

    afterWriteValue(): void {
        this.selectedOptions = this.activatedOptions;
        this.value = this.getSubmitValue(this.selectedOptions);
        this.addSelectedState(this.selectedOptions);
        this.buildDisplayLabel();
    }

    private addSelectedState(selectOptions: ThyCascaderOption[]) {
        if (this.isMultiple && this.thyIsOnlySelectLeaf) {
            selectOptions.forEach(opt => {
                if (opt.isLeaf) {
                    opt.selected = true;
                    set(opt, 'selected', true);
                }
            });
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public positionChange(position: ConnectedOverlayPositionChange): void {
        const newValue = position.connectionPair.originY === 'bottom' ? 'bottom' : 'top';
        if (this.dropDownPosition !== newValue) {
            this.dropDownPosition = newValue;
            this.cdr.detectChanges();
        }
    }

    private isLoaded(index: number): boolean {
        return this.columns[index] && this.columns[index].length > 0;
    }

    public getOptionLabel(option: ThyCascaderOption): any {
        return option[this.thyLabelProperty || 'label'];
    }

    public getOptionValue(option: ThyCascaderOption): any {
        return option[this.thyValueProperty || 'value'];
    }

    public isActivatedOption(option: ThyCascaderOption, index: number): boolean {
        if (!this.isMultiple) {
            const activeOpt = this.activatedOptions[index];
            return activeOpt === option;
        } else {
            if (option.isLeaf) {
                return option.selected;
            } else {
                const selectedOpts = this.selectionModel.selected;
                const appearIndex = selectedOpts.findIndex(item => {
                    const selectedItem = helpers.get(item, `thyRawValue.value.${index}`);
                    return helpers.shallowEqual(selectedItem, option);
                });
                return appearIndex >= 0;
            }
        }
    }

    public attached(): void {
        this.cdr.detectChanges();
        this.cdkConnectedOverlay.positionChange.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
            this.scrollActiveElementIntoView();
        });
    }

    private scrollActiveElementIntoView() {
        if (!isEmpty(this.selectedOptions)) {
            const activeOptions = this.cascaderOptions
                .filter(item => item.nativeElement.classList.contains('thy-cascader-menu-item-active'))
                // for multiple mode
                .slice(-this.cascaderOptionContainers.length);

            this.cascaderOptionContainers.forEach((item, index) => {
                if (index <= activeOptions.length - 1) {
                    ScrollToService.scrollToElement(activeOptions[index].nativeElement, item.nativeElement);
                    this.cdr.detectChanges();
                }
            });
        }
    }

    private findOption(option: any, index: number): ThyCascaderOption {
        const options: ThyCascaderOption[] = this.columns[index];
        if (options) {
            const value = typeof option === 'object' ? this.getOptionValue(option) : option;
            return options.find(o => value === this.getOptionValue(o));
        }
        return null;
    }

    private buildDisplayLabel(): void {
        const selectedOptions = [...this.selectedOptions];
        const labels: string[] = selectedOptions.map(o => this.getOptionLabel(o));
        if (labels.length === 0) {
            return;
        }
        let labelRenderContext;
        let labelRenderText;
        if (this.isLabelRenderTemplate) {
            labelRenderContext = { labels, selectedOptions };
        } else {
            labelRenderText = defaultDisplayRender.call(this, labels, selectedOptions);
            this.labelRenderText = labelRenderText;
        }
        if (this.labelRenderText || this.isLabelRenderTemplate) {
            const selectedData: SelectOptionBase = {
                thyRawValue: {
                    value: selectedOptions,
                    labelText: labelRenderText,
                    labelRenderContext: labelRenderContext
                },
                thyValue: labels,
                thyLabelText: labelRenderText
            };
            this.selectionModel.select(selectedData);
        }
    }

    public isMenuVisible(): boolean {
        return this.menuVisible;
    }

    public setMenuVisible(menuVisible: boolean): void {
        if (this.disabled) {
            return;
        }

        if (this.menuVisible !== menuVisible) {
            this.menuVisible = menuVisible;

            this.initActivatedOptions();
            this.setClassMap();
            this.setMenuClass();
            if (this.menuVisible) {
                this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
            }

            // 统一在这里判断是否调用onTouchedFn，避免原先的重复调用onTouchedFn的情况
            // 当用hover的方式打开菜单，点击菜单外部关闭菜单时，focusOrigin值为undefined，所以这里用!this.focusOrigin，而不用this.focusOrigin === null进行判断
            if (!this.menuVisible && !this.focusOrigin) {
                this.onTouchedFn();
            }
        }
    }

    private initActivatedOptions() {
        if (isEmpty(this.selectedOptions) || !this.menuVisible) {
            return;
        }
        this.activatedOptions = [...this.selectedOptions];
        this.activatedOptions.forEach((item, index) => {
            if (!isEmpty(item.children) && !item.isLeaf) {
                this.columns[index + 1] = item.children;
            }
        });
    }

    public get menuCls(): any {
        return this._menuCls;
    }

    private setMenuClass(): void {
        this._menuCls = {
            [`${this.prefixCls}-menus`]: true,
            [`${this.prefixCls}-menus-hidden`]: !this.menuVisible,
            [`${this.thyMenuClassName}`]: this.thyMenuClassName,
            [`w-100`]: this.columns.length === 0
        };
    }

    public get menuColumnCls(): any {
        return this._menuColumnCls;
    }

    private setMenuColumnClass(): void {
        this._menuColumnCls = {
            [`${this.prefixCls}-menu`]: true,
            [`${this.thyColumnClassName}`]: this.thyColumnClassName
        };
    }

    public get labelCls(): any {
        return this._labelCls;
    }

    private setLabelClass(): void {
        this._labelCls = {
            [`${this.prefixCls}-picker-label`]: true,
            [`${this.prefixCls}-show-search`]: false,
            [`${this.prefixCls}-focused`]: false
        };
    }

    private setClassMap(): void {
        const classMap = {
            [`${this.prefixCls}`]: true,
            [`${this.prefixCls}-picker`]: true,
            [`${this.prefixCls}-${this.thySize}`]: true,
            [`${this.prefixCls}-picker-disabled`]: this.disabled,
            [`${this.prefixCls}-picker-open`]: this.menuVisible
        };
        this.hostRenderer.updateClassByMap(classMap);
    }

    private isActionTrigger(action: 'click' | 'hover'): boolean {
        if (typeof this.thyTriggerAction === 'string') {
            return this.thyTriggerAction === action;
        }
        return this.thyTriggerAction.indexOf(action) !== -1;
    }

    private isHoverExpandTriggerAction(): boolean {
        if (typeof this.thyExpandTriggerAction === 'string') {
            return this.thyExpandTriggerAction === 'hover';
        }
        return this.thyExpandTriggerAction.indexOf('hover') !== -1;
    }

    // 不在订阅到focusOrigin值为mouse时调setMenuVisible(true)，而是保留此处click的监听，是为了防止“点击清除按钮或点击某选中项的移除按钮时，focusOrigin也会返回mouse，导致菜单打开”
    // 第一次点击选择框，打开菜单，第二次点击选择框，关闭菜单。 所以 setMenuVisible(!this.menuVisible)
    @HostListener('click', ['$event'])
    public toggleClick($event: Event) {
        if (this.isActionTrigger('click')) {
            this.setMenuVisible(!this.menuVisible);
        }
    }

    @HostListener('mouseover', ['$event'])
    public toggleHover($event: Event) {
        if (this.isActionTrigger('hover')) {
            this.setMenuVisible(!this.menuVisible);
        }
    }

    public clickOption(option: ThyCascaderOption, index: number, event: Event): void {
        if (option.isLeaf && event instanceof Event && this.isMultiple) {
            return;
        }
        if (option && option.disabled && !this.isMultiple) {
            return;
        }
        this.setActiveOption(option, index, true);
        this.valueChange();
    }

    public mouseoverOption(option: ThyCascaderOption, index: number, event: Event): void {
        if (event) {
            event.preventDefault();
        }

        if (option && option.disabled && !this.isMultiple) {
            return;
        }

        if (!this.isHoverExpandTriggerAction() && !(option && option.disabled && this.isMultiple)) {
            return;
        }
        this.setActiveOption(option, index, false);
    }

    public mouseleaveMenu(event: Event) {
        if (event) {
            event.preventDefault();
        }
        if (!this.isActionTrigger('hover')) {
            return;
        }
        this.setMenuVisible(!this.menuVisible);
    }

    onBlur(event: FocusEvent) {
        // 点击菜单cascader-menus、点击搜索框search-input-field、点击tab键引起的失焦，这三种情况下focusOrigin都返回null，所以这里需要判断，这三种情况只有点击tab键导致的失焦需要closeMenu
        if (!elementMatchClosest(event?.relatedTarget as HTMLElement, ['.thy-cascader-menus', 'input.form-control.search-input-field'])) {
            this.closeMenu();
        }
    }

    public closeMenu(): void {
        if (this.menuVisible) {
            this.setMenuVisible(false);
            this.isShowSearchPanel = false;
            this.searchResultList = [];
        }
    }

    public setActiveOption(option: ThyCascaderOption, index: number, select: boolean, loadChildren: boolean = true): void {
        this.activatedOptions[index] = option;
        for (let i = index - 1; i >= 0; i--) {
            const originOption = this.activatedOptions[i + 1]?.parent;
            if (!this.activatedOptions[i] || originOption?._id !== this.activatedOptions[i]._id) {
                this.activatedOptions[i] = originOption ?? this.activatedOptions[i];
            }
        }
        if (index < this.activatedOptions.length - 1) {
            this.activatedOptions = this.activatedOptions.slice(0, index + 1);
        }
        if (isArray(option.children) && option.children.length) {
            option.isLeaf = false;
            option.children.forEach(child => (child.parent = option));
            this.setColumnData(option.children, index + 1);
        } else if (!option.isLeaf && loadChildren) {
            this.loadChildren(option, index);
        } else {
            if (index < this.columns.length - 1) {
                this.columns = this.columns.slice(0, index + 1);
            }
        }
        if (select) {
            this.selectOption(option, index);
        }
    }

    private selectOption(option: ThyCascaderOption, index: number): void {
        this.thySelect.emit({ option, index });
        const isOptionCanSelect = this.thyChangeOnSelect && !this.isMultiple;
        if (option.isLeaf || isOptionCanSelect || this.shouldPerformSelection(option, index)) {
            this.selectedOptions = this.activatedOptions;
            this.updatePrevSelectedOptions(option);
            if (option.selected) {
                this.buildDisplayLabel();
            } else {
                const selectedItems = this.selectionModel.selected;
                const currentItem = selectedItems.find(item => {
                    const selectedItem = helpers.get(item, `thyRawValue.value.${index}`);
                    return helpers.shallowEqual(selectedItem, option);
                });
                this.selectionModel.deselect(currentItem);
            }
            this.valueChange();
        }
        if (option.isLeaf && !this.thyMultiple) {
            this.setMenuVisible(false);
        }
    }

    public removeSelectedItem(event: { item: SelectOptionBase; $eventOrigin: Event }) {
        const selectedItems = this.selectionModel.selected;
        event.$eventOrigin.stopPropagation();
        const currentItem = selectedItems.find(item => {
            return helpers.shallowEqual(item.thyValue, event.item.thyValue);
        });
        this.deselectOption(currentItem);
        this.selectionModel.deselect(currentItem);
        // update selectedOptions
        const updatedSelectedItems = this.selectionModel.selected;
        if (isArray(updatedSelectedItems) && updatedSelectedItems.length) {
            this.selectedOptions = updatedSelectedItems[updatedSelectedItems.length - 1].thyRawValue.value;
        }
        this.onTouchedFn();
        this.valueChange();
    }

    private deselectOption(option: SelectOptionBase) {
        const value: ThyCascaderOption[] = option.thyRawValue.value;
        value.forEach(item => {
            if (item.isLeaf && item.selected) {
                set(item, 'selected', false);
            }
        });
    }

    private shouldPerformSelection(option: ThyCascaderOption, level: number): boolean {
        return typeof this.thyChangeOn === 'function' ? this.thyChangeOn(option, level) === true : false;
    }

    private valueChange(): void {
        const value = this.getValues();
        if (!arrayEquals(this.value, value)) {
            this.defaultValue = null;
            this.value = value;
            this.onChangeFn(value);
            if (this.selectionModel.isEmpty()) {
                this.thyClear.emit();
            }
            this.thySelectionChange.emit(this.selectedOptions);
            this.thyChange.emit(value);
        }
    }

    private getValues() {
        let selectedItems: any[];
        const selected = this.selectionModel.selected;
        selectedItems = selected.map(item => this.getSubmitValue(item.thyRawValue.value));
        return this.isMultiple ? selectedItems : selectedItems[0] ?? selectedItems;
    }

    public clearSelection($event: Event): void {
        if ($event) {
            $event.stopPropagation();
            $event.preventDefault();
        }
        this.labelRenderText = '';
        this.labelRenderContext = {};
        this.selectedOptions = [];
        this.activatedOptions = [];
        this.deselectAllSelected();
        // 菜单关闭的情况下才会出来清空按钮，所以不需要手动关闭菜单
        // this.setMenuVisible(false);
        this.onTouchedFn();
        this.valueChange();
    }

    private deselectAllSelected() {
        const selectedOptions = this.selectionModel.selected;
        selectedOptions.forEach(item => this.deselectOption(item));
        this.selectionModel.clear();
    }

    private loadChildren(option: ThyCascaderOption, index: number, success?: () => void, failure?: () => void): void {
        if (this.thyLoadData) {
            this.isLoading = true;
            this.thyLoadData(option, index).then(
                () => {
                    option.loading = this.isLoading = false;
                    if (option.children) {
                        option.children.forEach(child => (child.parent = index < 0 ? undefined : option));
                        this.setColumnData(option.children, index + 1);
                    }
                    if (success) {
                        success();
                    }
                },
                () => {
                    option.loading = this.isLoading = false;
                    option.isLeaf = true;
                    if (failure) {
                        failure();
                    }
                }
            );
        } else {
            this.setColumnData(option.children || [], index + 1);
        }
    }

    private setColumnData(options: ThyCascaderOption[], index: number): void {
        if (!arrayEquals(this.columns[index], options)) {
            this.columns[index] = options;
            if (index < this.columns.length - 1) {
                this.columns = this.columns.slice(0, index + 1);
            }
        }
    }

    private getSubmitValue(originOptions: ThyCascaderOption[]): any[] {
        const values: any[] = [];
        (originOptions || []).forEach(option => {
            values.push(this.getOptionValue(option));
        });
        return values;
    }

    constructor(
        private cdr: ChangeDetectorRef,
        private viewPortRuler: ViewportRuler,
        public elementRef: ElementRef,
        private focusMonitor: FocusMonitor
    ) {
        super();
    }

    public trackByFn(index: number, item: ThyCascaderOption) {
        return item?.value || item?._id || index;
    }

    public searchFilter(searchText: string) {
        if (!searchText && !this.isSelectingSearchState) {
            this.resetSearch();
        }
        this.searchText$.next(searchText);
    }

    private initSearch() {
        this.searchText$
            .pipe(
                takeUntil(this.destroy$),
                debounceTime(200),
                distinctUntilChanged(),
                filter(text => text !== '')
            )
            .subscribe(searchText => {
                this.resetSearch();

                // local search
                this.searchInLocal(searchText);
                this.isShowSearchPanel = true;
            });
    }

    private searchInLocal(
        searchText: string,
        currentLabel?: string[],
        currentValue: Id[] = [],
        currentRowValue: ThyCascaderOption[] = [],
        list = this.columns[0]
    ): void {
        list.forEach(item => {
            const curOptionLabel = this.getOptionLabel(item);
            const curOptionValue = this.getOptionValue(item);
            const label: string[] = currentLabel ? [...currentLabel, curOptionLabel] : [curOptionLabel];
            const valueList: Id[] = [...currentValue, curOptionValue];
            const rowValueList: ThyCascaderOption[] = [...currentRowValue, item];

            if (item.children && item.children.length) {
                this.searchInLocal(searchText, label, valueList, rowValueList, item.children);
            } else {
                // 目前只支持搜索根节点
                if (!item.disabled && item.isLeaf && curOptionLabel.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                    this.searchResultList.push({
                        labelList: label,
                        valueList,
                        selected: item.selected,
                        thyRowValue: rowValueList
                    });
                }
            }
        });
    }

    private resetSearch() {
        this.isShowSearchPanel = false;
        this.searchResultList = [];
        this.scrollActiveElementIntoView();
    }

    public selectSearchResult(selectOptionData: ThyCascaderSearchOption): void {
        const { thyRowValue: selectedOptions } = selectOptionData;
        if (selectOptionData.selected) {
            if (!this.isMultiple) {
                this.closeMenu();
            }
            return;
        }
        if (this.isMultiple) {
            this.isSelectingSearchState = true;
            selectOptionData.selected = true;
            selectedOptions.forEach((item: ThyCascaderOption, index: number) => {
                this.setActiveOption(item, index, item.isLeaf);
            });
            const originSearchResultList = this.searchResultList;
            // 保持搜索选项
            setTimeout(() => {
                this.isShowSearchPanel = true;
                this.searchResultList = originSearchResultList;
                this.isSelectingSearchState = false;
            });
        } else {
            selectedOptions.forEach((item: ThyCascaderOption, index: number) => {
                this.setActiveOption(item, index, item.isLeaf);
            });

            this.resetSearch();
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.focusMonitor.stopMonitoring(this.elementRef);
    }
}
