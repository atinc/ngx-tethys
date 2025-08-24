/**
 * 1. 打平 options 和 groups 并正常渲染
 * 2. thyOptions
 * 3. 修改选中值： ngModelChange 返回值给用户
 * （1）单选、多选，点击列表选中、取消
 * （2）清空
 * （3）多选，点击X，remove 单个
 * 4. 键盘操作：
 * （1）上下箭头 选中， enter 或 space 修改值
 * （2）space 打开、关闭
 * （4）esc 关闭
 * （5）tab 关闭，选中下一个select
 *
 * 5. 搜索：展示搜索的 option 以及 option 所属的 group
 *   (1) thy-option 模板
 *  （2） thyOptions
 *  （3）有选中值的情况下搜索  --- 是否是列表中有，上面才会展示？
 *
 * 服务端搜索
 *
 *
 * 禁用状态下的操作：禁用
 * thySortComparator ??
 *
 * 性能比对
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
    IThyOptionParentComponent,
    SelectControlSize,
    THY_OPTION_PARENT_COMPONENT,
    ThyOption,
    ThyOptionRender,
    ThyOptionsContainer,
    ThyOptionSelectionChangeEvent,
    ThyScrollDirective,
    ThySelectControl,
    ThySelectOptionGroup,
    ThyStopPropagationDirective,
    ThySelectOptionGroupRender,
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
    isArray,
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
    WritableSignal
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
        ThyOptionRender,
        ThySelectOptionGroup,
        ThySelectOptionGroupRender,
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

    // modalValue: any = null;

    readonly modelValue = linkedSignal(() => {
        const selectedValues = this.selectedValues();
        if (this.isMultiple()) {
            return selectedValues;
        } else {
            if (selectedValues.length === 0) {
                return null;
            } else {
                return selectedValues[0];
            }
        }
    });

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

    private keyManager: ActiveDescendantKeyManager<ThyOptionRender>;

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

    optionGroups: ThyOptionGroupModel[] = [];

    /**
     * option 列表
     */
    readonly thyOptions = input(undefined, {
        transform: (value: ThySelectOptionModel[]) => {
            if (value === null || value === undefined) {
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

    readonly renderItems = signal<ThyRenderItem[]>([]);

    readonly selectedValues = signal<SafeAny[]>([]);

    // select-control 统一接受的是 SelectOptionBase 类型，所以这里需要转换一下
    readonly selectedOptions = computed<SelectOptionBase | SelectOptionBase[]>(() => {
        const selectedValues = this.selectedValues() || [];

        if (!selectedValues.length) {
            return this.isMultiple() ? [] : null;
        }

        if (this.isMultiple()) {
            const options: SelectOptionBase[] = [];
            selectedValues.forEach((value: SafeAny) => {
                const option = this.convertToSelectOptionBaseByValue(value);
                if (option) {
                    options.push(option);
                }
            });
            return options;
        } else {
            return this.convertToSelectOptionBaseByValue(selectedValues[0]);
        }
    });

    readonly originRectWidth = computed(() => {
        return this.thyOrigin() ? coerceElement(this.thyOrigin()).offsetWidth : this.trigger.nativeElement.offsetWidth;
    });

    /**
     * @private
     */
    @ContentChildren(ThyOption, { descendants: true }) contentOptions: QueryList<ThyOption>;

    @ViewChildren(ThyOptionRender) optionRenders: QueryList<ThyOptionRender>;

    // @ViewChildren(ThyOptionRender) viewOptions: QueryList<ThyOptionRender>;

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

    private buildScrollStrategy() {
        if (this.scrollStrategyFactory && isFunction(this.scrollStrategyFactory)) {
            this.scrollStrategy = this.scrollStrategyFactory();
        } else {
            this.scrollStrategy = this.overlay.scrollStrategies.reposition();
        }
    }

    private isSearching = false;

    // groupBy = (item: ThySelectOptionModel) => item.groupLabel;

    constructor() {
        super();
        const selectConfig = this.selectConfig;

        this.config = { ...DEFAULT_SELECT_CONFIG, ...selectConfig };
        this.buildScrollStrategy();

        // effect(() => {
        //     this.mode = this.thyMode();
        //     untracked(() => {
        //         // this.instanceSelectionModel();
        //         // this.getPositions();
        //         this.setDropDownClass();
        //     });
        // });

        // effect(() => {
        //     console.log('=== effect ===');
        //     console.log('newOptions:', this.newOptions());
        //     console.log('newGroups:', this.newGroups());
        // });

        // afterNextRender(() => {
        //     console.log('=== afterNextRender ===');
        //     console.log('newOptions:', this.newOptions());
        //     console.log('newGroups:', this.newGroups());
        // });

        afterRenderEffect(() => {
            // console.log('=== afterRenderEffect ===');
            // console.log('newOptions:', this.newOptions());
            // console.log('newGroups:', this.newGroups());

            // 打平 options 和 groups

            const newOptions = this.newOptions();
            const newGroups = this.newGroups();
            const reactiveOptions = this.thyOptions();

            untracked(() => {
                this.buildRenderItems();
            });
        });
    }

    // ✅ 接收用户传进来的 ngModel 数据，并更新 selectedValues
    writeValue(value: any): void {
        // 保持：多选是数组，单选是一个值
        this.modelValue.set(value);

        const selectedValue = this.buildSelectedValuesOfList(value);
        // 保持：始终是数组
        this.selectedValues.set([...selectedValue]);

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
                            this.changeDetectorRef.markForCheck();
                        });
                    }
                });
        }
    }

    // ✅ 将用户传进来的 ngModel 数据(单选、多选)转成数组 selectedValues
    private buildSelectedValuesOfList(value: any) {
        if (value === null || value === undefined) {
            return [];
        } else if (this.isMultiple()) {
            return value;
        } else {
            return [value];
        }
    }

    // ✅ 转成 thySelectControl 接受的类型
    private convertToSelectOptionBaseByValue(value: SafeAny): SelectOptionBase | null {
        // 只有 option 有 value , group 没有，所以直接在 renderItems 中找，不影响结果
        const option = this.renderItems().find(option => option.value === value);
        if (option) {
            return {
                thyLabelText: option.label,
                thyValue: option.value,
                thyRawValue: option.rawValue
            };
        }
        return null;
    }

    // ✅ 打平 options 和 groups 并正常渲染
    private buildRenderItems() {
        let items: ThyRenderItem[];
        const isReactiveDriven = this.thyOptions()?.length > 0;
        if (isReactiveDriven) {
            items = this.buildRenderItemsByReactiveOptions();
        } else {
            items = this.buildRenderItemsByTemplateOptions();
        }
        this.renderItems.set(items);
        this.selectedValues.set([...this.selectedValues()]); // 触发搜索后列表的selected状态计算
    }

    // ✅  处理用户传进来的 thyOptions & keywords
    private buildRenderItemsByReactiveOptions(): ThyRenderItem[] {
        const keywords = this.keywords();
        const isServerSearch = this.thyServerSearch();

        const options =
            keywords && !isServerSearch
                ? this.thyOptions().filter(option => option.label.toLowerCase().indexOf(keywords.toLowerCase()) >= 0)
                : this.thyOptions();
        const groupMap = new Map<string, ThySelectOptionModel[]>();
        const ungroupedOptions: ThySelectOptionModel[] = [];

        let items: ThyRenderItem[] = [];

        options.forEach((option: ThySelectOptionModel) => {
            if (option.groupLabel) {
                if (!groupMap.has(option.groupLabel)) {
                    groupMap.set(option.groupLabel, []);
                }
                groupMap.get(option.groupLabel)!.push(option);
            } else {
                ungroupedOptions.push(option);
            }
        });

        groupMap.forEach((groupOptions, groupLabel) => {
            items.push({
                type: 'group',
                label: groupLabel
            });
            groupOptions.forEach((option: ThySelectOptionModel) => {
                items.push({
                    type: 'option',
                    value: option.value,
                    label: option.label,
                    rawValue: option,
                    showOptionCustom: false,
                    disabled: !!option.disabled
                });
            });
        });

        ungroupedOptions.forEach((option: ThySelectOptionModel) => {
            items.push({
                type: 'option',
                value: option.value,
                label: option.label,
                rawValue: option,
                showOptionCustom: false,
                disabled: !!option.disabled
            });
        });

        return items;
    }

    // ✅ 处理用户传进来的 thy-option 模板 & keywords
    private buildRenderItemsByTemplateOptions(): ThyRenderItem[] {
        const keywords = this.keywords();
        const isServerSearch = this.thyServerSearch();

        const options =
            keywords && !isServerSearch
                ? this.newOptions().filter(
                      option => (option.thySearchKey() || option.thyLabelText()).toLowerCase().indexOf(keywords.toLowerCase()) >= 0
                  )
                : this.newOptions();

        const groups =
            keywords && !isServerSearch
                ? this.newGroups().filter(group => options.some((option: ThyOption) => option.groupLabel === group.thyGroupLabel()))
                : this.newGroups();

        let items: ThyRenderItem[] = [];

        if (options && options.length > 0) {
            items = options.map((option: ThyOption) => {
                return {
                    type: 'option',
                    value: option.thyValue(),
                    rawValue: option.thyRawValue(),
                    label: option.thyLabelText(),
                    showOptionCustom: option.thyShowOptionCustom(),
                    disabled: option.thyDisabled(),
                    template: option.template(),
                    searchKey: option.thySearchKey(),
                    groupLabel: option.groupLabel
                };
            });
        }

        if (groups && groups.length > 0) {
            groups.forEach((group: ThySelectOptionGroup) => {
                const groupIndex = items.findIndex(option => option.groupLabel === group.thyGroupLabel());
                if (groupIndex > -1) {
                    const groupItem: ThyRenderItem = {
                        type: 'group',
                        label: group.thyGroupLabel(),
                        disabled: group.thyDisabled()
                    };
                    items.splice(groupIndex, 0, groupItem);
                }
            });
        }

        return items;
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
            this.resetOptions();
            // this.initializeSelection();
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

    // public get isHiddenOptions(): boolean {
    //     return this.optionRenders.toArray().every(option => option.hidden());
    // }

    public onAttached(): void {
        this.cdkConnectedOverlay()
            .positionChange.pipe(take(1))
            .subscribe(() => {
                // if (this.panel()) {
                //     if (this.keyManager.activeItem) {
                //         ScrollToService.scrollToElement(this.keyManager.activeItem.element.nativeElement, this.panel().nativeElement);
                //         this.changeDetectorRef.detectChanges();
                //     } else {
                //         if (!this.empty()) {
                //             ScrollToService.scrollToElement(
                //                 this.selectionModel.selected[0].element.nativeElement,
                //                 this.panel().nativeElement
                //             );
                //             this.changeDetectorRef.detectChanges();
                //         }
                //     }
                // }
            });
    }

    public dropDownMouseMove(event: MouseEvent) {
        // if (this.keyManager.activeItem) {
        //     this.keyManager.setActiveItem(-1);
        // }
    }

    private getOptionFromEvent(event: Event): ThyOptionRender | null {
        const targetElement = event.target as HTMLElement;
        if (elementMatchClosest(targetElement, 'thy-option-render')) {
            const optionElement = targetElement.closest('thy-option-render') as HTMLElement;
            if (optionElement) {
                return this.findOptionByElement(optionElement);
            }
        }
        return null;
    }

    private isOptionSelectable(option: ThyOptionRender | null): option is ThyOptionRender {
        return option !== null && !option.disabled;
    }

    private findOptionByElement(element: HTMLElement): ThyOptionRender | null {
        const allOptions = this.optionRenders.toArray();
        return allOptions.find(option => option.getHostElement() === element) || null;
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
        this.keywords.set(keywords.trim());
        if (this.thyServerSearch()) {
            this.isSearching = true;
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

            // 根据 keyword 过滤 renderItems
            this.buildRenderItems();
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
        return this.renderItems().length === 0;
    });

    public getItemCount(): number {
        // const group = this.isReactiveDriven ? this.viewGroups() : this.contentGroups();
        // return this.options.length + group.length;
        return this.optionRenders.length;
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
        if (this.disabled || !this.optionRenders || this.panelOpen) {
            return;
        }
        this.triggerRectWidth.set(this.originRectWidth());
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
        this.onChangeFn(this.modelValue());
        this.updateCdkConnectedOverlayPositions();
    }

    private highlightCorrectOption(fromOpenPanel: boolean = true): void {
        if (this.keyManager && this.panelOpen) {
            if (fromOpenPanel) {
                if (this.keyManager.activeItem) {
                    return;
                }
                if (this.empty()) {
                    if (!this.thyAutoActiveFirstItem()) {
                        return;
                    }
                    this.keyManager.setFirstItemActive();
                } else {
                    // this.keyManager.setActiveItem(this.selectionModel.selected[0]);
                    const selectedValue = this.selectedValues().length > 0 ? this.selectedValues()[0] : null;
                    if (selectedValue) {
                        const option = this.optionRenders.find(option => option.thyValue === selectedValue);
                        if (option) {
                            this.keyManager.setActiveItem(option);
                        }
                    }
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
        this.keyManager = new ActiveDescendantKeyManager<ThyOptionRender>(this.optionRenders)
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
            } else if (!this.panelOpen && !this.isMultiple() && this.keyManager.activeItem) {
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
        if ((isOpenKey && !hasModifierKey(event)) || ((this.isMultiple() || event.altKey) && isArrowKey)) {
            event.preventDefault(); // prevents the page from scrolling down when pressing space
            this.open();
        } else if (!this.isMultiple()) {
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
        } else if (this.isMultiple() && keyCode === A && event.ctrlKey) {
            event.preventDefault();
            const hasDeselectedOptions = this.optionRenders.some(opt => !opt.disabled && !opt.selected());

            this.optionRenders.forEach(option => {
                if (!option.disabled) {
                    hasDeselectedOptions ? option.select() : option.deselect();
                }
            });
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

            manager.onKeydown(event);

            if (
                this.isMultiple() &&
                isArrowKey &&
                event.shiftKey &&
                manager.activeItem &&
                manager.activeItemIndex !== previouslyFocusedIndex
            ) {
                manager.activeItem.selectViaInteraction();
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

    private resetOptions() {
        // const changedOrDestroyed$ = merge(this.optionsChanges$, this.destroy$);
        // this.optionSelectionChanges.pipe(takeUntil(changedOrDestroyed$)).subscribe((event: ThyOptionSelectionChangeEvent) => {
        //     this.onSelect(event.option, event.isUserInput);
        //     if (event.isUserInput && !this.isMultiple && this.panelOpen) {
        //         this.close();
        //         this.focus();
        //     }
        // });
    }

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
            const selectedValues = this.modelValue() || [];
            const index = selectedValues.indexOf(value);
            if (index > -1) {
                selectedValues.splice(index, 1);
            } else {
                selectedValues.push(value);
            }
            this.selectedValues.set([...selectedValues]);
        } else {
            this.selectedValues.set([value]);
            this.close();
        }
        this.emitModelValueChange();
        this.onTouchedFn();
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
                        return this.originRectWidth();
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
