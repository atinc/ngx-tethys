import {
    getFlexiblePositions,
    injectPanelEmptyIcon,
    scaleMotion,
    scaleXMotion,
    scaleYMotion,
    TabIndexDisabledControlValueAccessorMixin,
    ThyClickDispatcher,
    ThyPlacement
} from 'ngx-tethys/core';
import { ThyEmpty } from 'ngx-tethys/empty';
import { ThyLoading } from 'ngx-tethys/loading';
import {
    SelectControlSize,
    ThyOption,
    ThyOptionRender,
    ThySelectControl,
    ThySelectOptionGroup,
    ThyStopPropagationDirective,
    ThyOptionGroupRender,
    SelectOptionBase
} from 'ngx-tethys/shared';
import {
    A,
    coerceBooleanProperty,
    DOWN_ARROW,
    elementMatchClosest,
    END,
    ENTER,
    TAB,
    FunctionProp,
    hasModifierKey,
    helpers,
    HOME,
    isFunction,
    SPACE,
    UP_ARROW
} from 'ngx-tethys/util';
import { Observable, Subscription, timer } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, take } from 'rxjs/operators';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { coerceElement } from '@angular/cdk/coercion';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectionPositionPair, Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { isPlatformBrowser, NgClass, NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostListener,
    Input,
    NgZone,
    numberAttribute,
    OnDestroy,
    OnInit,
    output,
    PLATFORM_ID,
    QueryList,
    TemplateRef,
    ViewChild,
    viewChild,
    ViewChildren,
    inject,
    Signal,
    input,
    contentChild,
    untracked,
    viewChildren,
    contentChildren,
    afterRenderEffect,
    signal,
    computed,
    linkedSignal,
    WritableSignal,
    DestroyRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
    DEFAULT_SELECT_CONFIG,
    THY_SELECT_CONFIG,
    THY_SELECT_SCROLL_STRATEGY,
    ThyDropdownWidthMode,
    ThySelectConfig
} from '../select.config';
import { injectLocale, ThySelectLocale } from 'ngx-tethys/i18n';
import { SafeAny } from 'ngx-tethys/types';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

interface ThyRenderItem {
    type: 'option' | 'group';
    value?: string | number;
    rawValue?: any;
    label?: string;
    showOptionCustom?: boolean;
    disabled?: boolean;
    template?: TemplateRef<any>;
    searchKey?: string;
    groupLabel?: string;
}

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
        ThyLoading,
        ThyEmpty,
        ThyOptionRender,
        ThyOptionGroupRender,
        NgTemplateOutlet,
        ScrollingModule
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
export class ThySelect extends TabIndexDisabledControlValueAccessorMixin implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
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

    defaultOffset = 4;

    readonly dropDownClass = computed<{ [key: string]: boolean }>(() => {
        const modeClass = `thy-select-dropdown-${this.isMultiple() ? 'multiple' : 'single'}`;
        return {
            [`thy-select-dropdown`]: true,
            [modeClass]: true
        };
    });

    readonly dropDownMinWidth = computed<number | null>(() => {
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
    });

    /**
     * 设置下拉框的最小宽度，默认值 `match-select`，表示与输入框的宽度一致；`min-width` 表示最小宽度为200px；支持自定义最小宽度，比如传 `{minWidth: 150}` 表示最小宽度为150px
     * @default match-select
     */
    readonly thyDropdownWidthMode = input<ThyDropdownWidthMode>();

    readonly placement = computed<ThyPlacement>(() => {
        return this.thyPlacement() || this.config.placement;
    });

    readonly dropDownPositions = computed<ConnectionPositionPair[]>(() => {
        return getFlexiblePositions(this.placement(), this.defaultOffset);
    });

    public triggerRectWidth: WritableSignal<number> = signal(undefined);

    public scrollStrategy: ScrollStrategy;

    private resizeSubscription: Subscription;

    /**
     * 手动聚焦中的标识
     */
    private manualFocusing = false;

    private config: ThySelectConfig;

    private destroyRef = inject(DestroyRef);

    readonly cdkConnectedOverlay = viewChild<CdkConnectedOverlay>(CdkConnectedOverlay);

    keyManager: ActiveDescendantKeyManager<ThyOptionRender>;

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

    public itemSize = 40;

    public maxItemLength = 7;

    private scrolledIndex = 0;

    readonly cdkVirtualScrollViewport = viewChild<CdkVirtualScrollViewport>(CdkVirtualScrollViewport);

    private shouldHighlightCorrectOption = false;

    /**
     * option 列表
     */
    readonly thyOptions = input(undefined, {
        transform: (value: ThySelectOptionModel[]) => {
            if (helpers.isUndefinedOrNull(value)) {
                value = [];
            }
            return value;
        }
    });

    readonly keywords = signal<string>('');

    /**
     * 目前只支持多选选中项的展示，默认为空，渲染文字模板，传入tag，渲染展示模板,
     * @default ''｜tag
     */
    readonly thyPreset = input<string>('');

    @ViewChild('trigger', { read: ElementRef, static: true }) trigger: ElementRef<HTMLElement>;

    // 暂时命名 newOptions，避免与原来的混淆，最后改成 options
    readonly newOptions = contentChildren<ThyOption>(ThyOption, { descendants: true });

    readonly newGroups = contentChildren<ThySelectOptionGroup>(ThySelectOptionGroup, { descendants: true });

    readonly allGroupsAndOptions = signal<ThyRenderItem[]>([]);

    readonly renderGroupsAndOptions = computed<ThyRenderItem[]>(() => {
        const keywords = this.keywords();
        const isServerSearch = this.thyServerSearch();
        const allGroupsAndOptions = this.allGroupsAndOptions();
        let filteredGroupsAndOptions: ThyRenderItem[] = [];

        if (keywords && !isServerSearch) {
            const lowerKeywords = keywords.toLowerCase();

            const matchedOptions = new Set<string | number>();
            const matchedGroupLabels = new Set<string>();

            for (const item of allGroupsAndOptions) {
                if (item.type === 'option') {
                    const isMatch = (item.searchKey || item.label).toLowerCase().indexOf(lowerKeywords) > -1;
                    if (isMatch) {
                        matchedOptions.add(item.value);
                        if (item.groupLabel) {
                            matchedGroupLabels.add(item.groupLabel);
                        }
                    }
                }
            }

            for (const item of allGroupsAndOptions) {
                if (item.type === 'group' && matchedGroupLabels.has(item.label)) {
                    filteredGroupsAndOptions.push(item);
                } else if (item.type === 'option' && matchedOptions.has(item.value)) {
                    filteredGroupsAndOptions.push(item);
                }
            }

            return filteredGroupsAndOptions;
        }
        return [...allGroupsAndOptions];
    });

    readonly renderOptions = computed<ThyRenderItem[]>(() => {
        return this.renderGroupsAndOptions().filter(item => item.type === 'option');
    });

    readonly selectedValues = linkedSignal<SelectMode, SafeAny[]>({
        source: () => this.thyMode(),
        computation: () => {
            return [];
        }
    });

    readonly selectedOptions: WritableSignal<SelectOptionBase | SelectOptionBase[]> = linkedSignal<SelectMode, SafeAny[]>({
        source: () => this.thyMode(),
        computation: () => {
            return this.thyMode() === 'multiple' ? [] : null;
        }
    });

    /**
     * @private
     */
    @ContentChildren(ThyOption, { descendants: true }) contentOptions: QueryList<ThyOption>;

    @ViewChildren(ThyOptionGroupRender) optionGroupRenders: QueryList<ThyOptionGroupRender>;

    @ViewChildren(ThyOptionRender) optionRenders: QueryList<ThyOptionRender>;

    /**
     * @private
     */
    readonly contentGroups = contentChildren<ThySelectOptionGroup>(ThySelectOptionGroup);

    readonly viewGroups = viewChildren<ThySelectOptionGroup>(ThySelectOptionGroup);

    @HostListener('keydown', ['$event'])
    keydown(event: KeyboardEvent): void {
        if (this.disabled) {
            return;
        }
        if (event.keyCode === ENTER) {
            event.stopPropagation();
        }

        this.handleKeydown(event);
    }

    get optionsChanges$() {
        let previousOptions: ThyOptionRender[] = this.optionRenders.toArray();
        return this.optionRenders.changes.pipe(
            map(data => {
                return this.optionRenders.toArray();
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

    constructor() {
        super();
        const selectConfig = this.selectConfig;

        this.config = { ...DEFAULT_SELECT_CONFIG, ...selectConfig };
        this.buildScrollStrategy();

        afterRenderEffect(() => {
            const newOptions = this.newOptions();
            const newGroups = this.newGroups();
            const reactiveOptions = this.thyOptions();

            untracked(() => {
                this.buildAllGroupsAndOptions();
            });
        });

        afterRenderEffect(() => {
            const allOptionsMap = helpers.keyBy(
                this.allGroupsAndOptions().filter(item => item.type === 'option'),
                'value'
            );
            const selectedValues = this.selectedValues();
            const oldSelectedOptionsMap = untracked(() => {
                const selected = this.selectedOptions();
                let oldSelectedOptions: SelectOptionBase[];
                if (helpers.isArray(selected)) {
                    oldSelectedOptions = selected;
                } else if (selected) {
                    oldSelectedOptions = [selected];
                } else {
                    oldSelectedOptions = [];
                }

                return helpers.keyBy(oldSelectedOptions, 'thyValue');
            });

            let newOptions: SelectOptionBase[] = [];
            const isMultiple = untracked(() => this.isMultiple());
            if (selectedValues.length) {
                selectedValues.forEach(value => {
                    let option: ThyRenderItem = allOptionsMap[value];

                    if (option) {
                        newOptions.push({
                            thyLabelText: option.label,
                            thyValue: option.value,
                            thyRawValue: option.rawValue
                        });
                    } else if (oldSelectedOptionsMap[value]) {
                        newOptions.push(oldSelectedOptionsMap[value]);
                    }
                });

                this.selectedOptions.set(isMultiple ? newOptions : newOptions.length ? newOptions[0] : null);
            } else {
                this.selectedOptions.set(isMultiple ? [] : null);
            }
        });
    }

    writeValue(value: SafeAny): void {
        let selectedValues: SafeAny[];
        if (helpers.isUndefinedOrNull(value)) {
            selectedValues = [];
        } else if (this.isMultiple()) {
            selectedValues = value;
        } else {
            selectedValues = [value];
        }
        this.selectedValues.set(selectedValues);
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.thyClickDispatcher
                .clicked(0)
                .pipe(takeUntilDestroyed(this.destroyRef))
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

    ngAfterViewInit(): void {
        this.setup();
    }

    private setup() {
        this.optionsChanges$.pipe(startWith(null), takeUntilDestroyed(this.destroyRef)).subscribe(data => {
            // Don't scroll to default highlighted option when scroll load more options
            if (this.shouldHighlightCorrectOption) {
                this.shouldHighlightCorrectOption = false;
                this.scrollToActivatedValue();
            }

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

    private buildAllGroupsAndOptions() {
        let allGroupsAndOptions: ThyRenderItem[];
        const isReactiveDriven = this.thyOptions()?.length > 0;
        if (isReactiveDriven) {
            allGroupsAndOptions = this.allGroupsAndOptionsByReactive();
        } else {
            allGroupsAndOptions = this.allGroupsAndOptionsByTemplate();
        }
        this.allGroupsAndOptions.set(allGroupsAndOptions);
    }

    private allGroupsAndOptionsByReactive(): ThyRenderItem[] {
        const options = this.thyOptions();
        const groupMap = new Map<string, ThySelectOptionModel[]>();
        const ungroupedOptions: ThySelectOptionModel[] = [];

        let groupsAndOptions: ThyRenderItem[] = [];

        for (const option of options) {
            if (option.groupLabel) {
                if (!groupMap.has(option.groupLabel)) {
                    groupMap.set(option.groupLabel, []);
                }
                groupMap.get(option.groupLabel)!.push(option);
            } else {
                ungroupedOptions.push(option);
            }
        }

        for (const [groupLabel, groupOptions] of groupMap) {
            groupsAndOptions.push({
                type: 'group',
                label: groupLabel
            });
            for (const option of groupOptions) {
                groupsAndOptions.push({
                    type: 'option',
                    value: option.value,
                    label: option.label,
                    rawValue: option,
                    showOptionCustom: false,
                    disabled: !!option.disabled,
                    groupLabel: option.groupLabel
                });
            }
        }

        for (const option of ungroupedOptions) {
            groupsAndOptions.push({
                type: 'option',
                value: option.value,
                label: option.label,
                rawValue: option,
                showOptionCustom: false,
                disabled: !!option.disabled
            });
        }

        return groupsAndOptions;
    }

    private allGroupsAndOptionsByTemplate(): ThyRenderItem[] {
        const options = this.newOptions();
        const groups = this.newGroups();

        let groupsAndOptions: ThyRenderItem[] = [];

        if (options && options.length > 0) {
            groupsAndOptions = options.map((option: ThyOption) => {
                const { thyValue, thyRawValue, thyLabelText, thyShowOptionCustom, thyDisabled, template, thySearchKey, groupLabel } =
                    option;

                return {
                    type: 'option',
                    value: thyValue(),
                    rawValue: thyRawValue(),
                    label: thyLabelText(),
                    showOptionCustom: thyShowOptionCustom(),
                    disabled: thyDisabled(),
                    template: template(),
                    searchKey: thySearchKey(),
                    groupLabel: groupLabel
                };
            });
        }

        if (groups && groups.length > 0) {
            for (const group of groups) {
                const groupIndex = groupsAndOptions.findIndex(option => option.groupLabel === group.thyGroupLabel());
                if (groupIndex > -1) {
                    const groupItem: ThyRenderItem = {
                        type: 'group',
                        label: group.thyGroupLabel(),
                        disabled: group.thyDisabled()
                    };
                    groupsAndOptions.splice(groupIndex, 0, groupItem);
                }
            }
        }

        return groupsAndOptions;
    }

    public optionsScrolled(index: number) {
        this.scrolledIndex = index;

        if (this.thyEnableScrollLoad()) {
            const isScrollToBottom = index + this.maxItemLength >= this.renderGroupsAndOptions().length;
            if (isScrollToBottom) {
                this.thyOnScrollToBottom.emit();
            }
        }

        this.reUpdateSelectedStatus();
    }

    public search(keywords: string) {
        this.shouldHighlightCorrectOption = true;
        this.keywords.set(keywords.trim());
        this.reUpdateSelectedStatus();

        if (this.thyServerSearch()) {
            this.thyOnSearch.emit(keywords);
        } else {
            this.updateCdkConnectedOverlayPositions();
        }
    }

    private reUpdateSelectedStatus() {
        this.selectedValues.set([...this.selectedValues()]);
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

    public remove($event: { item: ThyOptionRender; $eventOrigin: Event }) {
        $event.$eventOrigin.stopPropagation();
        if (this.disabled) {
            return;
        }
        const selectedValue = this.selectedValues();
        const index = selectedValue.indexOf($event.item.thyValue);
        if (index > -1) {
            this.selectedValues.set([...selectedValue.slice(0, index), ...selectedValue.slice(index + 1)]);
        }
        this.emitModelValueChange();
    }

    public clearSelectValue(event?: Event) {
        if (event) {
            event.stopPropagation();
        }
        if (this.disabled) {
            return;
        }
        this.selectedValues.set([]);
        this.emitModelValueChange();
    }

    public updateCdkConnectedOverlayPositions(): void {
        setTimeout(() => {
            if (this.cdkConnectedOverlay() && this.cdkConnectedOverlay().overlayRef) {
                this.cdkConnectedOverlay().overlayRef.updatePosition();
            }
        });
    }

    readonly isMultiple = computed<boolean>(() => {
        return this.thyMode() === 'multiple';
    });

    readonly empty = computed(() => {
        return !this.selectedValues().length;
    });

    activatedValue = signal(null);

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
        if (this.disabled || !this.optionRenders || this.panelOpen) {
            return;
        }
        this.triggerRectWidth.set(this.getOriginRectWidth());
        this.subscribeTriggerResize();
        this.panelOpen = true;
        this.shouldHighlightCorrectOption = true;
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
        let modelValue: SafeAny;
        const selectedValues = this.selectedValues();
        if (this.isMultiple()) {
            modelValue = selectedValues;
        } else {
            if (selectedValues.length === 0) {
                modelValue = null;
            } else {
                modelValue = selectedValues[0];
            }
        }
        this.onChangeFn(modelValue);
        this.updateCdkConnectedOverlayPositions();
    }

    private scrollToActivatedValue(needSelect: boolean = false): void {
        if (!this.panelOpen) {
            return;
        }

        let toActivatedValue = this.activatedValue();
        if (!toActivatedValue) {
            if (this.selectedValues().length > 0) {
                toActivatedValue = this.selectedValues()[0];
            } else {
                if (this.thyAutoActiveFirstItem()) {
                    toActivatedValue = this.renderGroupsAndOptions().find(item => item.type === 'option')?.value || null;
                }
            }

            if (!toActivatedValue) {
                return;
            }
            this.activatedValue.set(toActivatedValue);
        }

        const targetIndex = this.renderGroupsAndOptions().findIndex(item => item.value === toActivatedValue);
        if (targetIndex === -1) {
            return;
        }

        if (targetIndex < this.scrolledIndex || targetIndex >= this.scrolledIndex + this.maxItemLength) {
            this.cdkVirtualScrollViewport()?.scrollToIndex(targetIndex || 0);
        }

        if (needSelect) {
            this.optionRenders.find(option => option.thyValue === toActivatedValue)?.selectViaInteraction();
        }
    }

    private handleKeydown(event: KeyboardEvent): void {
        const keyCode = event.keyCode;
        const isOpenKey = keyCode === ENTER || keyCode === SPACE;
        const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;

        if (event.altKey) {
            if (this.panelOpen && isArrowKey) {
                event.preventDefault();
                this.close();
                return;
            }
        }

        if (!this.panelOpen) {
            this.open();
            if (isOpenKey) {
                event.preventDefault();
                return;
            }
        }

        const renderOptions = this.renderOptions();
        if (keyCode === DOWN_ARROW || keyCode === UP_ARROW) {
            event.preventDefault();

            const currentIndex = renderOptions.findIndex(item => item.value === this.activatedValue());
            if (currentIndex === -1) {
                return;
            }

            let targetIndex: number;
            if (keyCode === DOWN_ARROW) {
                targetIndex = currentIndex + 1;
                if (targetIndex > renderOptions.length - 1) {
                    targetIndex = 0;
                }
            } else {
                targetIndex = currentIndex - 1;
                if (targetIndex < 0) {
                    targetIndex = renderOptions.length - 1;
                }
            }

            const targetOption = renderOptions[targetIndex];
            this.activatedValue.set(targetOption.value);

            if (!hasModifierKey(event)) {
                this.scrollToActivatedValue();
            } else if (this.isMultiple() && event.shiftKey) {
                this.scrollToActivatedValue(true);
            }
        } else if (keyCode === HOME || keyCode === END) {
            event.preventDefault();
            const targetOption = keyCode === HOME ? renderOptions[0] : renderOptions[renderOptions.length - 1];
            this.activatedValue.set(targetOption.value);
            this.scrollToActivatedValue();
        } else if ((keyCode === ENTER || keyCode === SPACE) && (this.activatedValue() || !this.empty()) && !hasModifierKey(event)) {
            event.preventDefault();
            this.scrollToActivatedValue(true);
        } else if (this.isMultiple() && keyCode === A && event.ctrlKey) {
            event.preventDefault();
            const hasDeselectedOptions = renderOptions.some(opt => !opt.disabled && !this.selectedValues().includes(opt.value));
            let selectedValues: SafeAny[] = [];
            if (hasDeselectedOptions) {
                selectedValues = renderOptions.filter(option => !option.disabled).map(option => option.value);
            }
            this.selectedValues.set(selectedValues);
            this.emitModelValueChange();
        } else if (keyCode === TAB) {
            this.focus();
            this.close();
        }
    }

    optionClick(event: { value: SafeAny; isUserInput?: boolean }) {
        const { value, isUserInput } = event;
        const newOptions = this.newOptions();
        const option = newOptions.find(option => option.thyValue() === value);
        if (option) {
            option.selectionChange.emit({ option, isUserInput });
        }

        if (this.isMultiple()) {
            const selectedValues = this.selectedValues() || [];
            const index = selectedValues.indexOf(value);
            if (index > -1) {
                selectedValues.splice(index, 1);
            } else {
                selectedValues.push(value);
            }
            if (this.thySortComparator()) {
                selectedValues.sort((a: SafeAny, b: SafeAny) => {
                    const aOption = newOptions.find(option => option.thyValue() === a);
                    const bOption = newOptions.find(option => option.thyValue() === b);
                    return this.thySortComparator()(aOption, bOption, [...newOptions]);
                });
            }
            this.selectedValues.set([...selectedValues]);
        } else {
            this.selectedValues.set([value]);
            this.close();
        }

        this.emitModelValueChange();
        if (!this.isMultiple()) {
            this.onTouchedFn();
        }
    }

    optionHover(value: SafeAny) {
        this.activatedValue.set(value);
    }

    mouseLeaveOptions() {
        this.activatedValue.set(null);
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
                        this.triggerRectWidth.set(width);
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

    trackByFn(index: number, item: ThyRenderItem): SafeAny {
        if (item.type === 'group') {
            return item.label || index;
        }
        if (item.type === 'option') {
            return item.value || index;
        }
    }

    ngOnDestroy() {
        this.unsubscribeTriggerResize();
    }
}
