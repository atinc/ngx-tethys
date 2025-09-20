/**
 * 1. 打平 options 和 groups 并正常渲染
 * 2. thyOptions
 * 3. 修改选中值： ngModelChange 返回值给用户
 * （1）单选、多选，点击列表选中、取消
 * （2）清空
 * （3）多选，点击X，remove 单个
 * 4. 键盘操作：
 * （1）上下箭头 选中， enter 或 space 选中值
 * （2）按 space 打开、关闭
 * （4）按 esc 关闭
 * （5）按 tab 关闭，选中下一个select
 * （6）按 tab 选中下一个select，接着按 DOWN_ARROW 选中第一个选项
 * （7）HOME键 = fn+向左键     END 键 = fn+向右键    分别选中第一个和最后一个
 *
 * 5. 搜索：展示搜索的 option 以及 option 所属的 group
 *   (1) thy-option 、thy-group 模板
 *  （2） thyOptions
 *  （3）有选中值的情况下搜索  --- 搜索后，勾选要正确
 *   （3-1）本地搜索：有选中值的情况下搜索，搜索后，只展示匹配搜索的项，激活第一个
 *   (3-2) 服务端搜索：有选中项情况下，搜索，下拉列表展示 = 已选中项+匹配搜索的项，激活的是第一个选中项
 *
 * 6. 支持自定义 option 模板 thyShowOptionCustom
 *
 * 7. 高亮（激活）选项逻辑：
 *   打开下拉面板后，默认高亮第一个，有选中项的，高亮第一个选中项。
 *   鼠标在菜单上下移动，取消原高亮
 *   打开面板，点击向下键，点击 ESC。 再打开面板，滚动到上次高亮的项并高亮
 *
 * 8. 多选选项排序 thySortComparator
 *
 * Server Search 默认值没有展示
 * Load Data on Scroll   自定义加载状态
 *
 *
 * 检查调用，只有在打开了下拉面板之后，optionRenders 渲染之后，调用 highlightCorrectOption 才有效
 *
 *
 *
 * 每次打开面板，默认高亮第一个，回车能选中
 * TODO  检查多选 onTouchedFn 的调用是否和以前一样，是否返回给用户了
 *
 * TODO Async Load Data   ---- 打开时，重置了列表 [] 导致 selected-value 消失，进入 ngOnInit close ....
 *
 *
 * 什么时机需要  highlightCorrectOption：
 * open
 * 搜索导致的 optionsChanges
 * 滚动加载导致的 optionsChanges，不需要 highlightCorrectOption
 *
 * 服务端搜索
 *
 *
 * 禁用状态下的操作：禁用
 *
 *
 * 性能比对
 *
 *
 * Mark：
 * highlightCorrectOption 逻辑： 以前 optionsChanges$ 的监听很少触发，监听的是投影进来的 options 的变化，  搜索时不符合的通过 hidden 隐藏，这不会触发 optionsChanges$ 的变化
 * 现在 optionsChanges$ 的监听会经常触发，因为是监听的 optionRenders 的变化， 打开关闭面板、搜索都会触发 optionRenders 变化。  所以，几乎只在 optionsChanges$ 这一处统一调用 highlightCorrectOption 即可，不需要多个地方调用。
 *
 *
 *
 * 变量作用：
 * modelValue ：用于返回给用户
 *
 *
 * 破坏性更改：TODO  ThyOptionSelectionChangeEvent  isUserInput  selectionChange  ———— ngx-styx、ship等用到
 *
 */

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
    // IThyOptionParentComponent,
    SelectControlSize,
    // THY_OPTION_PARENT_COMPONENT,
    ThyOption,
    ThyOptionRender,
    ThyOptionsContainer,
    // ThyOptionSelectionChangeEvent,
    ThyScrollDirective,
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
    FunctionProp,
    hasModifierKey,
    helpers,
    HOME,
    isFunction,
    LEFT_ARROW,
    RIGHT_ARROW,
    SPACE,
    UP_ARROW
} from 'ngx-tethys/util';
import { defer, merge, Observable, Subject, Subscription, timer } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
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
    effect,
    untracked,
    viewChildren,
    contentChildren,
    afterNextRender,
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
import { outputToObservable } from '@angular/core/rxjs-interop';
import { SafeAny } from 'ngx-tethys/types';

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
        // {
        //     provide: THY_OPTION_PARENT_COMPONENT,
        //     useExisting: ThySelect
        // },
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
        ThyOptionRender,
        ThySelectOptionGroup,
        ThyOptionGroupRender,
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
}) // IThyOptionParentComponent,
export class ThySelect
    extends TabIndexDisabledControlValueAccessorMixin
    implements ControlValueAccessor, OnInit, AfterViewInit, AfterContentInit, OnDestroy
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

    // modalValue: any = null;
    // TODO  根据 modelValue + ThyOption => selectedOptions
    // TODO  检查  modelValue selectedValues 是否循环触发

    // 保持：多选是数组，单选是一个值
    // readonly modelValue = computed(() => {
    //     const selectedValues = this.selectedValues();
    //     if (this.isMultiple()) {
    //         return selectedValues;
    //     } else {
    //         if (selectedValues.length === 0) {
    //             return null;
    //         } else {
    //             return selectedValues[0];
    //         }
    //     }
    // });

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

    // public selectionModel: SelectionModel<ThyOptionRender>;

    public triggerRectWidth: WritableSignal<number> = signal(undefined);

    public scrollStrategy: ScrollStrategy;

    private resizeSubscription: Subscription;

    // private selectionModelSubscription: Subscription;

    /**
     * 手动聚焦中的标识
     */
    private manualFocusing = false;

    private config: ThySelectConfig;

    // TODO 用 private destroyRef = inject(DestroyRef);
    private readonly destroy$ = new Subject<void>();

    // readonly optionSelectionChanges: Observable<ThyOptionSelectionChangeEvent> = defer(() => {
    //     if (this.optionRenders) {
    //         return merge(...this.optionRenders.map(option => outputToObservable(option.selectionChange)));
    //     }
    //     return this.ngZone.onStable.asObservable().pipe(
    //         take(1),
    //         switchMap(() => this.optionSelectionChanges)
    //     );
    // }) as Observable<ThyOptionSelectionChangeEvent>;

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
    readonly thySortComparator = input<(a: ThyOptionRender, b: ThyOptionRender, options: ThyOptionRender[]) => number>();

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
     * 设置多选时最大显示的标签数量，0 表示不限制
     */
    readonly thyMaxTagCount = input(0, { transform: numberAttribute });

    /**
     * 是否隐藏选择框边框
     */
    readonly thyBorderless = input(false, { transform: coerceBooleanProperty });

    // /**
    //  * 设置是否开启虚拟滚动
    //  */
    // readonly thyVirtualScroll = input(false, { transform: coerceBooleanProperty });

    // /**
    //  * 开启虚拟滚动时，单行选项的高度
    //  * @default 40
    //  */
    // readonly thyItemSize = input(40, { transform: numberAttribute });

    // /**
    //  * 虚拟滚动时的容器高度
    //  */
    // readonly thyVirtualHeight = input('300px');

    // isReactiveDriven = false;

    // innerOptions: ThySelectOptionModel[];

    // optionGroups: ThyOptionGroupModel[] = [];

    private shouldHighlightCorrectOption = false;

    /**
     * option 列表
     */
    readonly thyOptions = input(undefined, {
        transform: (value: ThySelectOptionModel[]) => {
            if (helpers.isUndefinedOrNull(value)) {
                value = [];
            }
            // this.innerOptions = value;
            // this.isReactiveDriven = true;
            // this.buildReactiveOptions();
            // console.log('=== thyOptions ===:', value);
            return value;
        }
    });

    readonly keywords = signal<string>('');

    // options: QueryList<ThyOptionRender>;

    /**
     * 目前只支持多选选中项的展示，默认为空，渲染文字模板，传入tag，渲染展示模板,
     * @default ''｜tag
     */
    readonly thyPreset = input<string>('');

    @ViewChild('trigger', { read: ElementRef, static: true }) trigger: ElementRef<HTMLElement>;

    readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

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

            // 找到匹配的 option 和 group
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

            // 组装 满足渲染顺序的 renderGroupsAndOptions
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

    // @ViewChildren(ThyOptionRender) viewOptions: QueryList<ThyOptionRender>;

    /**
     * @private
     */
    readonly contentGroups = contentChildren<ThySelectOptionGroup>(ThySelectOptionGroup);

    readonly viewGroups = viewChildren<ThySelectOptionGroup>(ThySelectOptionGroup);

    @HostListener('keydown', ['$event'])
    keydown(event: KeyboardEvent): void {
        if (!this.disabled) {
            if (event.keyCode === ENTER) {
                event.stopPropagation();
            }

            // this.panelOpen ? this.handleOpenKeydown(event) : this.handleClosedKeydown(event);

            // keydown 事件触发时，保证 panel 是打开的，保证 optionRenders 存在，才能做激活和选中操作。 ng-zorro 也如此
            if (!this.panelOpen) {
                this.open();
            }
            this.handleKeydown(event);
        }
    }

    get optionsChanges$() {
        // this.options = this.isReactiveDriven ? this.viewOptions : this.optionRenders;
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

    // get optionsChanges$() {
    //     // this.options = this.isReactiveDriven ? this.viewOptions : this.optionRenders;
    //     // Mark： 这里不能用 optionRenders，因为展开收起都会导致 optionRenders 重新渲染，导致 keyManager 重新初始化
    //     let previousOptions: ThyOption[] = this.contentOptions.toArray();
    //     return this.contentOptions.changes.pipe(
    //         map(data => {
    //             return this.contentOptions.toArray();
    //         }),
    //         filter(data => {
    //             const res = previousOptions.length !== data.length || previousOptions.some((op, index) => op !== data[index]);
    //             previousOptions = data;
    //             return res;
    //         })
    //     );
    // }

    private buildScrollStrategy() {
        if (this.scrollStrategyFactory && isFunction(this.scrollStrategyFactory)) {
            this.scrollStrategy = this.scrollStrategyFactory();
        } else {
            this.scrollStrategy = this.overlay.scrollStrategies.reposition();
        }
    }

    // private isSearching = false;

    // groupBy = (item: ThySelectOptionModel) => item.groupLabel;

    // 转成 select-control 接收的 SelectOptionBase | SelectOptionBase[] 类型
    // readonly selectedOptions = computed<SelectOptionBase | SelectOptionBase[]>(() => {
    //     const selectedValues = this.selectedValues() || [];
    //     const isMultiple = this.isMultiple();

    //     console.log('===selectedValues===', this.selectedValues());
    //     console.log('===this.allGroupsAndOptions()===', this.allGroupsAndOptions());

    //     if (!selectedValues.length) {
    //         return isMultiple ? [] : null;
    //     }

    //     // const allOptionsMap = untracked(() =>
    //     //     helpers.keyBy(
    //     //         this.allGroupsAndOptions().filter(item => item.type === 'option'),
    //     //         'value'
    //     //     )
    //     // );

    //     const allOptionsMap = helpers.keyBy(
    //         this.allGroupsAndOptions().filter(item => item.type === 'option'),
    //         'value'
    //     );

    //     const result: SelectOptionBase[] = [];
    //     for (const value of selectedValues) {
    //         const option = allOptionsMap[value];
    //         if (option) {
    //             result.push({
    //                 thyLabelText: option.label,
    //                 thyValue: option.value,
    //                 thyRawValue: option.rawValue
    //             });
    //         }
    //     }

    //     if (isMultiple) {
    //         return result.length > 0 ? result : [];
    //     }
    //     return result.length > 0 ? result[0] : null;
    // });

    // constructor() {
    //     super();
    //     const selectConfig = this.selectConfig;

    //     this.config = { ...DEFAULT_SELECT_CONFIG, ...selectConfig };
    //     this.buildScrollStrategy();

    //     effect(() => {
    //         this.mode = this.thyMode();
    //         untracked(() => {
    //             this.instanceSelectionModel();
    //             this.getPositions();
    //             this.setDropDownClass();
    //         });
    //     });
    // }

    constructor() {
        super();
        const selectConfig = this.selectConfig;

        this.config = { ...DEFAULT_SELECT_CONFIG, ...selectConfig };
        this.buildScrollStrategy();

        // 以 modelValue 为标准，就不需要在这里弄了
        // effect(()=>{
        //     // 每当 mode 改变，需要重置 selectedOptions
        //     this.selectedOptions.set(this.isMultiple()?[]:null)
        // })

        // TODO  to computed
        afterRenderEffect(() => {
            const newOptions = this.newOptions();
            const newGroups = this.newGroups();
            const reactiveOptions = this.thyOptions();

            untracked(() => {
                this.buildAllGroupsAndOptions();
            });
        });

        afterRenderEffect(() => {
            console.log('==allGroupsAndOptions===>', this.allGroupsAndOptions());
            const allOptionsMap = helpers.keyBy(
                this.allGroupsAndOptions().filter(item => item.type === 'option'),
                'value'
            );
            const selectedValues = this.selectedValues();
            console.log('==selectedValues===>', selectedValues);
            const oldSelectedOptionsMap = untracked(() => {
                const selected = this.selectedOptions();
                let aaa: SelectOptionBase[];
                if (helpers.isArray(selected)) {
                    aaa = selected;
                } else if (selected) {
                    aaa = [selected];
                } else {
                    aaa = [];
                }

                return helpers.keyBy(aaa, 'thyValue');
            });

            console.log('===allOptionsMap===>', allOptionsMap);
            console.log('===oldSelectedOptionsMap===', oldSelectedOptionsMap);

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
                console.log('===newOptions===', newOptions);
                // if(isMultiple){
                //     this.selectedOptions.set(newOptions);
                // }else{
                //     if(newOptions.length){
                //         this.selectedOptions.set(newOptions[0])
                //     }else{
                //         this.selectedOptions.set(null);
                //     }
                // }
                this.selectedOptions.set(isMultiple ? newOptions : newOptions.length ? newOptions[0] : null);
            } else {
                this.selectedOptions.set(isMultiple ? [] : null);
            }
            console.log('=====selectedOptions====>', this.selectedOptions());
        });
    }

    // ✅ 接收用户传进来的 ngModel 数据，并更新 selectedValues
    writeValue(value: any): void {
        // this.modelValue.set(value);

        const selectedValues = this.buildSelectedValues(value);
        // 保持：始终是数组
        this.selectedValues.set([...selectedValues]);
        console.log('==writeValue===>', this.selectedValues());

        // this.setSelectionByModelValue(this.modalValue);
    }

    ngOnInit() {
        // console.log('=== ngOnInit ===');
        // console.log('newOptions:', this.newOptions());
        // console.log('newGroups:', this.newGroups());
        // this.getPositions();
        // this.dropDownMinWidth = this.getDropdownMinWidth(); // to computed
        // if (!this.selectionModel) {
        //     this.instanceSelectionModel();
        // }
        // this.setDropDownClass();
        if (isPlatformBrowser(this.platformId)) {
            this.thyClickDispatcher
                .clicked(0)
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                    if (!this.elementRef.nativeElement.contains(event.target) && this.panelOpen) {
                        this.ngZone.run(() => {
                            this.close();
                            console.log('===ngOnInit0 clicked close===');
                            this.changeDetectorRef.markForCheck();
                        });
                    }
                });
        }
    }

    // ✅ 将用户传进来的 ngModel 数据(单选、多选)转成数组 selectedValues
    private buildSelectedValues(value: SafeAny): SafeAny[] {
        if (helpers.isUndefinedOrNull(value)) {
            return [];
        } else if (this.isMultiple()) {
            return value;
        } else {
            return [value];
        }
    }

    // ✅ 打平 groups 和 options
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

    // ✅  处理用户传进来的 thyOptions
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

    // ✅ 处理用户传进来的 thy-group 、thy-option 模板
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

    // buildOptionGroups(options: ThySelectOptionModel[]) {
    // const optionGroups: ThyOptionGroupModel[] = [];
    // const groups = [...new Set(options.filter(item => this.groupBy(item)).map(sub => this.groupBy(sub)))];
    // const groupMap = new Map();
    // groups.forEach(group => {
    //     const children = options.filter(item => this.groupBy(item) === group);
    //     const groupOption = {
    //         groupLabel: group,
    //         children: children
    //     };
    //     groupMap.set(group, groupOption);
    // });
    // options.forEach(option => {
    //     if (this.groupBy(option)) {
    //         const currentIndex = optionGroups.findIndex(item => item.groupLabel === this.groupBy(option));
    //         if (currentIndex === -1) {
    //             const item = groupMap.get(this.groupBy(option));
    //             optionGroups.push(item);
    //         }
    //     } else {
    //         optionGroups.push(option);
    //     }
    // });
    // return optionGroups;
    // }

    // buildReactiveOptions() {
    // if (this.innerOptions.filter(item => this.groupBy(item)).length > 0) {
    //     this.optionGroups = this.buildOptionGroups(this.innerOptions);
    // } else {
    //     this.optionGroups = this.innerOptions;
    // }
    // }

    ngAfterViewInit(): void {
        // console.log('=== ngAfterViewInit ===');
        // console.log('newOptions:', this.newOptions());
        // console.log('newGroups:', this.newGroups());
        // // if (this.isReactiveDriven) {
        this.setup();
        // // }
    }

    ngAfterContentInit() {
        // console.log('=== ngAfterContentInit ===');
        // console.log('newOptions:', this.newOptions());
        // console.log('newGroups:', this.newGroups());
        // if (!this.isReactiveDriven) {
        //     this.setup();
        // }
    }

    setup() {
        this.optionsChanges$.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(data => {
            // this.resetOptions();
            // this.initializeSelection();
            this.initKeyManager();
            // if (this.isSearching) {
            //     console.log('optionsChanges$ isSearching 触发 highlightCorrectOption, isSearching = false');
            //     // this.highlightCorrectOption(false);
            //     this.isSearching = false;
            // } else {

            // 打开下拉面板后，保证 optionRenders 渲染完了，再调用 highlightCorrectOption （以前是在 open 里调的）
            // 加个判断，防止滚动加载更多选项时，也触发跳动到默认激活项
            if (this.shouldHighlightCorrectOption) {
                this.shouldHighlightCorrectOption = false;
                this.highlightCorrectOption();
            }
            // }
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

    // public get isHiddenOptions(): boolean {
    //     return this.optionRenders.toArray().every(option => option.hidden());
    // }

    public onAttached(): void {
        // console.log('===打开下拉菜单===');
        this.cdkConnectedOverlay()
            .positionChange.pipe(take(1))
            .subscribe(() => {
                if (this.panel()) {
                    if (this.keyManager.activeItem) {
                        ScrollToService.scrollToElement(this.keyManager.activeItem.element.nativeElement, this.panel().nativeElement);
                        this.changeDetectorRef.detectChanges();
                    } else {
                        if (!this.empty()) {
                            // ScrollToService.scrollToElement(
                            //     this.selectionModel.selected[0].element.nativeElement,
                            //     this.panel().nativeElement
                            // );

                            const selectedValue = this.selectedValues().length > 0 ? this.selectedValues()[0] : null;
                            if (selectedValue) {
                                const option = this.optionRenders.find(option => option.thyValue === selectedValue);
                                if (option) {
                                    ScrollToService.scrollToElement(option.element.nativeElement, this.panel().nativeElement);
                                }
                            }

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

    public search(keywords: string) {
        this.shouldHighlightCorrectOption = true;
        this.keywords.set(keywords.trim());

        // 搜索 触发 option-render selected 状态重新计算
        this.selectedValues.set([...this.selectedValues()]);

        if (this.thyServerSearch()) {
            // this.isSearching = true;
            // console.log('thyServerSearch  isSearching = true');
            this.thyOnSearch.emit(keywords);
        } else {
            // const options = this.optionRenders.toArray();
            // options.forEach(option => {
            //     if (option.matchSearchText(keyword)) {
            //         option.showOption();
            //     } else {
            //         option.hideOption();
            //     }
            // });

            // this.highlightCorrectOption(false);  // 以前的 search 触发 highlightCorrectOption，和 optionsChanges$ 那里重复
            console.log('以前的 search 触发 highlightCorrectOption');
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

    // 多选，点击X，移除单个
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
        // this.changeDetectorRef.markForCheck();
        this.emitModelValueChange();
    }

    // 清除
    public clearSelectValue(event?: Event) {
        if (event) {
            event.stopPropagation();
        }
        if (this.disabled) {
            return;
        }
        this.selectedValues.set([]);
        // this.changeDetectorRef.markForCheck();
        this.emitModelValueChange();
    }

    public updateCdkConnectedOverlayPositions(): void {
        setTimeout(() => {
            if (this.cdkConnectedOverlay() && this.cdkConnectedOverlay().overlayRef) {
                this.cdkConnectedOverlay().overlayRef.updatePosition();
            }
        });
    }

    // public get selected(): ThyOptionRender | ThyOptionRender[] {
    //     return this.isMultiple ? this.selectionModel.selected : this.selectionModel.selected[0];
    // }

    // public get isMultiple(): boolean {
    //     return this.mode === 'multiple';
    // }

    readonly isMultiple = computed<boolean>(() => {
        return this.thyMode() === 'multiple';
    });

    // public get empty(): boolean {
    //     return !this.selectionModel || this.selectionModel.isEmpty();
    // }

    readonly empty = computed(() => {
        return !this.selectedValues().length;
    });

    // private
    activatedOptionValue: SafeAny;

    public toggle(event: MouseEvent): void {
        if (this.panelOpen) {
            if (!this.thyShowSearch()) {
                this.close();
                console.log('===toggle0 clicked close===');
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
        // this.highlightCorrectOption(); // 改到 optionsChanges$ 里调用，等optionRenders 渲染完了，再调用 highlightCorrectOption
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

    // ✅ 实时更新位置，ngModelChange 返回值给用户
    private emitModelValueChange() {
        // const selectedValues = this.selectedValues();
        // if (this.isMultiple) {
        //     this.modalValue = selectedValues;
        // } else {
        //     if (selectedValues.length === 0) {
        //         this.modalValue = null;
        //     } else {
        //         this.modalValue = selectedValues[0];
        //     }
        // }

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

    // TODO  检查调用，只有在打开了下拉面板之后，optionRenders 渲染了，才能进行高亮
    // 去掉参数 fromOpenPanel: boolean = true
    // 以前，服务端搜索的时候会传入 fromOpenPanel false，然后走 else 激活第一个， 现在监听的是 optionsChanges$ 的变化，会走 B B1 ，执行逻辑及效果和以前意义。
    // 也就不需要全局的 isSearching 变量来标记 服务端搜索要传入 fromOpenPanel false
    private highlightCorrectOption(): void {
        if (this.keyManager && this.panelOpen) {
            // if (fromOpenPanel) {
            if (this.keyManager.activeItem) {
                // console.log('===A===');
                return;
            }

            if (this.activatedOptionValue) {
                console.log('=== has activatedOptionValue ===');
                const option = this.optionRenders.find(option => option.thyValue === this.activatedOptionValue);
                if (option) {
                    this.keyManager.setActiveItem(option);
                }
                return;
            }

            if (this.empty()) {
                // 没有选中项时，默认激活第一个（如果之前激活过并通过点击 ESC 突出，则激活上次激活过的）
                // console.log('===B 没有选中项===');
                if (!this.thyAutoActiveFirstItem()) {
                    // console.log('===B0===');
                    return;
                }

                const firstOption = this.optionRenders.toArray().length > 0 ? this.optionRenders.toArray()[0] : null;
                if (firstOption) {
                    this.keyManager.setActiveItem(firstOption);
                }
                // this.keyManager.setFirstItemActive();
                // console.log('===B1 默认激活第一个===');
            } else {
                // console.log('===C ===');
                // this.keyManager.setActiveItem(this.selectionModel.selected[0]);
                const selectedValue = this.selectedValues().length > 0 ? this.selectedValues()[0] : null;
                if (selectedValue) {
                    const option = this.optionRenders.find(option => option.thyValue === selectedValue);
                    if (option) {
                        // console.log('==E===');
                        this.keyManager.setActiveItem(option);
                    }
                }
            }
            // }
            // else
            // {
            //     console.log('===D===');
            //     if (!this.thyAutoActiveFirstItem()) {
            //         console.log('===D0===');
            //         return;
            //     }
            //     // always set first option active
            //     this.keyManager.setFirstItemActive();
            //     console.log('===D1===');
            // }
        }
    }

    private initKeyManager() {
        // console.log('===initKeyManager activeItem===', this.keyManager?.activeItem);
        // if (this.keyManager && this.keyManager.activeItem) {
        //     console.log('===initKeyManager0 取消激活样式===');
        //     this.keyManager.activeItem.setInactiveStyles();
        // }
        this.keyManager = new ActiveDescendantKeyManager<ThyOptionRender>(this.optionRenders)
            .withTypeAhead()
            .withWrap()
            .withVerticalOrientation()
            .withAllowedModifierKeys(['shiftKey']);

        this.keyManager.tabOut.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.focus();
            this.close();
            console.log('===initKeyManager1 tabOut focus close===');
        });

        // highlightCorrectOption 会激活hover正确的项；就会触发 keyManager.change 去滚动到激活项
        this.keyManager.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
            // if (this.panelOpen && this.panel()) {
            //     if (this.keyManager.activeItem) {
            //         console.log('keyManager.change 滚动到激活元素 3');
            //         ScrollToService.scrollToElement(this.keyManager.activeItem.element.nativeElement, this.panel().nativeElement);
            //     }
            // } else if (!this.panelOpen && !this.isMultiple() && this.keyManager.activeItem) {
            //   // 如果 !this.panelOpen， 是拿不到 option 的
            //     this.keyManager.activeItem.selectViaInteraction();
            // }
            // this.activatedOptionValue = this.keyManager.activeItem?.thyValue;

            if (this.panelOpen && this.panel()) {
                if (this.keyManager.activeItem && this.keyManager.activeItem.thyValue !== this.activatedOptionValue) {
                    ScrollToService.scrollToElement(this.keyManager.activeItem.element.nativeElement, this.panel().nativeElement);
                    this.activatedOptionValue = this.keyManager.activeItem?.thyValue;
                }
            }
        });
    }

    // keydown 事件统一先保证面板打开，再处理
    // private handleClosedKeydown(event: KeyboardEvent): void {
    //     const keyCode = event.keyCode;
    //     const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
    //     const isOpenKey = keyCode === ENTER || keyCode === SPACE;
    //     const manager = this.keyManager;

    //     // Open the select on ALT + arrow key to match the native <select>
    //     if ((isOpenKey && !hasModifierKey(event)) || ((this.isMultiple() || event.altKey) && isArrowKey)) {
    //         event.preventDefault(); // prevents the page from scrolling down when pressing space
    //         this.open();
    //         console.log('===handleClosedKeydown0 ALT + arrow key===');
    //     } else if (!this.isMultiple()) {
    //         if (keyCode === HOME || keyCode === END) {
    //             keyCode === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
    //             event.preventDefault();
    //             console.log('===handleClosedKeydown1 HOME 或 END===');
    //         } else {
    //             manager.onKeydown(event);
    //             console.log('===handleClosedKeydown2 onKeydown===');
    //         }
    //     }
    // }

    private handleKeydown(event: KeyboardEvent): void {
        const keyCode = event.keyCode;
        const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
        const manager = this.keyManager;

        if (keyCode === HOME || keyCode === END) {
            event.preventDefault();
            keyCode === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
            console.log('===handleOpenKeydown0 HOME 或 END===');
        } else if (isArrowKey && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.close();
            console.log('===handleOpenKeydown1 ALT + arrow key close===');
        } else if ((keyCode === ENTER || keyCode === SPACE) && (manager.activeItem || !this.empty()) && !hasModifierKey(event)) {
            event.preventDefault();
            if (!manager.activeItem) {
                if (manager.activeItemIndex === -1 && !this.empty()) {
                    //    manager.setActiveItem(this.selectionModel.selected[0]);
                    const selectedValue = this.selectedValues().length > 0 ? this.selectedValues()[0] : null;
                    if (selectedValue) {
                        const option = this.optionRenders.find(option => option.thyValue === selectedValue);
                        if (option) {
                            manager.setActiveItem(option);
                        }
                    }
                }
            }
            manager.activeItem.selectViaInteraction();
            console.log('===handleOpenKeydown2 ENTER 或 SPACE===');
        } else if (this.isMultiple() && keyCode === A && event.ctrlKey) {
            event.preventDefault();
            const hasDeselectedOptions = this.optionRenders.some(opt => !opt.disabled && !opt.selected());

            this.optionRenders.forEach(option => {
                if (!option.disabled) {
                    hasDeselectedOptions ? option.select() : option.deselect();
                }
            });
            console.log('===handleOpenKeydown3 A 或 CTRL===');
        } else {
            if (manager.activeItemIndex === -1 && !this.empty()) {
                // manager.setActiveItem(this.selectionModel.selected[0]);
                const selectedValue = this.selectedValues().length > 0 ? this.selectedValues()[0] : null;
                if (selectedValue) {
                    const option = this.optionRenders.find(option => option.thyValue === selectedValue);
                    if (option) {
                        manager.setActiveItem(option);
                    }
                }
            }
            const previouslyFocusedIndex = manager.activeItemIndex;

            // 需要保证 panel 是打开的
            manager.onKeydown(event);
            console.log('===handleOpenKeydown4 onKeydown===');

            if (
                this.isMultiple() &&
                isArrowKey &&
                event.shiftKey &&
                manager.activeItem &&
                manager.activeItemIndex !== previouslyFocusedIndex
            ) {
                manager.activeItem.selectViaInteraction();
                console.log('===handleOpenKeydown5 selectViaInteraction===');
            }
        }
    }

    // private instanceSelectionModel() {
    //     if (this.selectionModel) {
    //         this.selectionModel.clear();
    //     }
    //     this.selectionModel = new SelectionModel<ThyOptionRender>(this.isMultiple);
    //     if (this.selectionModelSubscription) {
    //         this.selectionModelSubscription.unsubscribe();
    //         this.selectionModelSubscription = null;
    //     }
    //     this.selectionModelSubscription = this.selectionModel.changed.pipe(takeUntil(this.destroy$)).subscribe(event => {
    //         event.added.forEach(option => option.select());
    //         event.removed.forEach(option => option.deselect());
    //     });
    // }

    // private resetOptions() {
    // const changedOrDestroyed$ = merge(this.optionsChanges$, this.destroy$);
    // this.optionSelectionChanges.pipe(takeUntil(changedOrDestroyed$)).subscribe((event: ThyOptionSelectionChangeEvent) => {
    //     this.onSelect(event.option, event.isUserInput);
    //     if (event.isUserInput && !this.isMultiple && this.panelOpen) {
    //         this.close();
    //         this.focus();
    //     }
    // });
    // }

    // private initializeSelection() {
    //     Promise.resolve().then(() => {
    //         this.setSelectionByModelValue(this.modalValue);
    //     });
    // }

    // private setSelectionByModelValue(modalValue: any) {
    //     if (helpers.isUndefinedOrNull(modalValue)) {
    //         if (this.selectionModel.selected.length > 0) {
    //             this.selectionModel.clear();
    //             this.changeDetectorRef.markForCheck();
    //         }
    //         return;
    //     }
    //     if (this.isMultiple) {
    //         if (isArray(modalValue)) {
    //             const selected = [...this.selectionModel.selected];
    //             this.selectionModel.clear();
    //             (modalValue as Array<any>).forEach(itemValue => {
    //                 const option =
    //                     this.optionRenders.find(_option => _option.thyValue === itemValue) ||
    //                     selected.find(_option => _option.thyValue === itemValue);
    //                 if (option) {
    //                     this.selectionModel.select(option);
    //                 }
    //             });
    //         }
    //     } else {
    //         const selectedOption = this.optionRenders?.find(option => {
    //             return option.thyValue === modalValue;
    //         });
    //         if (selectedOption) {
    //             this.selectionModel.select(selectedOption);
    //         }
    //     }
    //     this.changeDetectorRef.markForCheck();
    // }

    // ✅ 单选、多选，点击列表选中、取消
    optionClick(value: SafeAny) {
        if (this.isMultiple()) {
            // const selectedValues = this.modelValue() || [];
            const selectedValues = this.selectedValues() || [];
            const index = selectedValues.indexOf(value);
            if (index > -1) {
                selectedValues.splice(index, 1);
            } else {
                selectedValues.push(value);
            }
            if (this.thySortComparator()) {
                const optionRenders = this.optionRenders.toArray();
                const optionRendersMap = helpers.keyBy(optionRenders, 'thyValue');
                selectedValues.sort((a: SafeAny, b: SafeAny) => {
                    const aOptionRender = optionRendersMap[a];
                    const bOptionRender = optionRendersMap[b];
                    return this.thySortComparator()(aOptionRender, bOptionRender, optionRenders);
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

    // private onSelect(option: ThyOptionRender, isUserInput: boolean) {
    //     const wasSelected = this.selectionModel.isSelected(option);

    //     if (option.thyValue == null && !this.isMultiple) {
    //         option.deselect();
    //         this.selectionModel.clear();
    //     } else {
    //         if (wasSelected !== option.selected()) {
    //             option.selected() ? this.selectionModel.select(option) : this.selectionModel.deselect(option);
    //         }

    //         if (isUserInput) {
    //             this.keyManager.setActiveItem(option);
    //         }

    //         if (this.isMultiple) {
    //             this.sortValues();
    //             if (isUserInput) {
    //                 this.focus();
    //             }
    //         }
    //     }

    //     if (wasSelected !== this.selectionModel.isSelected(option)) {
    //         this.emitModelValueChange();
    //     }
    //     if (!this.isMultiple) {
    //         this.onTouchedFn();
    //     }
    //     this.changeDetectorRef.markForCheck();
    // }

    private sortValues() {
        // if (this.isMultiple) {
        //     const options = this.optionRenders.toArray();
        //     if (this.thySortComparator()) {
        //         this.selectionModel.sort((a, b) => {
        //             return this.thySortComparator()(a, b, options);
        //         });
        //     }
        // }
    }

    private getOriginRectWidth() {
        return this.thyOrigin() ? coerceElement(this.thyOrigin()).offsetWidth : this.trigger.nativeElement.offsetWidth;
    }

    // ✅ 监听 trigger 的宽度变化，更新下拉框的位置
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

    trackByFn(index: number, item: any): any {
        return item.value || index;
    }

    ngOnDestroy() {
        this.unsubscribeTriggerResize();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
