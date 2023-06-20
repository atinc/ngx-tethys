import { InputBoolean, InputNumber } from 'ngx-tethys/core';
import {
    ThyDragDropEvent,
    ThyDragOverEvent,
    ThyDragStartEvent,
    ThyDropPosition,
    ThyDropContainerDirective,
    ThyDragDirective
} from 'ngx-tethys/drag-drop';
import { helpers } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf } from '@angular/cdk/scrolling';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { THY_TREE_ABSTRACT_TOKEN } from './tree-abstract';
import { ThyTreeNode } from './tree-node.class';
import {
    ThyClickBehavior,
    ThyTreeDragDropEvent,
    ThyTreeEmitEvent,
    ThyTreeIcons,
    ThyTreeNodeCheckState,
    ThyTreeNodeData
} from './tree.class';
import { ThyTreeService } from './tree.service';
import { ThyTreeNodeComponent } from './tree-node.component';
import { NgIf, NgFor } from '@angular/common';

type ThyTreeSize = 'sm' | 'default';

type ThyTreeType = 'default' | 'especial';

type ThyTreeNodeKey = number | string;

const treeTypeClassMap = {
    default: ['thy-tree-default'],
    especial: ['thy-tree-especial']
};

const treeItemSizeMap = {
    default: 44,
    sm: 42
};

/**
 * 树形控件组件
 * @name thy-tree
 */
@Component({
    selector: 'thy-tree',
    templateUrl: './tree.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyTreeComponent),
            multi: true
        },
        {
            provide: THY_TREE_ABSTRACT_TOKEN,
            useExisting: forwardRef(() => ThyTreeComponent)
        },
        ThyTreeService
    ],
    standalone: true,
    imports: [
        NgIf,
        CdkVirtualScrollViewport,
        CdkFixedSizeVirtualScroll,
        ThyDropContainerDirective,
        CdkVirtualForOf,
        ThyTreeNodeComponent,
        ThyDragDirective,
        NgFor
    ]
})
export class ThyTreeComponent implements ControlValueAccessor, OnInit, OnChanges {
    private _templateRef: TemplateRef<any>;

    private _emptyChildrenTemplateRef: TemplateRef<any>;

    private _draggable = false;

    private _expandedKeys: (string | number)[];

    private _selectedKeys: (string | number)[];

    private hostRenderer = useHostRenderer();

    public _selectionModel: SelectionModel<ThyTreeNode>;

    public treeNodes: ThyTreeNode[];

    public flattenTreeNodes: ThyTreeNode[] = [];

    /**
     * 虚拟化滚动的视口
     */
    @Output() @ViewChild('viewport', { static: false }) viewport: CdkVirtualScrollViewport;

    /**
     * TreeNode 展现所需的数据
     * @type ThyTreeNodeData[]
     */
    @Input() thyNodes: ThyTreeNodeData[];

    /**
     * 设置 TreeNode 是否支持展开
     * @type boolean | Function
     */
    @Input() thyShowExpand: boolean | ((_: ThyTreeNodeData) => boolean) = true;

    /**
     * 设置是否支持多选节点
     */
    @HostBinding(`class.thy-multiple-selection-list`)
    @Input()
    @InputBoolean()
    thyMultiple = false;

    /**
     * 设置 TreeNode 是否支持拖拽排序
     * @default false
     */
    @HostBinding('class.thy-tree-draggable')
    @Input()
    @InputBoolean()
    set thyDraggable(value: boolean) {
        this._draggable = value;
    }

    get thyDraggable() {
        return this._draggable;
    }

    /**
     * 设置 TreeNode 是否支持 Checkbox 选择
     * @default false
     */
    @Input() @InputBoolean() thyCheckable: boolean;

    /**
     * 点击节点的行为，`default` 为选中当前节点，`selectCheckbox` 为选中节点的 Checkbox， `thyCheckable` 为 true 时生效。
     */
    @Input() thyClickBehavior: ThyClickBehavior = 'default';

    /**
     * 设置 check 状态的计算策略
     */
    @Input() set thyCheckStateResolve(resolve: (node: ThyTreeNode) => ThyTreeNodeCheckState) {
        if (resolve) {
            this.thyTreeService.setCheckStateResolve(resolve);
        }
    }

    /**
     * 设置 TreeNode 是否支持异步加载
     */
    @Input() @InputBoolean() thyAsync = false;

    private _thyType: ThyTreeType = 'default';

    /**
     * 设置不同展示类型的 Tree，`default` 为小箭头展示， `especial` 为 加减号图标展示
     * @type ThyTreeType
     * @default default
     */
    @Input()
    set thyType(type: ThyTreeType) {
        this._thyType = type;
        if (type === 'especial') {
            this.thyIcons = { expand: 'minus-square', collapse: 'plus-square' };
        }
    }

    get thyType() {
        return this._thyType;
    }

    /**
     * 设置不同 Tree 展开折叠的图标，`expand` 为展开状态的图标，`collapse` 为折叠状态的图标
     * @type { expand: string, collapse: string }
     */
    @Input() thyIcons: ThyTreeIcons = {};

    private _thySize: ThyTreeSize = 'default';
    /**
     * 支持 `sm` | `default` 两种大小，默认值为 `default`
     * @type ThyTreeSize
     * @default default
     */
    @Input()
    set thySize(size: ThyTreeSize) {
        this._thySize = size;
        if (this._thySize) {
            this._thyItemSize = treeItemSizeMap[this._thySize];
        } else {
            this._thyItemSize = treeItemSizeMap.default;
        }
    }

    get thySize() {
        return this._thySize;
    }

    /**
     * 设置是否开启虚拟滚动
     */
    @HostBinding('class.thy-virtual-scrolling-tree')
    @Input()
    @InputBoolean()
    thyVirtualScroll = false;

    private _thyItemSize = 44;

    /**
     * 开启虚拟滚动时，单行节点的高度，当`thySize`为`default`时，该参数才生效
     * @default 44
     */
    @Input()
    @InputNumber()
    set thyItemSize(itemSize: number) {
        if (this.thySize !== 'default') {
            throw new Error('setting thySize and thyItemSize at the same time is not allowed');
        }
        this._thyItemSize = itemSize;
    }

    get thyItemSize() {
        return this._thyItemSize;
    }

    /**
     * 设置节点名称是否支持超出截取
     * @type boolean
     */
    @Input() @InputBoolean() thyTitleTruncate = true;

    /**
     * 已选中的 node 节点集合
     * @default []
     */
    @Input() thySelectedKeys: string[];

    /**
     * 设置缩进距离，缩进距离 = thyIndent * node.level
     * @type number
     */
    @Input() @InputNumber() thyIndent = 25;

    /**
     * 拖拽之前的回调，函数返回 false 则阻止拖拽
     */
    @Input() thyBeforeDragStart: (e: ThyDragStartEvent) => boolean;

    /**
     * 拖放到元素时回调，函数返回 false 则组织拖放到当前元素
     */
    @Input() thyBeforeDragDrop: (e: ThyDragDropEvent) => boolean;

    /**
     * 设置子 TreeNode 点击事件
     */
    @Output() thyOnClick: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    /**
     * 设置 check 选择事件
     */
    @Output() thyOnCheckboxChange: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    /**
     * 设置点击展开触发事件
     */
    @Output() thyOnExpandChange: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    /**
     * 设置 TreeNode 拖拽事件
     */
    @Output() thyOnDragDrop: EventEmitter<ThyTreeDragDropEvent> = new EventEmitter<ThyTreeDragDropEvent>();

    /**
     * 双击 TreeNode 事件
     */
    @Output() thyOnDbClick: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    /**
     * 设置 TreeNode 的渲染模板
     */
    @ContentChild('treeNodeTemplate', { static: true })
    set templateRef(template: TemplateRef<any>) {
        if (template) {
            this._templateRef = template;
        }
    }

    get templateRef() {
        return this._templateRef;
    }

    /**
     * 设置子的空数据渲染模板
     */
    @ContentChild('emptyChildrenTemplate', { static: true }) emptyChildrenTemplate: TemplateRef<any>;
    set emptyChildrenTemplateRef(template: TemplateRef<any>) {
        if (template) {
            this._emptyChildrenTemplateRef = template;
        }
    }

    get emptyChildrenTemplateRef() {
        return this._emptyChildrenTemplateRef;
    }

    @HostBinding('class.thy-tree') thyTreeClass = true;

    beforeDragOver = (event: ThyDragOverEvent<ThyTreeNode>) => {
        return this.isShowExpand(event.item) || (!this.isShowExpand(event.item) && event.position !== ThyDropPosition.in);
    };

    private _onTouched: () => void = () => {};

    private _onChange: (value: any) => void = (_: any) => {};

    private dragItem: ThyTreeNode;

    constructor(public thyTreeService: ThyTreeService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this._initThyNodes();
        this._setTreeType();
        this._setTreeSize();
        this._instanceSelectionModel();
        this._selectTreeNodes(this.thySelectedKeys);

        this.thyTreeService.flattenNodes$.subscribe(flattenTreeNodes => {
            this.flattenTreeNodes = flattenTreeNodes;
            this.cdr.markForCheck();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyNodes && !changes.thyNodes.isFirstChange()) {
            this._initThyNodes();
        }
        if (changes.thyType && !changes.thyType.isFirstChange()) {
            this._setTreeType();
        }
        if (changes.thyMultiple && !changes.thyMultiple.isFirstChange()) {
            this._instanceSelectionModel();
        }

        if (changes.thySelectedKeys && !changes.thySelectedKeys.isFirstChange()) {
            this._selectedKeys = changes.thySelectedKeys.currentValue;
            this._selectTreeNodes(changes.thySelectedKeys.currentValue);
        }
    }

    renderView = () => {};

    eventTriggerChanged(event: ThyTreeEmitEvent): void {
        switch (event.eventName) {
            case 'expand':
                this.thyOnExpandChange.emit(event);
                break;

            case 'checkboxChange':
                this.thyOnCheckboxChange.emit(event);
                break;
        }
    }

    private _initThyNodes() {
        this._expandedKeys = this.getExpandedNodes().map(node => node.key);
        this._selectedKeys = this.getSelectedNodes().map(node => node.key);
        this.treeNodes = (this.thyNodes || []).map(node => new ThyTreeNode(node, null, this.thyTreeService));
        this.thyTreeService.initializeTreeNodes(this.treeNodes);
        this.flattenTreeNodes = this.thyTreeService.flattenTreeNodes;
        this._selectTreeNodes(this._selectedKeys);
        this.thyTreeService.expandTreeNodes(this._expandedKeys);
    }

    private _setTreeType() {
        if (this.thyType && treeTypeClassMap[this.thyType]) {
            treeTypeClassMap[this.thyType].forEach(className => {
                this.hostRenderer.addClass(className);
            });
        }
    }

    private _setTreeSize() {
        if (this.thySize) {
            this.hostRenderer.addClass(`thy-tree-${this.thySize}`);
        }
    }

    private _instanceSelectionModel() {
        this._selectionModel = new SelectionModel<any>(this.thyMultiple);
    }

    private _selectTreeNodes(keys: (string | number)[]) {
        (keys || []).forEach(key => {
            const node = this.thyTreeService.getTreeNode(key);
            if (node) {
                this.selectTreeNode(this.thyTreeService.getTreeNode(key));
            }
        });
    }

    public beforeDragDrop = (event: ThyDragDropEvent<ThyTreeNode>) => {
        event.previousItem = this.dragItem;
        if (event.item.level > 0) {
            event.containerItems = event.item.parentNode.children;
        } else {
            event.containerItems = event.containerItems.filter(item => item.level === 0);
        }
        event.currentIndex = (event.containerItems || []).findIndex(item => item.key === event.item.key);

        if (event.previousItem.level > 0) {
            event.previousContainerItems = event.previousItem.parentNode.children;
        }
        event.previousIndex = (event.previousContainerItems || []).findIndex(item => item.key === event.previousItem.key);

        if (this.thyBeforeDragDrop) {
            return this.thyBeforeDragDrop(event);
        }
        return true;
    };

    public isSelected(node: ThyTreeNode) {
        return this._selectionModel.isSelected(node);
    }

    public toggleTreeNode(node: ThyTreeNode) {
        if (node && !node.isDisabled) {
            this._selectionModel.toggle(node);
        }
    }

    public trackByFn(index: number, item: any) {
        return item.key || index;
    }

    public onDragStart(event: ThyDragStartEvent<ThyTreeNode>) {
        this.dragItem = event.item;
        if (this.isShowExpand(event.item) && event.item.isExpanded) {
            event.item.setExpanded(false);
        }
    }

    public onDragDrop(event: ThyDragDropEvent<ThyTreeNode>) {
        if (!this.isShowExpand(event.item) && event.position === ThyDropPosition.in) {
            return;
        }
        const parent = event.previousItem.parentNode;
        if (parent) {
            parent.children = parent.children.filter(item => item !== event.previousItem);
        } else {
            this.treeNodes.splice(this.thyTreeService.treeNodes.indexOf(event.previousItem), 1);
        }
        switch (event.position) {
            case ThyDropPosition.in:
                event.previousItem.parentNode = event.item;
                event.item.addChildren(event.previousItem.origin);
                break;
            case ThyDropPosition.after:
            case ThyDropPosition.before:
                event.previousItem.parentNode = event.item.parentNode;
                const targetParent = event.item.parentNode;
                const index = event.position === ThyDropPosition.before ? 0 : 1;
                if (targetParent) {
                    targetParent.addChildren(event.previousItem.origin, targetParent.children.indexOf(event.item) + index);
                } else {
                    this.treeNodes.splice(this.treeNodes.indexOf(event.item) + index, 0, event.previousItem);
                }
                break;
        }
        this.thyTreeService.resetSortedTreeNodes(this.treeNodes);

        let afterNode = null;
        let targetNode = null;
        if (event.position === ThyDropPosition.before) {
            afterNode = event.containerItems[event.currentIndex - 1];
            targetNode = event.item.parentNode;
        } else if (event.position === ThyDropPosition.after) {
            afterNode = event.containerItems[event.currentIndex];
            targetNode = event.item.parentNode;
        } else {
            afterNode = event.item.children[event.item.children.length - 2];
            targetNode = event.item;
        }
        this.thyTreeService.syncNodeCheckState(this.thyTreeService.getTreeNode(event.previousItem.key));
        if (parent) {
            this.thyTreeService.syncNodeCheckState(parent);
        }
        this.thyTreeService.syncFlattenTreeNodes();
        this.thyOnDragDrop.emit({
            event,
            currentIndex: event.currentIndex,
            dragNode: event.previousItem,
            targetNode: targetNode,
            afterNode: afterNode
        });
    }

    public isShowExpand(node: ThyTreeNode) {
        if (helpers.isFunction(this.thyShowExpand)) {
            return (this.thyShowExpand as Function)(node);
        } else {
            return this.thyShowExpand;
        }
    }

    writeValue(value: ThyTreeNodeData[]): void {
        if (value) {
            this.thyNodes = value;
            this._initThyNodes();
        }
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    // region Public Functions

    public selectTreeNode(node: ThyTreeNode) {
        if (node && !node.isDisabled) {
            this._selectionModel.select(node);
            this.thyTreeService.syncFlattenTreeNodes();
        }
    }

    public getRootNodes(): ThyTreeNode[] {
        return this.treeNodes;
    }

    public getTreeNode(key: string) {
        return this.thyTreeService.getTreeNode(key);
    }

    public getSelectedNode(): ThyTreeNode {
        return this._selectionModel ? this._selectionModel.selected[0] : null;
    }

    public getSelectedNodes(): ThyTreeNode[] {
        return this._selectionModel ? this._selectionModel.selected : [];
    }

    public getExpandedNodes(): ThyTreeNode[] {
        return this.thyTreeService.getExpandedNodes();
    }

    public getCheckedNodes(): ThyTreeNode[] {
        return this.thyTreeService.getCheckedNodes();
    }

    public addTreeNode(node: ThyTreeNodeData, parent?: ThyTreeNode, index = -1) {
        this.thyTreeService.addTreeNode(new ThyTreeNode(node, null, this.thyTreeService), parent, index);
    }

    public deleteTreeNode(node: ThyTreeNode) {
        if (this.isSelected(node)) {
            this._selectionModel.toggle(node);
        }
        this.thyTreeService.deleteTreeNode(node);
    }

    public expandAllNodes() {
        const nodes = this.getRootNodes();
        nodes.forEach(n => n.setExpanded(true, true));
    }

    public collapsedAllNodes() {
        const nodes = this.getRootNodes();
        nodes.forEach(n => n.setExpanded(false, true));
    }

    // endregion
}
