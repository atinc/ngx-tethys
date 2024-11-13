import { EXPANDED_DROPDOWN_POSITIONS, scaleYMotion, TabIndexDisabledControlValueAccessorMixin, ThyClickDispatcher } from 'ngx-tethys/core';
import { ThyEmpty } from 'ngx-tethys/empty';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThySelectControl, ThyStopPropagationDirective } from 'ngx-tethys/shared';
import { ThyTreeNode } from 'ngx-tethys/tree';
import { coerceBooleanProperty, elementMatchClosest, isArray, isObject, produce, warnDeprecation } from 'ngx-tethys/util';
import { Observable, of, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { CdkConnectedOverlay, CdkOverlayOrigin, ViewportRuler } from '@angular/cdk/overlay';
import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { isPlatformBrowser, NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    TemplateRef,
    ViewChild,
    inject
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ThyTreeSelectNode, ThyTreeSelectType } from './tree-select.class';
import { ThyI18nService } from 'ngx-tethys/i18n';

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
    standalone: true,
    imports: [
        CdkOverlayOrigin,
        ThySelectControl,
        NgTemplateOutlet,
        CdkConnectedOverlay,
        forwardRef(() => ThyTreeSelectNodes),
        ThyStopPropagationDirective
    ],
    host: {
        '[attr.tabindex]': 'tabIndex',
        '(focus)': 'onFocus($event)',
        '(blur)': 'onBlur($event)'
    },
    animations: [scaleYMotion]
})
export class ThyTreeSelect extends TabIndexDisabledControlValueAccessorMixin implements OnInit, OnDestroy, ControlValueAccessor {
    elementRef = inject(ElementRef);
    private ngZone = inject(NgZone);
    private ref = inject(ChangeDetectorRef);
    private platformId = inject(PLATFORM_ID);
    private thyClickDispatcher = inject(ThyClickDispatcher);
    private viewportRuler = inject(ViewportRuler);
    private i18n = inject(ThyI18nService);

    @HostBinding('class.thy-select-custom') treeSelectClass = true;

    @HostBinding('class.thy-select') isTreeSelect = true;

    // 菜单是否展开
    @HostBinding('class.menu-is-opened') expandTreeSelectOptions = false;

    @HostBinding('class.thy-select-custom--multiple') isMulti = false;

    public treeNodes: ThyTreeSelectNode[];

    public selectedValue: any;

    public selectedNode: ThyTreeSelectNode;

    public selectedNodes: ThyTreeSelectNode[] = [];

    public flattenTreeNodes: ThyTreeSelectNode[] = [];

    virtualTreeNodes: ThyTreeSelectNode[] = [];

    public cdkConnectOverlayWidth = 0;

    public expandedDropdownPositions = EXPANDED_DROPDOWN_POSITIONS;

    public icons: { expand: string; collapse: string; gap?: number } = {
        expand: 'angle-down',
        collapse: 'angle-right',
        gap: 15
    };

    private initialled = false;

    private destroy$ = new Subject<void>();

    public valueIsObject = false;

    originTreeNodes: ThyTreeSelectNode[];

    @ContentChild('thyTreeSelectTriggerDisplay')
    thyTreeSelectTriggerDisplayRef: TemplateRef<any>;

    @ContentChild('treeNodeTemplate')
    treeNodeTemplateRef: TemplateRef<any>;

    @ViewChild(CdkOverlayOrigin, { static: true }) cdkOverlayOrigin: CdkOverlayOrigin;

    @ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay: CdkConnectedOverlay;

    @ViewChild('customDisplayTemplate', { static: true }) customDisplayTemplate: TemplateRef<any>;

    /**
     * treeNodes 数据
     * @type ThyTreeSelectNode[]
     */
    @Input()
    set thyTreeNodes(value: ThyTreeSelectNode[]) {
        this.treeNodes = value;
        this.originTreeNodes = value;
        if (this.initialled) {
            this.flattenTreeNodes = this.flattenNodes(this.treeNodes, this.flattenTreeNodes, []);
            this.setSelectedNodes();

            if (this.thyVirtualScroll) {
                this.buildFlattenTreeNodes();
            }
        }
    }

    /**
     * 开启虚拟滚动
     */
    @Input({ transform: coerceBooleanProperty }) thyVirtualScroll: boolean = false;

    /**
     * 树节点的唯一标识
     * @type string
     */
    @Input() thyPrimaryKey = '_id';

    /**
     * 树节点的显示的字段 key
     * @type string
     */
    @Input() thyShowKey = 'name';

    @Input() thyChildCountKey = 'childCount';

    /**
     * 单选时，是否显示清除按钮，当为 true 时，显示清除按钮
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyAllowClear: boolean;

    /**
     * 是否多选
     * @type boolean
     */
    @Input({ transform: coerceBooleanProperty }) thyMultiple = false;

    /**
     * 是否禁用树选择器，当为 true 禁用树选择器
     * @type boolean
     */
    @Input({ transform: coerceBooleanProperty }) thyDisable = false;

    get thyDisabled(): boolean {
        return this.thyDisable;
    }

    /**
     * 树选择框默认文字
     * @type string
     * @default 请选择节点
     */
    @Input() thyPlaceholder = this.i18n.translate('treeSelect.placeholder');

    get placeholder() {
        return this.thyPlaceholder;
    }

    /**
     * 控制树选择的输入框大小
     * @type xs | sm | md | default | lg
     */
    @Input() thySize: InputSize;

    /**
     * 改变空选项的情况下的提示文本
     * @type string
     * @default 暂时没有数据可选
     */
    @Input() thyEmptyOptionsText = this.i18n.translate('treeSelect.empty');

    /**
     * 设置是否隐藏节点(不可进行任何操作)，优先级高于 thyHiddenNodeFn
     * @type string
     */
    @Input() thyHiddenNodeKey = 'hidden';

    /**
     * 设置是否禁用节点(不可进行任何操作)，优先级高于 thyDisableNodeFn
     * @type string
     */
    @Input() thyDisableNodeKey = 'disabled';

    /**
     * 是否异步加载节点的子节点(显示加载状态)，当为 true 时，异步获取
     * @type boolean
     */
    @Input({ transform: coerceBooleanProperty }) thyAsyncNode = false;

    /**
     * 是否展示全名
     * @type boolean
     */
    @Input({ transform: coerceBooleanProperty }) thyShowWholeName = false;

    /**
     * 是否展示搜索
     * @type boolean
     */
    @Input({ transform: coerceBooleanProperty }) thyShowSearch = false;

    /**
     * 图标类型，支持 default | especial，已废弃
     * @deprecated
     */
    @Input()
    set thyIconType(type: ThyTreeSelectType) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            warnDeprecation('This parameter has been deprecation');
        }
        // if (type === 'especial') {
        //     this.icons = { expand: 'minus-square', collapse: 'plus-square', gap: 20 };
        // } else {
        //     this.icons = { expand: 'caret-right-down', collapse: 'caret-right', gap: 15 };
        // }
    }

    /**
     * 设置是否隐藏节点(不可进行任何操作),优先级低于 thyHiddenNodeKey。
     * @default (node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.hidden
     */
    @Input() thyHiddenNodeFn: (node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.hidden;

    /**
     * 设置是否禁用节点(不可进行任何操作)，优先级低于 thyDisableNodeKey。
     * @default (node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.disabled
     */
    @Input() thyDisableNodeFn: (node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.disabled;

    /**
     * 获取节点的子节点，返回 Observable<ThyTreeSelectNode>。
     * @default (node: ThyTreeSelectNode) => Observable<ThyTreeSelectNode> = (node: ThyTreeSelectNode) => of([])
     */
    @Input() thyGetNodeChildren: (node: ThyTreeSelectNode) => Observable<ThyTreeSelectNode> = (node: ThyTreeSelectNode) => of([]);

    /**
     * 树选择组件展开和折叠状态事件
     */
    @Output() thyExpandStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _getNgModelType() {
        if (this.thyMultiple) {
            this.valueIsObject = !this.selectedValue[0] || isObject(this.selectedValue[0]);
        } else {
            this.valueIsObject = isObject(this.selectedValue);
        }
    }

    public buildFlattenTreeNodes() {
        this.virtualTreeNodes = this.getFlattenTreeNodes(this.treeNodes);
    }

    private getFlattenTreeNodes(rootTrees: ThyTreeSelectNode[] = this.treeNodes) {
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
        this.selectedValue = value;

        if (value) {
            this._getNgModelType();
        }
        this.setSelectedNodes();
    }

    constructor() {
        super();
    }

    ngOnInit() {
        this.isMulti = this.thyMultiple;
        this.flattenTreeNodes = this.flattenNodes(this.treeNodes, this.flattenTreeNodes, []);
        this.setSelectedNodes();
        this.initialled = true;

        if (this.thyVirtualScroll) {
            this.buildFlattenTreeNodes();
        }

        if (isPlatformBrowser(this.platformId)) {
            this.thyClickDispatcher
                .clicked(0)
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                    event.stopPropagation();
                    if (!this.elementRef.nativeElement.contains(event.target) && this.expandTreeSelectOptions) {
                        this.ngZone.run(() => {
                            this.close();
                            this.ref.markForCheck();
                        });
                    }
                });
        }
        this.viewportRuler
            .change()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.init();
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

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    get selectedValueObject() {
        return this.thyMultiple ? this.selectedNodes : this.selectedNode;
    }

    searchValue(searchText: string) {
        this.treeNodes = filterTreeData(this.originTreeNodes, searchText.trim(), this.thyShowKey);
    }

    public setPosition() {
        this.ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
                this.cdkConnectedOverlay.overlayRef.updatePosition();
            });
    }

    private init() {
        this.cdkConnectOverlayWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
    }

    private flattenNodes(
        nodes: ThyTreeSelectNode[] = [],
        resultNodes: ThyTreeSelectNode[] = [],
        parentPrimaryValue: string[] = []
    ): ThyTreeSelectNode[] {
        resultNodes = resultNodes.concat(nodes);
        let nodesLeafs: ThyTreeSelectNode[] = [];
        (nodes || []).forEach(item => {
            item.parentValues = parentPrimaryValue;
            item.level = item.parentValues.length;
            if (item.children && isArray(item.children)) {
                const nodeLeafs = this.flattenNodes(item.children, resultNodes, [...parentPrimaryValue, item[this.thyPrimaryKey]]);
                nodesLeafs = [...nodesLeafs, ...nodeLeafs];
            }
        });
        return [...nodes, ...nodesLeafs];
    }

    private _findTreeNode(value: string): ThyTreeSelectNode {
        return (this.flattenTreeNodes || []).find(item => item[this.thyPrimaryKey] === value);
    }

    private setSelectedNodes() {
        if (this.selectedValue) {
            // 多选数据初始化
            if (this.thyMultiple) {
                if (this.selectedValue.length > 0) {
                    if (this.valueIsObject && Object.keys(this.selectedValue[0]).indexOf(this.thyPrimaryKey) >= 0) {
                        this.selectedNodes = this.selectedValue.map((item: any) => {
                            return this._findTreeNode(item[this.thyPrimaryKey]);
                        });
                    } else {
                        this.selectedNodes = this.selectedValue.map((item: any) => {
                            return this._findTreeNode(item);
                        });
                    }
                }
            } else {
                // 单选数据初始化
                if (this.valueIsObject) {
                    if (Object.keys(this.selectedValue).indexOf(this.thyPrimaryKey) >= 0) {
                        this.selectedNode = this._findTreeNode(this.selectedValue[this.thyPrimaryKey]);
                    }
                } else {
                    this.selectedNode = this._findTreeNode(this.selectedValue);
                }
            }
        } else {
            this.selectedNodes = [];
            this.selectedNode = null;
        }
    }

    openSelectPop() {
        if (this.thyDisable) {
            return;
        }
        this.cdkConnectOverlayWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
        this.expandTreeSelectOptions = !this.expandTreeSelectOptions;
        this.thyExpandStatusChange.emit(this.expandTreeSelectOptions);
    }

    close() {
        if (this.expandTreeSelectOptions) {
            this.expandTreeSelectOptions = false;
            this.thyExpandStatusChange.emit(this.expandTreeSelectOptions);
            this.onTouchedFn();
        }
    }

    clearSelectedValue(event: Event) {
        event.stopPropagation();
        this.selectedValue = null;
        this.selectedNode = null;
        this.selectedNodes = [];
        this.onChangeFn(this.selectedValue);
    }

    private _changeSelectValue() {
        if (this.valueIsObject) {
            this.selectedValue = this.thyMultiple ? this.selectedNodes : this.selectedNode;
        } else {
            this.selectedValue = this.thyMultiple
                ? this.selectedNodes.map(item => item[this.thyPrimaryKey])
                : this.selectedNode[this.thyPrimaryKey];
        }
        this.onChangeFn(this.selectedValue);
        if (!this.thyMultiple) {
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
        if (this.thyDisable) {
            return;
        }
        if (this.thyMultiple) {
            this.selectedNodes = produce(this.selectedNodes).remove((item: ThyTreeSelectNode) => {
                return item[this.thyPrimaryKey] === node[this.thyPrimaryKey];
            });
            this._changeSelectValue();
        }
    }

    selectNode(node: ThyTreeSelectNode) {
        if (!this.thyMultiple) {
            this.selectedNode = node;
            this.expandTreeSelectOptions = false;
            this.thyExpandStatusChange.emit(this.expandTreeSelectOptions);
            this._changeSelectValue();
        } else {
            if (
                this.selectedNodes.find(item => {
                    return item[this.thyPrimaryKey] === node[this.thyPrimaryKey];
                })
            ) {
                this.removeSelectedNode(node);
            } else {
                this.selectedNodes = produce(this.selectedNodes).add(node);
                this._changeSelectValue();
            }
        }
    }

    getNodeChildren(node: ThyTreeSelectNode) {
        const result = this.thyGetNodeChildren(node);
        if (result && result.subscribe) {
            result.pipe().subscribe((data: ThyTreeSelectNode[]) => {
                const nodes = this.flattenNodes(data, this.flattenTreeNodes, [...node.parentValues, node[this.thyPrimaryKey]]);
                const otherNodes = nodes.filter((item: ThyTreeNode) => {
                    return !this.flattenTreeNodes.find(hasItem => {
                        return hasItem[this.thyPrimaryKey] === item[this.thyPrimaryKey];
                    });
                });
                this.flattenTreeNodes = [...this.flattenTreeNodes, ...otherNodes];
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
    standalone: true,
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
        '[attr.tabindex]': '-1'
    }
})
export class ThyTreeSelectNodes implements OnInit {
    parent = inject(ThyTreeSelect);

    @HostBinding('class') class: string;

    nodeList: ThyTreeSelectNode[] = [];

    @Input() set treeNodes(value: ThyTreeSelectNode[]) {
        const treeSelectHeight = this.defaultItemSize * value.length;
        // 父级设置了max-height:300 & padding:10 0; 故此处最多设置280，否则将出现滚动条
        this.thyVirtualHeight = treeSelectHeight > 300 ? '280px' : `${treeSelectHeight}px`;
        this.nodeList = value;
        this.hasNodeChildren = this.nodeList.every(
            item => !item.hasOwnProperty('children') || (!item?.children?.length && !item?.childCount)
        );
    }

    @Input() thyVirtualScroll: boolean = false;

    public primaryKey = this.parent.thyPrimaryKey;

    public showKey = this.parent.thyShowKey;

    public isMultiple = this.parent.thyMultiple;

    public valueIsObject = this.parent.valueIsObject;

    public selectedValue = this.parent.selectedValue;

    public childCountKey = this.parent.thyChildCountKey;

    public treeNodeTemplateRef = this.parent.treeNodeTemplateRef;

    public defaultItemSize = DEFAULT_ITEM_SIZE;

    public thyVirtualHeight: string = null;

    public hasNodeChildren: boolean = false;

    ngOnInit() {
        this.class = this.isMultiple ? 'thy-tree-select-dropdown thy-tree-select-dropdown-multiple' : 'thy-tree-select-dropdown';
    }

    treeNodeIsSelected(node: ThyTreeSelectNode) {
        if (this.parent.thyMultiple) {
            return (this.parent.selectedNodes || []).find(item => {
                return item[this.primaryKey] === node[this.primaryKey];
            });
        } else {
            return this.parent.selectedNode && this.parent.selectedNode[this.primaryKey] === node[this.primaryKey];
        }
    }

    treeNodeIsHidden(node: ThyTreeSelectNode) {
        if (this.parent.thyHiddenNodeKey) {
            return node[this.parent.thyHiddenNodeKey];
        }
        if (this.parent.thyHiddenNodeFn) {
            return this.parent.thyHiddenNodeFn(node);
        }
        return false;
    }

    treeNodeIsDisable(node: ThyTreeSelectNode) {
        if (this.parent.thyDisableNodeKey) {
            return node[this.parent.thyDisableNodeKey];
        }
        if (this.parent.thyDisableNodeFn) {
            return this.parent.thyDisableNodeFn(node);
        }
        return false;
    }

    treeNodeIsExpand(node: ThyTreeSelectNode) {
        let isSelectedNodeParent = false;
        if (this.parent.thyMultiple) {
            isSelectedNodeParent = !!(this.parent.selectedNodes || []).find(item => {
                return item.parentValues.indexOf(node[this.primaryKey]) > -1;
            });
        } else {
            isSelectedNodeParent = this.parent.selectedNode
                ? this.parent.selectedNode.parentValues.indexOf(node[this.primaryKey]) > -1
                : false;
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

        if (node.expand && this.parent.thyAsyncNode) {
            this.getNodeChildren(node).subscribe(() => {
                this.parent.setPosition();
            });
        }
        // this.parent.setPosition();
        if (this.thyVirtualScroll) {
            this.parent.buildFlattenTreeNodes();
        }
    }

    tabTrackBy(index: number, item: ThyTreeSelectNode) {
        return index;
    }
}
