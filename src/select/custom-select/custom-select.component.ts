import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceElement } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectionPositionPair, Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { isPlatformBrowser, NgClass, NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    contentChild,
    ContentChildren,
    contentChildren,
    effect,
    ElementRef,
    forwardRef,
    HostListener,
    inject,
    Input,
    input,
    NgZone,
    numberAttribute,
    OnDestroy,
    OnInit,
    output,
    PLATFORM_ID,
    QueryList,
    Signal,
    TemplateRef,
    untracked,
    ViewChild,
    viewChild,
    ViewChildren,
    viewChildren
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
    getFlexiblePositions,
    injectPanelEmptyIcon,
    scaleMotion,
    scaleXMotion,
    scaleYMotion,
    ScrollToService,
    TabIndexDisabledControlValueAccessorMixin,
    ThyClickDispatcher,
    ThyPlacement
} from 'ngx-tethys/core';
import { ThyEmpty } from 'ngx-tethys/empty';
import { ThyLoading } from 'ngx-tethys/loading';
import {
    IThyOptionParentComponent,
    SelectControlSize,
    THY_OPTION_PARENT_COMPONENT,
    ThyOption,
    ThyOptionsContainer,
    ThyOptionSelectionChangeEvent,
    ThyScrollDirective,
    ThySelectControl,
    ThySelectOptionGroup,
    ThyStopPropagationDirective
} from 'ngx-tethys/shared';
import {
    A,
    coerceBooleanProperty,
    DOWN_ARROW,
    elementMatchClosest,
    END,
    ENTER,
    FunctionProp,
    hasModifierKey,
    helpers,
    HOME,
    isArray,
    isFunction,
    LEFT_ARROW,
    RIGHT_ARROW,
    SPACE,
    UP_ARROW
} from 'ngx-tethys/util';
import { defer, merge, Observable, Subject, Subscription, timer } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { outputToObservable } from '@angular/core/rxjs-interop';
import { injectLocale, ThySelectLocale } from 'ngx-tethys/i18n';
import {
    DEFAULT_SELECT_CONFIG,
    THY_SELECT_CONFIG,
    THY_SELECT_SCROLL_STRATEGY,
    ThyDropdownWidthMode,
    ThySelectConfig
} from '../select.config';

export type SelectMode = 'multiple' | '';

export type ThySelectTriggerType = 'click' | 'hover';

export const SELECT_PANEL_MAX_HEIGHT = 300;

export const SELECT_OPTION_MAX_HEIGHT = 40;

export const SELECT_OPTION_GROUP_MAX_HEIGHT = 30;

export const SELECT_PANEL_PADDING_TOP = 10;

export const THY_SELECT_PANEL_MIN_WIDTH = 200;

export interface OptionValue {
    thyLabelText?: string;
    thyValue?: string;
    thyDisabled?: boolean;
    thyShowOptionCustom?: boolean;
    thySearchKey?: string;
}

export interface ThySelectOptionModel {
    value?: string | number;
    disabled?: boolean;
    label?: string;
    icon?: string;
    groupLabel?: string;
}

interface ThyOptionGroupModel extends ThySelectOptionModel {
    children?: ThySelectOptionModel[];
}

const noop = () => {};

/**
 * 下拉选择组件
 * @name thy-select,thy-custom-select
 * @order 10
 */
@Component({
    selector: 'thy-select,thy-custom-select',
    templateUrl: './custom-select.component.html',
    exportAs: 'thySelect',
    providers: [
        {
            provide: THY_OPTION_PARENT_COMPONENT,
            useExisting: ThySelect
        },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySelect),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CdkOverlayOrigin,
        ThySelectControl,
        CdkConnectedOverlay,
        ThyStopPropagationDirective,
        NgClass,
        ThyScrollDirective,
        ThyLoading,
        ThyEmpty,
        ThyOptionsContainer,
        ThyOption,
        ThySelectOptionGroup,
        NgTemplateOutlet
    ],
    host: {
        '[class.thy-select-custom]': 'true',
        '[class.thy-select]': 'true',
        '[class.menu-is-opened]': 'panelOpen',
        '[attr.tabindex]': 'tabIndex',
        '(focus)': 'onFocus($event)',
        '(blur)': 'onBlur($event)'
    },
    animations: [scaleXMotion, scaleYMotion, scaleMotion]
})
export class ThySelect
    extends TabIndexDisabledControlValueAccessorMixin
    implements ControlValueAccessor, IThyOptionParentComponent, OnInit, AfterViewInit, AfterContentInit, OnDestroy
{
    private ngZone = inject(NgZone);
    private elementRef = inject(ElementRef);
    private changeDetectorRef = inject(ChangeDetectorRef);
    private overlay = inject(Overlay);
    private thyClickDispatcher = inject(ThyClickDispatcher);
    private platformId = inject(PLATFORM_ID);
    private locale: Signal<ThySelectLocale> = injectLocale('select');
    scrollStrategyFactory = inject<FunctionProp<ScrollStrategy>>(THY_SELECT_SCROLL_STRATEGY, { optional: true })!;
    selectConfig = inject(THY_SELECT_CONFIG, { optional: true })!;
    emptyIcon: Signal<string> = injectPanelEmptyIcon();

    disabled = false;

    mode: SelectMode = '';

    scrollTop = 0;

    modalValue: any = null;

    defaultOffset = 4;

    dropDownClass: { [key: string]: boolean };

    dropDownMinWidth: number | null = null;

    /**
     * 设置下拉框的最小宽度，默认值 `match-select`，表示与输入框的宽度一致；`min-width` 表示最小宽度为200px；支持自定义最小宽度，比如传 `{minWidth: 150}` 表示最小宽度为150px
     * @default match-select
     */
    readonly thyDropdownWidthMode = input<ThyDropdownWidthMode>();

    public dropDownPositions: ConnectionPositionPair[];

    public selectionModel: SelectionModel<ThyOption>;

    public triggerRectWidth: number;

    public scrollStrategy: ScrollStrategy;

    private resizeSubscription: Subscription;

    private selectionModelSubscription: Subscription;

    /**
     * 手动聚焦中的标识
     */
    private manualFocusing = false;

    private config: ThySelectConfig;

    private readonly destroy$ = new Subject<void>();

    readonly optionSelectionChanges: Observable<ThyOptionSelectionChangeEvent> = defer(() => {
        if (this.options) {
            return merge(...this.options.map(option => outputToObservable(option.selectionChange)));
        }
        return this.ngZone.onStable.asObservable().pipe(
            take(1),
            switchMap(() => this.optionSelectionChanges)
        );
    }) as Observable<ThyOptionSelectionChangeEvent>;

    readonly cdkConnectedOverlay = viewChild<CdkConnectedOverlay>(CdkConnectedOverlay);

    keyManager: ActiveDescendantKeyManager<ThyOption>;

    panelOpen = false;

    /**
     * 搜索时回调
     */
    readonly thyOnSearch = output<string>();

    /**
     * 下拉菜单滚动到底部事件，可以用这个事件实现滚动加载
     */
    readonly thyOnScrollToBottom = output<void>();

    /**
     * 下拉菜单展开和折叠状态事件
     */
    readonly thyOnExpandStatusChange = output<boolean>();

    /**
     * 下拉列表是否显示搜索框
     */
    readonly thyShowSearch = input(false, { transform: coerceBooleanProperty });

    /**
     * 选择框默认文字
     */
    readonly thyPlaceHolder = input<string>(this.locale().placeholder);

    /**
     * 是否使用服务端搜索，当为 true 时，将不再在前端进行过滤
     */
    readonly thyServerSearch = input(false, { transform: coerceBooleanProperty });

    /**
     * 异步加载 loading 状态，false 表示加载中，true 表示加载完成
     */
    readonly thyLoadState = input(true, { transform: coerceBooleanProperty });

    /**
     * 是否自动设置选项第一条为高亮状态
     */
    readonly thyAutoActiveFirstItem = input(true, { transform: coerceBooleanProperty });

    /**
     * 下拉选择模式
     * @type 'multiple' | ''
     */
    readonly thyMode = input<SelectMode>('');

    /**
     * 操作图标类型
     * @type primary | success | danger | warning
     * @default primary
     */
    readonly thySize = input<SelectControlSize>();

    /**
     * 数据为空时显示的提示文字
     */
    readonly thyEmptyStateText = input(this.locale().empty, { transform: (value: string) => value || this.locale().empty });

    /**
     * 搜索结果为空时显示的提示文字
     */
    readonly thyEmptySearchMessageText = input(this.locale().empty, { transform: (value: string) => value || this.locale().empty });

    /**
     * 滚动加载是否可用，只能当这个参数可以，下面的thyOnScrollToBottom事件才会触发
     */
    readonly thyEnableScrollLoad = input(false, { transform: coerceBooleanProperty });

    /**
     * 单选( thyMode="" 或者不设置)时，选择框支持清除
     */
    readonly thyAllowClear = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否禁用
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    set thyDisabled(value: boolean) {
        this.disabled = value;
    }
    get thyDisabled(): boolean {
        return this.disabled;
    }

    /**
     * 排序比较函数
     */
    readonly thySortComparator = input<(a: ThyOption, b: ThyOption, options: ThyOption[]) => number>();

    /**
     * Footer 模板，默认值为空不显示 Footer
     */
    readonly thyFooterTemplate = input<TemplateRef<any>>();

    /**
     * 弹出位置
     * @type ThyPlacement
     */
    readonly thyPlacement = input<ThyPlacement>();

    /**
     * 自定义 Overlay Origin
     */
    readonly thyOrigin = input<ElementRef | HTMLElement>();

    /**
     * 自定义 Footer 模板容器 class
     */
    readonly thyFooterClass = input<string>('thy-custom-select-footer');

    /**
     * @private
     */
    readonly selectedValueDisplayRef = contentChild<TemplateRef<any>>('selectedDisplay');

    /**
     * 初始化时，是否展开面板
     */
    readonly thyAutoExpand = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否弹出透明遮罩，如果显示遮罩则会阻止滚动区域滚动
     */
    readonly thyHasBackdrop = input(false, { transform: coerceBooleanProperty });

    /**
     * 设置多选时最大显示的标签数量，0 表示不限制，'auto' 表示自动计算显示数量，默认值为 0
     */
    readonly thyMaxTagCount = input(0, {
        transform: (value: number | 'auto') => {
            if (value === 'auto') return 'auto';
            return numberAttribute(value, 0);
        }
    });

    /**
     * 是否隐藏选择框边框
     */
    readonly thyBorderless = input(false, { transform: coerceBooleanProperty });

    isReactiveDriven = false;

    innerOptions: ThySelectOptionModel[];

    optionGroups: ThyOptionGroupModel[] = [];

    /**
     * option 列表
     */
    readonly thyOptions = input(undefined, {
        transform: (value: ThySelectOptionModel[]) => {
            if (value === null) {
                value = [];
            }
            this.innerOptions = value;
            this.isReactiveDriven = true;
            this.buildReactiveOptions();
            return value;
        }
    });

    options: QueryList<ThyOption>;

    /**
     * 目前只支持多选选中项的展示，默认为空，渲染文字模板，传入tag，渲染展示模板,
     * @default ''｜tag
     */
    readonly thyPreset = input<string>('');

    @ViewChild('trigger', { read: ElementRef, static: true }) trigger: ElementRef<HTMLElement>;

    readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

    /**
     * @private
     */
    @ContentChildren(ThyOption, { descendants: true }) contentOptions: QueryList<ThyOption>;

    @ViewChildren(ThyOption) viewOptions: QueryList<ThyOption>;

    /**
     * @private
     */
    readonly contentGroups = contentChildren<ThySelectOptionGroup>(ThySelectOptionGroup);

    readonly viewGroups = viewChildren<ThySelectOptionGroup>(ThySelectOptionGroup);

    @HostListener('keydown', ['$event'])
    handleKeydown(event: KeyboardEvent): void {
        if (!this.disabled) {
            if (event.keyCode === ENTER) {
                event.stopPropagation();
            }
            this.panelOpen ? this.handleOpenKeydown(event) : this.handleClosedKeydown(event);
        }
    }

    get optionsChanges$() {
        this.options = this.isReactiveDriven ? this.viewOptions : this.contentOptions;
        let previousOptions: ThyOption[] = this.options.toArray();
        return this.options.changes.pipe(
            map(data => {
                return this.options.toArray();
            }),
            filter(data => {
                const res = previousOptions.length !== data.length || previousOptions.some((op, index) => op !== data[index]);
                previousOptions = data;
                return res;
            })
        );
    }

    private buildScrollStrategy() {
        if (this.scrollStrategyFactory && isFunction(this.scrollStrategyFactory)) {
            this.scrollStrategy = this.scrollStrategyFactory();
        } else {
            this.scrollStrategy = this.overlay.scrollStrategies.reposition();
        }
    }

    private isSearching = false;

    groupBy = (item: ThySelectOptionModel) => item.groupLabel;

    get placement(): ThyPlacement {
        return this.thyPlacement() || this.config.placement;
    }

    constructor() {
        super();
        const selectConfig = this.selectConfig;

        this.config = { ...DEFAULT_SELECT_CONFIG, ...selectConfig };
        this.buildScrollStrategy();

        effect(() => {
            this.mode = this.thyMode();
            untracked(() => {
                this.instanceSelectionModel();
                this.getPositions();
                this.setDropDownClass();
            });
        });
    }

    writeValue(value: any): void {
        this.modalValue = value;
        this.setSelectionByModelValue(this.modalValue);
    }

    ngOnInit() {
        this.getPositions();
        this.dropDownMinWidth = this.getDropdownMinWidth();
        if (!this.selectionModel) {
            this.instanceSelectionModel();
        }
        this.setDropDownClass();

        if (isPlatformBrowser(this.platformId)) {
            this.thyClickDispatcher
                .clicked(0)
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                    if (!this.elementRef.nativeElement.contains(event.target) && this.panelOpen) {
                        this.ngZone.run(() => {
                            this.close();
                            this.changeDetectorRef.markForCheck();
                        });
                    }
                });
        }
    }

    buildOptionGroups(options: ThySelectOptionModel[]) {
        const optionGroups: ThyOptionGroupModel[] = [];
        const groups = [...new Set(options.filter(item => this.groupBy(item)).map(sub => this.groupBy(sub)))];
        const groupMap = new Map();
        groups.forEach(group => {
            const children = options.filter(item => this.groupBy(item) === group);
            const groupOption = {
                groupLabel: group,
                children: children
            };
            groupMap.set(group, groupOption);
        });
        options.forEach(option => {
            if (this.groupBy(option)) {
                const currentIndex = optionGroups.findIndex(item => item.groupLabel === this.groupBy(option));
                if (currentIndex === -1) {
                    const item = groupMap.get(this.groupBy(option));
                    optionGroups.push(item);
                }
            } else {
                optionGroups.push(option);
            }
        });
        return optionGroups;
    }

    buildReactiveOptions() {
        if (this.innerOptions.filter(item => this.groupBy(item)).length > 0) {
            this.optionGroups = this.buildOptionGroups(this.innerOptions);
        } else {
            this.optionGroups = this.innerOptions;
        }
    }

    getDropdownMinWidth(): number | null {
        const mode = this.thyDropdownWidthMode() || this.config.dropdownWidthMode;
        let dropdownMinWidth: number | null = null;

        if ((mode as { minWidth: number })?.minWidth) {
            dropdownMinWidth = (mode as { minWidth: number }).minWidth;
        } else if (mode === 'min-width') {
            dropdownMinWidth = THY_SELECT_PANEL_MIN_WIDTH;
        } else {
            dropdownMinWidth = null;
        }

        return dropdownMinWidth;
    }

    ngAfterViewInit(): void {
        if (this.isReactiveDriven) {
            this.setup();
        }
    }

    ngAfterContentInit() {
        if (!this.isReactiveDriven) {
            this.setup();
        }
    }

    setup() {
        this.optionsChanges$.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(data => {
            this.resetOptions();
            this.initializeSelection();
            this.initKeyManager();
            if (this.isSearching) {
                this.highlightCorrectOption(false);
                this.isSearching = false;
            }
            this.changeDetectorRef.markForCheck();
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                    if (this.cdkConnectedOverlay() && this.cdkConnectedOverlay().overlayRef) {
                        this.cdkConnectedOverlay().overlayRef.updatePosition();
                    }
                });
        });

        if (this.thyAutoExpand()) {
            timer(0).subscribe(() => {
                this.changeDetectorRef.markForCheck();
                this.open();
                this.focus();
            });
        }
    }

    public get isHiddenOptions(): boolean {
        return this.options.toArray().every(option => option.hidden());
    }

    public onAttached(): void {
        this.cdkConnectedOverlay()
            .positionChange.pipe(take(1))
            .subscribe(() => {
                if (this.panel()) {
                    if (this.keyManager.activeItem) {
                        ScrollToService.scrollToElement(this.keyManager.activeItem.element.nativeElement, this.panel().nativeElement);
                        this.changeDetectorRef.detectChanges();
                    } else {
                        if (!this.empty) {
                            ScrollToService.scrollToElement(
                                this.selectionModel.selected[0].element.nativeElement,
                                this.panel().nativeElement
                            );
                            this.changeDetectorRef.detectChanges();
                        }
                    }
                }
            });
    }

    public dropDownMouseMove(event: MouseEvent) {
        if (this.keyManager.activeItem) {
            this.keyManager.setActiveItem(-1);
        }
    }

    public onOptionsScrolled(elementRef: ElementRef) {
        const scroll = elementRef.nativeElement.scrollTop,
            height = elementRef.nativeElement.clientHeight,
            scrollHeight = elementRef.nativeElement.scrollHeight;

        if (scroll + height + 10 >= scrollHeight) {
            this.ngZone.run(() => {
                this.thyOnScrollToBottom.emit();
            });
        }
    }

    public onSearchFilter(searchText: string) {
        searchText = searchText.trim();
        if (this.thyServerSearch()) {
            this.isSearching = true;
            this.thyOnSearch.emit(searchText);
        } else {
            const options = this.options.toArray();
            options.forEach(option => {
                if (option.matchSearchText(searchText)) {
                    option.showOption();
                } else {
                    option.hideOption();
                }
            });
            this.highlightCorrectOption(false);
            this.updateCdkConnectedOverlayPositions();
        }
    }

    onBlur(event?: FocusEvent) {
        // Tab 聚焦后自动聚焦到 input 输入框，此分支下直接返回，无需触发 onTouchedFn
        if (elementMatchClosest(event?.relatedTarget as HTMLElement, ['.thy-select-dropdown', 'thy-select'])) {
            return;
        }
        this.onTouchedFn();
    }

    onFocus(event?: FocusEvent) {
        // thyShowSearch 与 panelOpen 均为 true 时，点击 thySelectControl 需要触发自动聚焦到 input 的逻辑
        // manualFocusing 如果是手动聚焦，不触发自动聚焦到 input 的逻辑
        if (
            (this.thyShowSearch() && this.panelOpen) ||
            (!this.manualFocusing &&
                !elementMatchClosest(event?.relatedTarget as HTMLElement, ['.thy-select-dropdown', 'thy-custom-select']))
        ) {
            const inputElement: HTMLInputElement = this.elementRef.nativeElement.querySelector('input');
            inputElement.focus();
        }
        this.manualFocusing = false;
    }

    public focus(options?: FocusOptions): void {
        this.manualFocusing = true;
        this.elementRef.nativeElement.focus(options);
        this.manualFocusing = false;
    }

    public remove($event: { item: ThyOption; $eventOrigin: Event }) {
        $event.$eventOrigin.stopPropagation();
        if (this.disabled) {
            return;
        }
        if (!this.options.find(option => option === $event.item)) {
            $event.item.deselect();
            // fix option unselect can not emit changes;
            this.onSelect($event.item, true);
        } else {
            $event.item.deselect();
        }
    }

    public clearSelectValue(event?: Event) {
        if (event) {
            event.stopPropagation();
        }
        if (this.disabled) {
            return;
        }
        this.selectionModel.clear();
        this.changeDetectorRef.markForCheck();
        this.emitModelValueChange();
    }

    public updateCdkConnectedOverlayPositions(): void {
        setTimeout(() => {
            if (this.cdkConnectedOverlay() && this.cdkConnectedOverlay().overlayRef) {
                this.cdkConnectedOverlay().overlayRef.updatePosition();
            }
        });
    }

    public get selected(): ThyOption | ThyOption[] {
        return this.isMultiple ? this.selectionModel.selected : this.selectionModel.selected[0];
    }

    public get isMultiple(): boolean {
        return this.mode === 'multiple';
    }

    public get empty(): boolean {
        return !this.selectionModel || this.selectionModel.isEmpty();
    }

    public getItemCount(): number {
        const group = this.isReactiveDriven ? this.viewGroups() : this.contentGroups();
        return this.options.length + group.length;
    }

    public toggle(event: MouseEvent): void {
        if (this.panelOpen) {
            if (!this.thyShowSearch()) {
                this.close();
            }
        } else {
            this.open();
        }
    }

    public open(): void {
        if (this.disabled || !this.options || this.panelOpen) {
            return;
        }
        this.triggerRectWidth = this.getOriginRectWidth();
        this.subscribeTriggerResize();
        this.panelOpen = true;
        this.highlightCorrectOption();
        this.thyOnExpandStatusChange.emit(this.panelOpen);
        this.changeDetectorRef.markForCheck();
    }

    public close(): void {
        if (this.panelOpen) {
            this.panelOpen = false;
            this.unsubscribeTriggerResize();
            this.thyOnExpandStatusChange.emit(this.panelOpen);
            this.changeDetectorRef.markForCheck();
            this.onTouchedFn();
        }
    }

    private emitModelValueChange() {
        const selectedValues = this.selectionModel.selected;
        const changeValue = selectedValues.map((option: ThyOption) => {
            return option.thyValue;
        });
        if (this.isMultiple) {
            this.modalValue = changeValue;
        } else {
            if (changeValue.length === 0) {
                this.modalValue = null;
            } else {
                this.modalValue = changeValue[0];
            }
        }
        this.onChangeFn(this.modalValue);
        this.updateCdkConnectedOverlayPositions();
    }

    private highlightCorrectOption(fromOpenPanel: boolean = true): void {
        if (this.keyManager && this.panelOpen) {
            if (fromOpenPanel) {
                if (this.keyManager.activeItem) {
                    return;
                }
                if (this.empty) {
                    if (!this.thyAutoActiveFirstItem()) {
                        return;
                    }
                    this.keyManager.setFirstItemActive();
                } else {
                    this.keyManager.setActiveItem(this.selectionModel.selected[0]);
                }
            } else {
                if (!this.thyAutoActiveFirstItem()) {
                    return;
                }
                // always set first option active
                this.keyManager.setFirstItemActive();
            }
        }
    }

    private initKeyManager() {
        if (this.keyManager && this.keyManager.activeItem) {
            this.keyManager.activeItem.setInactiveStyles();
        }
        this.keyManager = new ActiveDescendantKeyManager<ThyOption>(this.options)
            .withTypeAhead()
            .withWrap()
            .withVerticalOrientation()
            .withAllowedModifierKeys(['shiftKey']);

        this.keyManager.tabOut.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.focus();
            this.close();
        });
        this.keyManager.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
            if (this.panelOpen && this.panel()) {
                if (this.keyManager.activeItem) {
                    ScrollToService.scrollToElement(this.keyManager.activeItem.element.nativeElement, this.panel().nativeElement);
                }
            } else if (!this.panelOpen && !this.isMultiple && this.keyManager.activeItem) {
                this.keyManager.activeItem.selectViaInteraction();
            }
        });
    }

    private handleClosedKeydown(event: KeyboardEvent): void {
        const keyCode = event.keyCode;
        const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
        const isOpenKey = keyCode === ENTER || keyCode === SPACE;
        const manager = this.keyManager;

        // Open the select on ALT + arrow key to match the native <select>
        if ((isOpenKey && !hasModifierKey(event)) || ((this.isMultiple || event.altKey) && isArrowKey)) {
            event.preventDefault(); // prevents the page from scrolling down when pressing space
            this.open();
        } else if (!this.isMultiple) {
            if (keyCode === HOME || keyCode === END) {
                keyCode === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
                event.preventDefault();
            } else {
                manager.onKeydown(event);
            }
        }
    }

    private handleOpenKeydown(event: KeyboardEvent): void {
        const keyCode = event.keyCode;
        const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
        const manager = this.keyManager;

        if (keyCode === HOME || keyCode === END) {
            event.preventDefault();
            keyCode === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
        } else if (isArrowKey && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.close();
        } else if ((keyCode === ENTER || keyCode === SPACE) && (manager.activeItem || !this.empty) && !hasModifierKey(event)) {
            event.preventDefault();
            if (!manager.activeItem) {
                if (manager.activeItemIndex === -1 && !this.empty) {
                    manager.setActiveItem(this.selectionModel.selected[0]);
                }
            }
            manager.activeItem.selectViaInteraction();
        } else if (this.isMultiple && keyCode === A && event.ctrlKey) {
            event.preventDefault();
            const hasDeselectedOptions = this.options.some(opt => !opt.disabled && !opt.selected());

            this.options.forEach(option => {
                if (!option.disabled) {
                    hasDeselectedOptions ? option.select() : option.deselect();
                }
            });
        } else {
            if (manager.activeItemIndex === -1 && !this.empty) {
                manager.setActiveItem(this.selectionModel.selected[0]);
            }
            const previouslyFocusedIndex = manager.activeItemIndex;

            manager.onKeydown(event);

            if (
                this.isMultiple &&
                isArrowKey &&
                event.shiftKey &&
                manager.activeItem &&
                manager.activeItemIndex !== previouslyFocusedIndex
            ) {
                manager.activeItem.selectViaInteraction();
            }
        }
    }

    private getPositions() {
        this.dropDownPositions = getFlexiblePositions(this.thyPlacement() || this.config.placement, this.defaultOffset);
    }

    private instanceSelectionModel() {
        if (this.selectionModel) {
            this.selectionModel.clear();
        }
        this.selectionModel = new SelectionModel<ThyOption>(this.isMultiple);
        if (this.selectionModelSubscription) {
            this.selectionModelSubscription.unsubscribe();
            this.selectionModelSubscription = null;
        }
        this.selectionModelSubscription = this.selectionModel.changed.pipe(takeUntil(this.destroy$)).subscribe(event => {
            event.added.forEach(option => option.select());
            event.removed.forEach(option => option.deselect());
        });
    }

    private resetOptions() {
        const changedOrDestroyed$ = merge(this.optionsChanges$, this.destroy$);

        this.optionSelectionChanges.pipe(takeUntil(changedOrDestroyed$)).subscribe((event: ThyOptionSelectionChangeEvent) => {
            this.onSelect(event.option, event.isUserInput);
            if (event.isUserInput && !this.isMultiple && this.panelOpen) {
                this.close();
                this.focus();
            }
        });
    }

    private initializeSelection() {
        Promise.resolve().then(() => {
            this.setSelectionByModelValue(this.modalValue);
        });
    }

    private setDropDownClass() {
        let modeClass = '';
        if (this.isMultiple) {
            modeClass = `thy-select-dropdown-${this.mode}`;
        } else {
            modeClass = `thy-select-dropdown-single`;
        }
        this.dropDownClass = {
            [`thy-select-dropdown`]: true,
            [modeClass]: true
        };
    }

    private setSelectionByModelValue(modalValue: any) {
        if (helpers.isUndefinedOrNull(modalValue)) {
            if (this.selectionModel.selected.length > 0) {
                this.selectionModel.clear();
                this.changeDetectorRef.markForCheck();
            }
            return;
        }
        if (this.isMultiple) {
            if (isArray(modalValue)) {
                const selected = [...this.selectionModel.selected];
                this.selectionModel.clear();
                (modalValue as Array<any>).forEach(itemValue => {
                    const option =
                        this.options.find(_option => _option.thyValue === itemValue) ||
                        selected.find(_option => _option.thyValue === itemValue);
                    if (option) {
                        this.selectionModel.select(option);
                    }
                });
            }
        } else {
            const selectedOption = this.options?.find(option => {
                return option.thyValue === modalValue;
            });
            if (selectedOption) {
                this.selectionModel.select(selectedOption);
            }
        }
        this.changeDetectorRef.markForCheck();
    }

    private onSelect(option: ThyOption, isUserInput: boolean) {
        const wasSelected = this.selectionModel.isSelected(option);

        if (option.thyValue == null && !this.isMultiple) {
            option.deselect();
            this.selectionModel.clear();
        } else {
            if (wasSelected !== option.selected()) {
                option.selected() ? this.selectionModel.select(option) : this.selectionModel.deselect(option);
            }

            if (isUserInput) {
                this.keyManager.setActiveItem(option);
            }

            if (this.isMultiple) {
                this.sortValues();
                if (isUserInput) {
                    this.focus();
                }
            }
        }

        if (wasSelected !== this.selectionModel.isSelected(option)) {
            this.emitModelValueChange();
        }
        if (!this.isMultiple) {
            this.onTouchedFn();
        }
        this.changeDetectorRef.markForCheck();
    }

    private sortValues() {
        if (this.isMultiple) {
            const options = this.options.toArray();

            if (this.thySortComparator()) {
                this.selectionModel.sort((a, b) => {
                    return this.thySortComparator()(a, b, options);
                });
            }
        }
    }

    private getOriginRectWidth() {
        return this.thyOrigin() ? coerceElement(this.thyOrigin()).offsetWidth : this.trigger.nativeElement.offsetWidth;
    }

    private subscribeTriggerResize(): void {
        this.unsubscribeTriggerResize();
        this.ngZone.runOutsideAngular(() => {
            this.resizeSubscription = new Observable<number>(observer => {
                const resize = new ResizeObserver((entries: ResizeObserverEntry[]) => {
                    observer.next(null);
                });
                resize.observe(this.trigger.nativeElement);
            })
                .pipe(
                    startWith(),
                    map(() => {
                        return this.getOriginRectWidth();
                    }),
                    distinctUntilChanged()
                )
                .subscribe((width: number) => {
                    this.ngZone.run(() => {
                        this.triggerRectWidth = width;
                        this.updateCdkConnectedOverlayPositions();
                        this.changeDetectorRef.markForCheck();
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
