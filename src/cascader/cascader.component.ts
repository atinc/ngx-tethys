import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import { isPlatformBrowser, NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    NgZone,
    numberAttribute,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewChildren,
    inject,
    Signal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';
import {
    EXPANDED_DROPDOWN_POSITIONS,
    DebounceTimeWrapper,
    ScrollToService,
    TabIndexDisabledControlValueAccessorMixin,
    ThyClickDispatcher,
    injectPanelEmptyIcon
} from 'ngx-tethys/core';
import { ThyEmpty } from 'ngx-tethys/empty';
import { ThyIcon } from 'ngx-tethys/icon';
import { SelectControlSize, SelectOptionBase, ThySelectControl } from 'ngx-tethys/shared';
import { SafeAny } from 'ngx-tethys/types';
import { coerceBooleanProperty, elementMatchClosest, isEmpty } from 'ngx-tethys/util';
import { BehaviorSubject, Observable, Subject, Subscription, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, take, takeUntil } from 'rxjs/operators';

import { scaleYMotion } from 'ngx-tethys/core';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyCascaderOptionComponent } from './cascader-li.component';
import { ThyCascaderSearchOptionComponent } from './cascader-search-option.component';
import { ThyCascaderService } from './cascader.service';
import { ThyCascaderExpandTrigger, ThyCascaderOption, ThyCascaderSearchOption, ThyCascaderTriggerType } from './types';
import { injectLocale, ThyCascaderLocale } from 'ngx-tethys/i18n';

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
            useExisting: forwardRef(() => ThyCascader),
            multi: true
        },
        ThyCascaderService
    ],
    host: {
        '[attr.tabindex]': `tabIndex`,
        '(focus)': 'onFocus($event)',
        '(blur)': 'onBlur($event)'
    },
    imports: [
        CdkOverlayOrigin,
        ThySelectControl,
        NgClass,
        NgTemplateOutlet,
        CdkConnectedOverlay,
        NgStyle,
        ThyCascaderOptionComponent,
        ThyCascaderSearchOptionComponent,
        ThyEmpty,
        ThyDivider
    ],
    animations: [scaleYMotion]
})
export class ThyCascader
    extends TabIndexDisabledControlValueAccessorMixin
    implements ControlValueAccessor, OnInit, OnChanges, OnDestroy, AfterContentInit
{
    private platformId = inject(PLATFORM_ID);
    private cdr = inject(ChangeDetectorRef);
    elementRef = inject(ElementRef);
    private thyClickDispatcher = inject(ThyClickDispatcher);
    private ngZone = inject(NgZone);
    thyCascaderService = inject(ThyCascaderService);
    private locale: Signal<ThyCascaderLocale> = injectLocale('cascader');
    emptyIcon: Signal<string> = injectPanelEmptyIcon();

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
    @Input() thyPlaceholder = this.locale().placeholder;

    /**
     * 控制大小（5种）
     * @type 'xs' ｜ 'sm' | 'md' | 'lg' | ''
     */
    @Input() thySize: SelectControlSize = '';

    /**
     * 数据项
     * @type ThyCascaderOption[]
     * @default []
     */
    @Input()
    set thyOptions(options: ThyCascaderOption[] | null) {
        const columns = options && options.length ? [options] : [];
        this.thyCascaderService.initColumns(columns);
        if (this.thyCascaderService.defaultValue && columns.length) {
            this.thyCascaderService.initOptions(0);
        }
    }

    /**
     * 自定义选项
     * @type ThyCascaderOption[]
     * @default []
     */
    @Input() set thyCustomOptions(options: ThyCascaderOption[] | null) {
        this.thyCascaderService.customOptions = (options || []).map(item => ({ ...item }));
    }

    get thyCustomOptions() {
        return this.thyCascaderService.customOptions;
    }

    /**
     * 点击父级菜单选项时，可通过该函数判断是否允许值的变化
     */
    @Input() thyChangeOn: (option: ThyCascaderOption, level: number) => boolean;

    /**
     * 点击项时，表单是否动态展示数据项
     * @type boolean
     */
    @Input({ transform: coerceBooleanProperty }) thyChangeOnSelect = false;

    /**
     * 显示输入框
     * @type boolean
     */
    @Input({ transform: coerceBooleanProperty }) thyShowInput = true;

    /**
     * 用户自定义选项模板
     * @type TemplateRef
     */
    @Input() thyOptionRender: TemplateRef<SafeAny>;

    /**
     * 用户自定义模板
     * @type TemplateRef
     */
    @Input()
    set thyLabelRender(value: TemplateRef<any>) {
        this.labelRenderTpl = value;
        this.isLabelRenderTemplate = value instanceof TemplateRef;
        this.thyCascaderService.setCascaderOptions({ isLabelRenderTemplate: this.isLabelRenderTemplate });
    }

    get thyLabelRender(): TemplateRef<any> {
        return this.labelRenderTpl;
    }

    /**
     * 用于动态加载选项
     */
    @Input() set thyLoadData(value: (node: ThyCascaderOption, index?: number) => PromiseLike<any>) {
        this.thyCascaderService.setCascaderOptions({ loadData: value });
    }

    get thyLoadData() {
        return this.thyCascaderService?.cascaderOptions?.loadData;
    }

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
     * 自定义搜索样式
     */
    @Input() thySearchListStyle: { [key: string]: string };

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
    @Input({ transform: coerceBooleanProperty })
    override set thyDisabled(value: boolean) {
        this.disabled = value;
    }
    override get thyDisabled(): boolean {
        return this.disabled;
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
    @Input({ transform: coerceBooleanProperty })
    set thyMultiple(value: boolean) {
        this.isMultiple = value;
        this.thyCascaderService.setCascaderOptions({ isMultiple: value });
    }

    get thyMultiple(): boolean {
        return this.isMultiple;
    }

    /**
     * 设置多选时最大显示的标签数量，0 表示不限制
     * @type number
     */
    @Input({ transform: numberAttribute }) thyMaxTagCount = 0;

    /**
     * 是否仅允许选择叶子项
     * @default true
     */
    @Input({ transform: coerceBooleanProperty })
    thyIsOnlySelectLeaf = true;

    /**
     * 初始化时，是否展开面板
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyAutoExpand: boolean;

    /**
     * 是否支持搜索
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyShowSearch: boolean = false;

    /**
     * 多选选中项的展示方式，默认为空，渲染文字模板，传入tag，渲染展示模板,
     * @default ''｜tag
     */
    @Input() thyPreset: string = '';

    /**
     * 是否有幕布
     */
    @Input({ transform: coerceBooleanProperty }) thyHasBackdrop = true;

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

    /**
     * 下拉选项展开和折叠状态事件
     */
    @Output() thyExpandStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChildren('cascaderOptions', { read: ElementRef }) cascaderOptions: QueryList<ElementRef>;

    @ViewChildren('cascaderOptionContainers', { read: ElementRef }) cascaderOptionContainers: QueryList<ElementRef>;

    @ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay: CdkConnectedOverlay;

    @ViewChild('trigger', { read: ElementRef, static: true }) trigger: ElementRef<any>;

    @ViewChild('input') input: ElementRef;

    @ViewChild('menu') menu: ElementRef;

    public dropDownPosition = 'bottom';

    public menuVisible = false;

    public isLabelRenderTemplate = false;

    public triggerRect: DOMRect;

    public emptyStateText = this.locale().empty;

    private prefixCls = 'thy-cascader';

    private menuClassName: string;

    private columnClassName: string;

    private _menuColumnCls: any;

    private readonly destroy$ = new Subject<void>();

    private _menuCls: { [name: string]: any };

    private _labelCls: { [name: string]: any };

    private labelRenderTpl: TemplateRef<any>;

    private hostRenderer = useHostRenderer();

    public positions: ConnectionPositionPair[];

    get selected(): SelectOptionBase | SelectOptionBase[] {
        return this.thyMultiple ? this.thyCascaderService.selectionModel.selected : this.thyCascaderService.selectionModel.selected[0];
    }
    private isMultiple = false;

    public menuMinWidth = 122;

    private searchText$ = new BehaviorSubject('');

    public get searchResultList(): ThyCascaderSearchOption[] {
        return this.thyCascaderService.searchResultList;
    }

    public isShowSearchPanel: boolean = false;

    /**
     * 解决搜索&多选的情况下，点击搜索项会导致 panel 闪烁
     * 由于点击后，thySelectedOptions变化，导致 thySelectControl
     * 又会触发 searchFilter 函数，即 resetSearch 会执行
     * 会导致恢复级联状态再变为搜索状态
     */
    private isSelectingSearchState: boolean = false;

    public get isLoading() {
        return this.thyCascaderService?.isLoading;
    }

    public get columns() {
        return this.thyCascaderService.columns;
    }

    private afterChangeFn: () => void;

    private resizeSubscription: Subscription;

    ngOnInit(): void {
        this.setClassMap();
        this.setMenuClass();
        this.setMenuColumnClass();
        this.setLabelClass();
        this.initPosition();
        this.initSearch();
        const options = {
            labelProperty: this.thyLabelProperty,
            valueProperty: this.thyValueProperty,
            isMultiple: this.isMultiple,
            isOnlySelectLeaf: this.thyIsOnlySelectLeaf,
            isLabelRenderTemplate: this.isLabelRenderTemplate,
            loadData: this.thyLoadData
        };
        this.thyCascaderService.setCascaderOptions(options);

        this.thyCascaderService.cascaderValueChange().subscribe(options => {
            if (!options.isValueEqual) {
                this.onChangeFn(options.value);
                if (options.isSelectionModelEmpty) {
                    this.thyClear.emit();
                }
                this.thySelectionChange.emit(this.thyCascaderService.selectedOptions);
                this.thyChange.emit(options.value);
                if (this.afterChangeFn) {
                    this.afterChangeFn();
                    this.afterChangeFn = null;
                }
            }
        });

        if (isPlatformBrowser(this.platformId)) {
            this.thyClickDispatcher
                .clicked(0)
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                    if (
                        !this.elementRef.nativeElement.contains(event.target) &&
                        !this.menu?.nativeElement.contains(event.target as Node) &&
                        this.menuVisible
                    ) {
                        this.ngZone.run(() => {
                            this.closeMenu();
                            this.cdr.markForCheck();
                        });
                    }
                });
        }
    }

    ngAfterContentInit() {
        if (this.thyAutoExpand) {
            timer(0).subscribe(() => {
                this.cdr.markForCheck();
                this.setMenuVisible(true);
            });
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['thyIsOnlySelectLeaf']) {
            this.thyCascaderService.setCascaderOptions({ isOnlySelectLeaf: changes['thyIsOnlySelectLeaf'].currentValue });
        }
    }

    private initPosition() {
        const cascaderPosition: ConnectionPositionPair[] = EXPANDED_DROPDOWN_POSITIONS.map(item => {
            return { ...item };
        });
        this.positions = cascaderPosition;
    }

    writeValue(value: any): void {
        this.thyCascaderService.writeCascaderValue(value);
        if (this.isMultiple) {
            this.cdr.detectChanges();
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

    public isActivatedOption(option: ThyCascaderOption, index: number): boolean {
        return this.thyCascaderService.isActivatedOption(option, index);
    }

    public isHalfSelectedOption(option: ThyCascaderOption, index: number): boolean {
        return this.thyCascaderService.isHalfSelectedOption(option, index);
    }

    public isSelectedOption(option: ThyCascaderOption, index: number): boolean {
        return this.thyCascaderService.isSelectedOption(option, index);
    }

    public attached(): void {
        this.cdr.detectChanges();
        this.cdkConnectedOverlay.positionChange.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
            this.scrollActiveElementIntoView();
        });
    }

    private scrollActiveElementIntoView() {
        if (!isEmpty(this.thyCascaderService.selectedOptions)) {
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

    public setMenuVisible(menuVisible: boolean): void {
        if (this.menuVisible !== menuVisible) {
            this.menuVisible = menuVisible;

            this.thyCascaderService.initActivatedOptions(this.menuVisible);
            this.setClassMap();
            this.setMenuClass();
            if (this.menuVisible) {
                this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
                this.subscribeTriggerResize();
            } else {
                this.unsubscribeTriggerResize();
            }
            this.thyExpandStatusChange.emit(menuVisible);
        }
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
            [`${this.prefixCls}-focused`]: false,
            'text-truncate': true
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

    private isClickTriggerAction(): boolean {
        if (typeof this.thyTriggerAction === 'string') {
            return this.thyTriggerAction === 'click';
        }
        return this.thyTriggerAction.indexOf('click') !== -1;
    }

    private isHoverTriggerAction(): boolean {
        if (typeof this.thyTriggerAction === 'string') {
            return this.thyTriggerAction === 'hover';
        }
        return this.thyTriggerAction.indexOf('hover') !== -1;
    }

    private isHoverExpandTriggerAction(): boolean {
        if (typeof this.thyExpandTriggerAction === 'string') {
            return this.thyExpandTriggerAction === 'hover';
        }
        return this.thyExpandTriggerAction.indexOf('hover') !== -1;
    }

    @HostListener('click', ['$event'])
    public toggleClick($event: Event) {
        if (this.disabled) {
            return;
        }
        if (this.isClickTriggerAction()) {
            this.setMenuVisible(!this.menuVisible);
        }
    }

    @HostListener('mouseenter', ['$event'])
    public toggleMouseEnter(event: MouseEvent): void {
        if (this.disabled || !this.isHoverTriggerAction() || this.menuVisible) {
            return;
        }

        this.setMenuVisible(true);
    }

    @HostListener('mouseleave', ['$event'])
    public toggleMouseLeave(event: MouseEvent): void {
        if (this.disabled || !this.isHoverTriggerAction() || !this.menuVisible) {
            event.preventDefault();
            return;
        }

        const hostEl = this.elementRef.nativeElement;
        const mouseTarget = event.relatedTarget as HTMLElement;
        if (
            hostEl.contains(mouseTarget) ||
            mouseTarget?.classList.contains('cdk-overlay-pane') ||
            mouseTarget?.classList.contains('cdk-overlay-backdrop')
        ) {
            return;
        }

        this.setMenuVisible(false);
    }

    public clickCustomOption(option: ThyCascaderOption, index: number, event: Event | boolean): void {
        if (event === true) {
            this.thyCascaderService.clearSelection();
        }
        this.thyCascaderService.clickOption(option, index, event, this.selectOption);
    }

    public clickOption(option: ThyCascaderOption, index: number, event: Event | boolean): void {
        this.thyCascaderService.removeCustomOption();
        this.thyCascaderService.clickOption(option, index, event, this.selectOption);

        if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
            // Make sure to calculate and update the position after the submenu is opened
            this.cdr.detectChanges();

            // Update the position to prevent the submenu from appearing off-screen
            this.cdkConnectedOverlay.overlayRef.updatePosition();
            this.cdr.markForCheck();
        }
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

    onBlur(event?: FocusEvent) {
        // Tab 聚焦后自动聚焦到 input 输入框，此分支下直接返回，无需触发 onTouchedFn
        if (elementMatchClosest(event?.relatedTarget as HTMLElement, ['.thy-cascader-menus', 'thy-cascader'])) {
            return;
        }
        this.onTouchedFn();
    }

    onFocus(event?: FocusEvent) {
        if (!elementMatchClosest(event?.relatedTarget as HTMLElement, ['.thy-cascader-menus', 'thy-cascader'])) {
            const inputElement: HTMLInputElement = this.elementRef.nativeElement.querySelector('input');
            inputElement.focus();
        }
    }

    public closeMenu(): void {
        if (this.menuVisible) {
            this.setMenuVisible(false);
            this.onTouchedFn();
            this.isShowSearchPanel = false;
            this.thyCascaderService.searchResultList = [];
        }
    }

    public setActiveOption(option: ThyCascaderOption, index: number, select: boolean, loadChildren: boolean = true): void {
        this.thyCascaderService.setActiveOption(option, index, select, loadChildren, this.selectOption);
    }

    private selectOption = (option: ThyCascaderOption, index: number) => {
        if ((option.isLeaf || !this.thyIsOnlySelectLeaf) && !this.thyMultiple) {
            this.afterChangeFn = () => {
                this.setMenuVisible(false);
                this.onTouchedFn();
            };
        }
        this.thySelect.emit({ option, index });
        const isOptionCanSelect = this.thyChangeOnSelect && !this.isMultiple;
        if (option.isLeaf || !this.thyIsOnlySelectLeaf || isOptionCanSelect || this.shouldPerformSelection(option, index)) {
            this.thyCascaderService.selectOption(option, index);
        }
    };

    public removeSelectedItem(event: { item: SelectOptionBase; $eventOrigin: Event }) {
        event.$eventOrigin.stopPropagation();
        this.thyCascaderService.removeSelectedItem(event?.item);
    }

    private shouldPerformSelection(option: ThyCascaderOption, level: number): boolean {
        return typeof this.thyChangeOn === 'function' ? this.thyChangeOn(option, level) === true : false;
    }

    public clearSelection($event: Event): void {
        if ($event) {
            $event.stopPropagation();
            $event.preventDefault();
        }
        this.afterChangeFn = () => {
            this.setMenuVisible(false);
        };
        this.thyCascaderService.clearSelection();
    }

    constructor() {
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
                DebounceTimeWrapper.debounceTime(200),
                distinctUntilChanged(),
                filter(text => text !== '')
            )
            .subscribe(searchText => {
                this.resetSearch();

                // local search
                this.searchInLocal(searchText);
                this.isShowSearchPanel = true;
                this.cdr.markForCheck();
            });
    }

    private searchInLocal(searchText: string): void {
        this.thyCascaderService.searchInLocal(searchText);
    }

    private resetSearch() {
        this.isShowSearchPanel = false;
        this.thyCascaderService.resetSearch();
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
        selectedOptions.forEach((item: ThyCascaderOption, index: number) => {
            this.setActiveOption(item, index, index === selectedOptions.length - 1);
        });
        if (this.isMultiple) {
            this.isSelectingSearchState = true;
            selectOptionData.selected = true;
            const originSearchResultList = this.searchResultList;
            // 保持搜索选项
            setTimeout(() => {
                this.isShowSearchPanel = true;
                this.thyCascaderService.searchResultList = originSearchResultList;
                this.isSelectingSearchState = false;
            });
        } else {
            this.resetSearch();
        }
    }

    private subscribeTriggerResize(): void {
        this.unsubscribeTriggerResize();
        this.ngZone.runOutsideAngular(() => {
            this.resizeSubscription = new Observable(observer => {
                const resize = new ResizeObserver((entries: ResizeObserverEntry[]) => {
                    observer.next(null);
                });
                resize.observe(this.trigger.nativeElement);
            }).subscribe(() => {
                this.ngZone.run(() => {
                    this.triggerRect = this.trigger.nativeElement.getBoundingClientRect();
                    if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
                        this.cdkConnectedOverlay.overlayRef.updatePosition();
                    }
                    this.cdr.markForCheck();
                });
            });
        });
    }

    private unsubscribeTriggerResize(): void {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
            this.resizeSubscription = null;
        }
    }

    ngOnDestroy() {
        this.unsubscribeTriggerResize();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
