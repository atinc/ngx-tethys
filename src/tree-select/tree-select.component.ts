import {
    EXPANDED_DROPDOWN_POSITIONS,
    injectPanelEmptyIcon,
    TabIndexDisabledControlValueAccessorMixin,
    ThyClickDispatcher
} from 'ngx-tethys/core';
import { ThyEmpty } from 'ngx-tethys/empty';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThySelectControl, ThyStopPropagationDirective } from 'ngx-tethys/shared';
import { ThyTreeNode } from 'ngx-tethys/tree';
import { coerceBooleanProperty, elementMatchClosest, isArray, isObject, produce } from 'ngx-tethys/util';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectionPositionPair, ViewportRuler } from '@angular/cdk/overlay';
import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { isPlatformBrowser, NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Input,
    NgZone,
    PLATFORM_ID,
    TemplateRef,
    inject,
    Signal,
    output,
    input,
    effect,
    computed,
    signal,
    DestroyRef,
    contentChild,
    viewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ThyTreeSelectNode, ThyTreeSelectType } from './tree-select.class';
import { injectLocale, ThyTreeSelectLocale } from 'ngx-tethys/i18n';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

export function filterTreeData(treeNodes: ThyTreeSelectNode[], searchText: string, searchKey: string = 'name') {
    const filterNodes = (node: ThyTreeSelectNode, result: ThyTreeSelectNode[]) => {
        if (node[searchKey] && node[searchKey].indexOf(searchText) !== -1) {
            result.push(node);
            return result;
        }
        if (Array.isArray(node.children)) {
            const nodes = node.children.reduce((previous, current) => filterNodes(current, previous), [] as ThyTreeSelectNode[]);
            if (nodes.length) {
                const parentNode = { ...node, children: nodes, expand: true };
                result.push(parentNode);
            }
        }
        return result;
    };
    const treeData = treeNodes.reduce((previous, current) => filterNodes(current, previous), [] as ThyTreeSelectNode[]);
    return treeData;
}

/**
 * 树选择组件
 * @name thy-tree-select
 * @order 10
 */
@Component({
    selector: 'thy-tree-select',
    templateUrl: './tree-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyTreeSelect),
            multi: true
        }
    ],
    imports: [
        CdkOverlayOrigin,
        ThySelectControl,
        NgTemplateOutlet,
        CdkConnectedOverlay,
        forwardRef(() => ThyTreeSelectNodes),
        ThyStopPropagationDirective
    ],
    host: {
        class: 'thy-select-custom thy-select',
        '[class.thy-select-custom--multiple]': 'thyMultiple()',
        '[class.menu-is-opened]': 'expandTreeSelectOptions()',
        '[attr.tabindex]': 'tabIndex',
        '(focus)': 'onFocus($event)',
        '(blur)': 'onBlur($event)'
    }
})
export class ThyTreeSelect extends TabIndexDisabledControlValueAccessorMixin implements ControlValueAccessor {
    elementRef = inject(ElementRef);
    private ngZone = inject(NgZone);
    private ref = inject(ChangeDetectorRef);
    private platformId = inject(PLATFORM_ID);
    private thyClickDispatcher = inject(ThyClickDispatcher);
    private viewportRuler = inject(ViewportRuler);
    private destroyRef = inject(DestroyRef);

    // 菜单是否展开
    public expandTreeSelectOptions = signal(false);

    public selectedValue = signal<any>(undefined);

    public selectedNode = signal<ThyTreeSelectNode | null | undefined>(null);

    public selectedNodes = signal<ThyTreeSelectNode[]>([]);

    public flattenTreeNodes = signal<ThyTreeSelectNode[]>([]);

    virtualTreeNodes = signal<ThyTreeSelectNode[]>([]);

    public cdkConnectOverlayWidth = signal(0);

    public expandedDropdownPositions: ConnectionPositionPair[] = EXPANDED_DROPDOWN_POSITIONS;

    public icons: { expand: string; collapse: string; gap?: number } = {
        expand: 'angle-down',
        collapse: 'angle-right',
        gap: 15
    };

    private locale: Signal<ThyTreeSelectLocale> = injectLocale('treeSelect');

    public valueIsObject = computed(() => {
        const selectedValue = this.selectedValue();
        if (this.thyMultiple()) {
            return selectedValue && (!selectedValue[0] || isObject(selectedValue[0]));
        } else {
            return isObject(selectedValue);
        }
    });

    public searchText = signal('');

    readonly thyTreeSelectTriggerDisplayRef = contentChild<TemplateRef<any>>('thyTreeSelectTriggerDisplay');

    readonly treeNodeTemplateRef = contentChild<TemplateRef<any>>('treeNodeTemplate');

    readonly cdkOverlayOrigin = viewChild.required(CdkOverlayOrigin);

    readonly cdkConnectedOverlay = viewChild.required(CdkConnectedOverlay);

    readonly customDisplayTemplate = viewChild.required<TemplateRef<any>>('customDisplayTemplate');

    /**
     * treeNodes 数据
     * @type ThyTreeSelectNode[]
     */
    readonly thyTreeNodes = input<ThyTreeSelectNode[]>([]);

    treeNodes = computed(() => {
        return filterTreeData(this.thyTreeNodes(), this.searchText(), this.thyShowKey());
    });

    /**
     * 开启虚拟滚动
     */
    readonly thyVirtualScroll = input(false, { transform: coerceBooleanProperty });

    /**
     * 树节点的唯一标识
     * @type string
     */
    readonly thyPrimaryKey = input('_id');

    /**
     * 树节点的显示的字段 key
     * @type string
     */
    readonly thyShowKey = input('name');

    readonly thyChildCountKey = input('childCount');

    /**
     * 单选时，是否显示清除按钮，当为 true 时，显示清除按钮
     * @default false
     */
    readonly thyAllowClear = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否多选
     * @type boolean
     */
    readonly thyMultiple = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否禁用树选择器，当为 true 禁用树选择器
     * @type boolean
     */
    readonly thyDisable = input(false, { transform: coerceBooleanProperty });

    get thyDisabled(): boolean {
        return this.thyDisable();
    }

    /**
     * 树选择框默认文字
     * @type string
     */
    readonly thyPlaceholder = input(this.locale().placeholder);

    /**
     * 控制树选择的输入框大小
     * @type xs | sm | md | default | lg
     */
    readonly thySize = input<InputSize>();

    /**
     * 改变空选项的情况下的提示文本
     * @type string
     */
    readonly thyEmptyOptionsText = input(this.locale().empty);

    /**
     * 设置是否隐藏节点(不可进行任何操作)，优先级高于 thyHiddenNodeFn
     * @type string
     */
    readonly thyHiddenNodeKey = input('hidden');

    /**
     * 设置是否禁用节点(不可进行任何操作)，优先级高于 thyDisableNodeFn
     * @type string
     */
    readonly thyDisableNodeKey = input('disabled');

    /**
     * 是否异步加载节点的子节点(显示加载状态)，当为 true 时，异步获取
     * @type boolean
     */
    readonly thyAsyncNode = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否展示全名
     * @type boolean
     */
    readonly thyShowWholeName = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否展示搜索
     * @type boolean
     */
    readonly thyShowSearch = input(false, { transform: coerceBooleanProperty });

    /**
     * 图标类型，支持 default | especial，已废弃
     * @deprecated
     */
    readonly thyIconType = input<ThyTreeSelectType>();

    /**
     * 设置是否隐藏节点(不可进行任何操作),优先级低于 thyHiddenNodeKey。
     * @default (node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.hidden
     */
    @Input() thyHiddenNodeFn: (node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => !!node.hidden;

    /**
     * 设置是否禁用节点(不可进行任何操作)，优先级低于 thyDisableNodeKey。
     * @default (node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.disabled
     */
    @Input() thyDisableNodeFn: (node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.disabled;

    /**
     * 获取节点的子节点，返回 Observable<ThyTreeSelectNode>。
     * @default (node: ThyTreeSelectNode) => Observable<ThyTreeSelectNode> = (node: ThyTreeSelectNode) => of([])
     */
    @Input() thyGetNodeChildren: (node: ThyTreeSelectNode) => Observable<ThyTreeSelectNode[]> = (node: ThyTreeSelectNode) => of([]);

    /**
     * 树选择组件展开和折叠状态事件
     */
    readonly thyExpandStatusChange = output<boolean>();

    public buildFlattenTreeNodes() {
        this.virtualTreeNodes.set(this.getFlattenTreeNodes(this.treeNodes()));
    }

    private getFlattenTreeNodes(rootTrees: ThyTreeSelectNode[] = this.treeNodes()) {
        const forEachTree = (tree: ThyTreeSelectNode[], fn: any, result: ThyTreeSelectNode[] = []) => {
            tree.forEach(item => {
                result.push(item);
                if (item.children && fn(item)) {
                    forEachTree(item.children, fn, result);
                }
            });
            return result;
        };
        return forEachTree(rootTrees, (node: ThyTreeSelectNode) => !!node.expand);
    }

    writeValue(value: any): void {
        this.selectedValue.set(value);
    }

    constructor() {
        super();

        this.bindClickEvent();
        this.bindResizeEvent();

        effect(() => {
            this.setSelectedNodes();
        });

        effect(() => {
            if (this.thyVirtualScroll()) {
                this.buildFlattenTreeNodes();
            }
        });

        effect(() => {
            this.flattenTreeNodes.set(this.flattenNodes(this.treeNodes(), []));
        });
    }

    private bindClickEvent() {
        if (isPlatformBrowser(this.platformId)) {
            this.thyClickDispatcher
                .clicked(0)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(event => {
                    event.stopPropagation();
                    if (!this.elementRef.nativeElement.contains(event.target) && this.expandTreeSelectOptions()) {
                        this.ngZone.run(() => {
                            this.close();
                        });
                    }
                });
        }
    }

    private bindResizeEvent() {
        this.viewportRuler
            .change()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.cdkConnectOverlayWidth.set(this.cdkOverlayOrigin().elementRef.nativeElement.getBoundingClientRect().width);
            });
    }

    onFocus($event: FocusEvent) {
        const inputElement: HTMLInputElement = this.elementRef.nativeElement.querySelector('input');
        inputElement?.focus();
    }

    onBlur($event: FocusEvent) {
        // 1. Tab 聚焦后自动聚焦到 input 输入框，此分支下直接返回，无需触发 onTouchedFn
        // 2. 打开选择框后如果点击弹框内导致 input 失焦，无需触发 onTouchedFn
        if (elementMatchClosest($event?.relatedTarget as HTMLElement, ['thy-tree-select', 'thy-tree-select-nodes'])) {
            return;
        }
        this.onTouchedFn();
    }

    public readonly selectedValueObject = computed(() => {
        return this.thyMultiple() ? this.selectedNodes() : this.selectedNode();
    });

    searchValue(searchText: string) {
        this.searchText.set(searchText.trim());
    }

    public setPosition() {
        this.ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
                this.cdkConnectedOverlay().overlayRef.updatePosition();
            });
    }

    private flattenNodes(nodes: ThyTreeSelectNode[] = [], parentPrimaryValue: string[] = []): ThyTreeSelectNode[] {
        let flattenedNodes: ThyTreeSelectNode[] = [];
        (nodes || []).forEach(item => {
            item.parentValues = parentPrimaryValue;
            item.level = item.parentValues.length;
            flattenedNodes.push(item);
            if (item.children && isArray(item.children)) {
                const childNodes = this.flattenNodes(item.children, [...parentPrimaryValue, item[this.thyPrimaryKey()]]);
                flattenedNodes = flattenedNodes.concat(childNodes);
            }
        });
        return flattenedNodes;
    }

    private _findTreeNode(value: string): ThyTreeSelectNode | undefined {
        return (this.flattenTreeNodes() || []).find(item => item[this.thyPrimaryKey()] === value);
    }

    private setSelectedNodes() {
        const isMultiple = this.thyMultiple();
        const primaryKey = this.thyPrimaryKey();
        const selectedValue = this.selectedValue();
        const valueIsObject = this.valueIsObject();
        if (selectedValue) {
            // 多选数据初始化
            if (isMultiple) {
                if (selectedValue.length > 0) {
                    if (valueIsObject && Object.keys(selectedValue[0]).indexOf(primaryKey) >= 0) {
                        this.selectedNodes.set(
                            selectedValue.map((item: any) => {
                                return this._findTreeNode(item[primaryKey]);
                            })
                        );
                    } else {
                        this.selectedNodes.set(
                            selectedValue.map((item: any) => {
                                return this._findTreeNode(item);
                            })
                        );
                    }
                }
            } else {
                // 单选数据初始化
                if (valueIsObject) {
                    if (Object.keys(selectedValue).indexOf(primaryKey) >= 0) {
                        this.selectedNode.set(this._findTreeNode(selectedValue[primaryKey]));
                    }
                } else {
                    this.selectedNode.set(this._findTreeNode(selectedValue));
                }
            }
        } else {
            this.selectedNodes.set([]);
            this.selectedNode.set(null);
        }
    }

    openSelectPop() {
        if (this.thyDisable()) {
            return;
        }
        this.cdkConnectOverlayWidth.set(this.cdkOverlayOrigin().elementRef.nativeElement.getBoundingClientRect().width);
        this.expandTreeSelectOptions.set(!this.expandTreeSelectOptions());
        this.thyExpandStatusChange.emit(this.expandTreeSelectOptions());
    }

    close() {
        if (this.expandTreeSelectOptions()) {
            this.expandTreeSelectOptions.set(false);
            this.thyExpandStatusChange.emit(false);
            this.onTouchedFn();
        }
    }

    clearSelectedValue(event: Event) {
        event.stopPropagation();
        this.selectedValue.set(null);
        this.selectedNode.set(null);
        this.selectedNodes.set([]);
        this.onChangeFn(null);
    }

    private _changeSelectValue() {
        const selectedNodes = this.selectedNodes();
        const selectedNode = this.selectedNode();
        if (this.valueIsObject()) {
            this.selectedValue.set(this.thyMultiple() ? selectedNodes : selectedNode);
        } else {
            const value = this.thyMultiple() ? selectedNodes.map(item => item[this.thyPrimaryKey()]) : selectedNode![this.thyPrimaryKey()];
            this.selectedValue.set(value);
        }
        this.onChangeFn(this.selectedValue());
        if (!this.thyMultiple()) {
            this.onTouchedFn();
        }
    }

    removeMultipleSelectedNode(event: { item: ThyTreeSelectNode; $eventOrigin: Event }) {
        this.removeSelectedNode(event.item, event.$eventOrigin);
    }

    // thyMultiple = true 时，移除数据时调用
    removeSelectedNode(node: ThyTreeSelectNode, event?: Event) {
        if (event) {
            event.stopPropagation();
        }
        if (this.thyDisable()) {
            return;
        }
        if (this.thyMultiple()) {
            this.selectedNodes.set(
                produce(this.selectedNodes()).remove((item: ThyTreeSelectNode) => {
                    return item[this.thyPrimaryKey()] === node[this.thyPrimaryKey()];
                })
            );
            this._changeSelectValue();
        }
    }

    selectNode(node: ThyTreeSelectNode) {
        if (!this.thyMultiple()) {
            this.selectedNode.set(node);
            this.expandTreeSelectOptions.set(false);
            this.thyExpandStatusChange.emit(false);
            this._changeSelectValue();
        } else {
            if (
                this.selectedNodes().find(item => {
                    return item[this.thyPrimaryKey()] === node[this.thyPrimaryKey()];
                })
            ) {
                this.removeSelectedNode(node);
            } else {
                this.selectedNodes.set(produce(this.selectedNodes()).add(node));
                this._changeSelectValue();
            }
        }
    }

    getNodeChildren(node: ThyTreeSelectNode) {
        const result = this.thyGetNodeChildren(node);
        if (result && result.subscribe) {
            result.subscribe((data: ThyTreeSelectNode[]) => {
                const flattenTreeNodes = this.flattenTreeNodes();
                const nodes = this.flattenNodes(data, [...node.parentValues, node[this.thyPrimaryKey()]]);
                const otherNodes = nodes.filter((item: ThyTreeSelectNode) => {
                    return !flattenTreeNodes.find(hasItem => {
                        return hasItem[this.thyPrimaryKey()] === item[this.thyPrimaryKey() as keyof ThyTreeNode];
                    });
                });
                this.flattenTreeNodes.set(flattenTreeNodes.concat(otherNodes));
                node.children = data;
            });
            return result;
        }
    }
}

const DEFAULT_ITEM_SIZE = 40;

/**
 * @private
 */
@Component({
    selector: 'thy-tree-select-nodes',
    templateUrl: './tree-select-nodes.component.html',
    imports: [
        NgTemplateOutlet,
        CdkVirtualScrollViewport,
        CdkFixedSizeVirtualScroll,
        CdkVirtualForOf,
        ThyEmpty,
        NgClass,
        NgStyle,
        ThyIcon,
        ThyFlexibleText
    ],
    host: {
        '[attr.tabindex]': '-1',
        class: 'thy-tree-select-dropdown',
        '[class.thy-tree-select-dropdown-multiple]': 'isMultiple()'
    }
})
export class ThyTreeSelectNodes {
    parent = inject(ThyTreeSelect);

    emptyIcon: Signal<string> = injectPanelEmptyIcon();

    readonly treeNodes = input<ThyTreeSelectNode[]>([]);

    readonly thyVirtualScroll = input<boolean>(false);

    public readonly isMultiple = computed(() => this.parent.thyMultiple());

    public readonly childCountKey = computed(() => this.parent.thyChildCountKey());

    public readonly treeNodeTemplateRef = computed(() => this.parent.treeNodeTemplateRef());

    public defaultItemSize = DEFAULT_ITEM_SIZE;

    public readonly thyPrimaryKey = computed(() => this.parent.thyPrimaryKey());

    public readonly selectedNodes = computed(() => this.parent.selectedNodes());

    public readonly selectedNode = computed(() => this.parent.selectedNode());

    public readonly hiddenNodeKey = computed(() => this.parent.thyHiddenNodeKey());

    public readonly disableNodeKey = computed(() => this.parent.thyDisableNodeKey());

    public readonly thyVirtualHeight = computed(() => {
        const treeSelectHeight = this.defaultItemSize * this.treeNodes().length;
        // 父级设置了max-height:300 & padding:10 0; 故此处最多设置280，否则将出现滚动条
        return treeSelectHeight > 300 ? '280px' : `${treeSelectHeight}px`;
    });

    public readonly hasNodeChildren = computed(() => {
        return this.treeNodes().every(item => !item.hasOwnProperty('children') || (!item?.children?.length && !item?.childCount));
    });

    treeNodeIsSelected(node: ThyTreeSelectNode) {
        const primaryKey = this.thyPrimaryKey();
        const isMultiple = this.isMultiple();
        if (isMultiple) {
            const selectedNodes = this.selectedNodes() || [];
            return selectedNodes.find(item => {
                return item[primaryKey] === node[primaryKey];
            });
        } else {
            return this.selectedNode() && this.selectedNode()![primaryKey] === node[primaryKey];
        }
    }

    treeNodeIsHidden(node: ThyTreeSelectNode) {
        const hiddenNodeKey = this.hiddenNodeKey();
        if (hiddenNodeKey) {
            return node[hiddenNodeKey];
        }
        const thyHiddenNodeFn = this.parent.thyHiddenNodeFn;
        if (thyHiddenNodeFn) {
            return thyHiddenNodeFn(node);
        }
        return false;
    }

    treeNodeIsDisable(node: ThyTreeSelectNode) {
        const disableNodeKey = this.disableNodeKey();
        if (disableNodeKey) {
            return node[disableNodeKey];
        }
        const thyDisableNodeFn = this.parent.thyDisableNodeFn;
        if (thyDisableNodeFn) {
            return thyDisableNodeFn(node);
        }
        return false;
    }

    treeNodeIsExpand(node: ThyTreeSelectNode) {
        const isMultiple = this.isMultiple();
        const primaryKey = this.thyPrimaryKey();
        let isSelectedNodeParent = false;
        if (isMultiple) {
            const selectedNodes = this.selectedNodes() || [];
            isSelectedNodeParent = !!selectedNodes.find(item => {
                return item.parentValues.indexOf(node[primaryKey]) > -1;
            });
        } else {
            isSelectedNodeParent = this.selectedNode() ? this.selectedNode()!.parentValues.indexOf(node[primaryKey]) > -1 : false;
        }
        const isExpand = node.expand || (Object.keys(node).indexOf('expand') < 0 && isSelectedNodeParent);
        node.expand = isExpand;
        return isExpand;
    }

    getNodeChildren(node: ThyTreeSelectNode) {
        return this.parent.getNodeChildren(node);
    }

    selectTreeNode(event: Event, node: ThyTreeSelectNode) {
        if (!this.treeNodeIsDisable(node)) {
            this.parent.selectNode(node);
        }
    }

    nodeExpandToggle(event: Event, node: ThyTreeSelectNode) {
        event.stopPropagation();
        if (Object.keys(node).indexOf('expand') > -1) {
            node.expand = !node.expand;
        } else {
            if (this.treeNodeIsExpand(node)) {
                node.expand = false;
            } else {
                node.expand = true;
            }
        }

        if (node.expand && this.parent.thyAsyncNode()) {
            this.getNodeChildren(node)?.subscribe(() => {
                this.parent.setPosition();
            });
        }
        // this.parent.setPosition();
        if (this.thyVirtualScroll()) {
            this.parent.buildFlattenTreeNodes();
        }
    }

    tabTrackBy(index: number, item: ThyTreeSelectNode) {
        return index;
    }
}
