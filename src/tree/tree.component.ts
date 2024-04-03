import { helpers } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf } from '@angular/cdk/scrolling';
import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    forwardRef,
    HostBinding,
    Inject,
    Input,
    numberAttribute,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { THY_TREE_ABSTRACT_TOKEN } from './tree-abstract';
import { ThyTreeNode } from './tree-node.class';
import {
    ThyTreeBeforeDragDropContext,
    ThyTreeBeforeDragStartContext,
    ThyClickBehavior,
    ThyTreeDragDropEvent,
    ThyTreeDropPosition,
    ThyTreeEmitEvent,
    ThyTreeIcons,
    ThyTreeNodeCheckState,
    ThyTreeNodeData
} from './tree.class';
import { ThyTreeService } from './tree.service';
import { ThyTreeNodeComponent } from './tree-node.component';
import { NgIf, NgFor, DOCUMENT } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragMove, CdkDragStart, CdkDropList } from '@angular/cdk/drag-drop';
import { auditTime, filter, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ThyTreeNodeDraggablePipe } from './tree.pipe';

type ThyTreeSize = 'sm' | 'default';

type ThyTreeType = 'default' | 'especial';

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
            useExisting: forwardRef(() => ThyTree),
            multi: true
        },
        {
            provide: THY_TREE_ABSTRACT_TOKEN,
            useExisting: forwardRef(() => ThyTree)
        },
        ThyTreeService
    ],
    standalone: true,
    imports: [
        NgIf,
        CdkDrag,
        CdkDropList,
        CdkVirtualScrollViewport,
        CdkFixedSizeVirtualScroll,
        CdkVirtualForOf,
        ThyTreeNodeComponent,
        NgFor,
        ThyTreeNodeDraggablePipe
    ]
})
export class ThyTree implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit, OnDestroy {
    private _templateRef: TemplateRef<any>;

    private _emptyChildrenTemplateRef: TemplateRef<any>;

    private _draggable = false;

    private _expandedKeys: (string | number)[];

    private _selectedKeys: (string | number)[];

    private hostRenderer = useHostRenderer();

    private _onTouched: () => void = () => {};

    private _onChange: (value: any) => void = (_: any) => {};

    private destroy$ = new Subject();

    // 缓存 Element 和 DragRef 的关系，方便在 Item 拖动时查找
    private nodeDragsMap = new Map<HTMLElement, CdkDrag<ThyTreeNode>>();

    private nodeDragMoved = new Subject<CdkDragMove>();

    // private startDragNodeExpanded: boolean;

    private startDragNodeClone: ThyTreeNode;

    // Node 拖动经过目标时临时记录目标id以及相对应目标的位置
    private nodeDropTarget: {
        position?: ThyTreeDropPosition;
        key?: number | string;
    };

    private dropEnterPredicate?: (context: { source: ThyTreeNode; target: ThyTreeNode; dropPosition: ThyTreeDropPosition }) => boolean =
        context => {
            return (
                this.isShowExpand(context.target) || (!this.isShowExpand(context.target) && context.dropPosition !== ThyTreeDropPosition.in)
            );
        };

    public _selectionModel: SelectionModel<ThyTreeNode>;

    public get treeNodes() {
        return this.thyTreeService.treeNodes;
    }

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
    @Input({ transform: booleanAttribute })
    thyMultiple = false;

    /**
     * 设置 TreeNode 是否支持拖拽排序
     * @default false
     */
    @HostBinding('class.thy-tree-draggable')
    @Input({ transform: booleanAttribute })
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
    @Input({ transform: booleanAttribute }) thyCheckable: boolean;

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
    @Input({ transform: booleanAttribute }) thyAsync = false;

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
    @Input({ transform: booleanAttribute })
    thyVirtualScroll = false;

    private _thyItemSize = 44;

    /**
     * 开启虚拟滚动时，单行节点的高度，当`thySize`为`default`时，该参数才生效
     * @default 44
     */
    @Input({ transform: numberAttribute })
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
    @Input({ transform: booleanAttribute }) thyTitleTruncate = true;

    /**
     * 已选中的 node 节点集合
     * @default []
     */
    @Input() thySelectedKeys: string[];

    /**
     * 设置缩进距离，缩进距离 = thyIndent * node.level
     * @type number
     */
    @Input({ transform: numberAttribute }) thyIndent = 25;

    /**
     * 拖拽之前的回调，函数返回 false 则阻止拖拽
     */
    @Input() thyBeforeDragStart: (context: ThyTreeBeforeDragStartContext) => boolean;

    /**
     * 拖放到元素时回调，函数返回 false 则阻止拖放到当前元素
     */
    @Input() thyBeforeDragDrop: (context: ThyTreeBeforeDragDropContext) => boolean;

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
    @Output() thyDblClick: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

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

    @HostBinding('class.thy-tree')
    thyTreeClass = true;

    @HostBinding('class.thy-tree-dragging')
    dragging: boolean;

    @ViewChildren(CdkDrag) cdkDrags: QueryList<CdkDrag<ThyTreeNode>>;

    constructor(public thyTreeService: ThyTreeService, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) private document: Document) {}

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

    ngAfterViewInit(): void {
        this.cdkDrags.changes
            .pipe(startWith(this.cdkDrags), takeUntil(this.destroy$))
            .subscribe((drags: QueryList<CdkDrag<ThyTreeNode>>) => {
                this.nodeDragsMap.clear();
                drags.forEach(drag => {
                    if (drag.data) {
                        // cdkDrag 变化时，缓存 Element 与 DragRef 的关系，方便 Drag Move 时查找
                        this.nodeDragsMap.set(drag.element.nativeElement, drag);
                    }
                });
            });

        this.nodeDragMoved
            .pipe(
                // auditTime(30),
                //  auditTime 可能会导致拖动结束后仍然执行 moved ，所以通过判断 dragging 状态来过滤无效 moved
                filter((event: CdkDragMove) => event.source._dragRef.isDragging()),
                takeUntil(this.destroy$)
            )
            .subscribe(event => {
                this.onDragMoved(event);
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
        this.thyTreeService.initializeTreeNodes(this.thyNodes);
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

    isSelected(node: ThyTreeNode) {
        return this._selectionModel.isSelected(node);
    }

    toggleTreeNode(node: ThyTreeNode) {
        if (node && !node.isDisabled) {
            this._selectionModel.toggle(node);
        }
    }

    trackByFn(index: number, item: any) {
        return item.key || index;
    }

    isShowExpand(node: ThyTreeNode) {
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

    onDragStarted(event: CdkDragStart<ThyTreeNode>) {
        this.dragging = true;
        this.startDragNodeClone = Object.assign({}, event.source.data);
        if (event.source.data.isExpanded) {
            event.source.data.setExpanded(false);
        }
    }

    emitDragMoved(event: CdkDragMove) {
        this.nodeDragMoved.next(event);
    }

    onDragMoved(event: CdkDragMove<ThyTreeNode>) {
        // 通过鼠标位置查找对应的目标 Item 元素
        let currentPointElement = this.document.elementFromPoint(event.pointerPosition.x, event.pointerPosition.y) as HTMLElement;
        if (!currentPointElement) {
            this.cleanupDragArtifacts();
            return;
        }
        let targetElement = currentPointElement.classList.contains('thy-tree-node')
            ? currentPointElement
            : (currentPointElement.closest('.thy-tree-node') as HTMLElement);
        if (!targetElement) {
            this.cleanupDragArtifacts();
            return;
        }
        // 缓存放置目标Id 并计算鼠标相对应的位置
        this.nodeDropTarget = {
            key: this.nodeDragsMap.get(targetElement)?.data.key,
            position: this.getTargetPosition(targetElement, event)
        };
        // 执行外部传入的 dropEnterPredicate 判断是否允许拖入目标项
        if (this.dropEnterPredicate) {
            const targetDragRef = this.nodeDragsMap.get(targetElement);
            if (
                this.dropEnterPredicate({
                    source: event.source.data,
                    target: targetDragRef.data,
                    dropPosition: this.nodeDropTarget.position
                })
            ) {
                this.showDropPositionPlaceholder(targetElement);
            } else {
                this.nodeDropTarget = null;
                this.cleanupDragArtifacts();
            }
        } else {
            this.showDropPositionPlaceholder(targetElement);
        }
    }

    onDragEnded(event: CdkDragEnd<ThyTreeNode>) {
        this.dragging = false;
        // 拖拽结束后恢复原始的展开状态
        event.source.data.setExpanded(this.startDragNodeClone.isExpanded);
        setTimeout(() => {
            this.startDragNodeClone = null;
        });
    }

    onListDropped(event: CdkDragDrop<ThyTreeNode[], ThyTreeNode[], ThyTreeNode>) {
        if (!this.nodeDropTarget) {
            return;
        }
        if (!this.isShowExpand(this.startDragNodeClone) && this.nodeDropTarget.position === ThyTreeDropPosition.in) {
            this.cleanupDragArtifacts();
            return;
        }

        const sourceNode = this.startDragNodeClone;
        const sourceNodeParent = sourceNode.parentNode;
        const targetDragRef = this.cdkDrags.find(item => item.data?.key === this.nodeDropTarget.key);
        const targetNode = targetDragRef?.data;
        const targetNodeParent = targetNode.parentNode;

        const beforeDragDropContext: ThyTreeBeforeDragDropContext = {
            previousItem: sourceNode,
            previousContainerItems: sourceNodeParent?.children,
            item: targetNode,
            containerItems: targetNodeParent?.children,
            position: this.nodeDropTarget.position
        };

        if (this.thyBeforeDragDrop && !this.thyBeforeDragDrop(beforeDragDropContext)) {
            this.cleanupDragArtifacts();
            return;
        }

        this.thyTreeService.deleteTreeNode(sourceNode);

        switch (this.nodeDropTarget.position) {
            case 'before':
                const beforeInsertIndex = (targetNodeParent?.children || this.treeNodes).indexOf(targetNode);
                this.thyTreeService.addTreeNode(sourceNode, targetNodeParent, beforeInsertIndex);
                break;
            case 'after':
                const afterInsertIndex = (targetNodeParent?.children || this.treeNodes).indexOf(targetNode) + 1;
                this.thyTreeService.addTreeNode(sourceNode, targetNodeParent, afterInsertIndex);
                break;
            case 'in':
                this.thyTreeService.addTreeNode(sourceNode, targetNode);
                break;
        }

        this.thyTreeService.syncFlattenTreeNodes();

        let after: ThyTreeNode = null;
        let targe: ThyTreeNode = null;
        if (beforeDragDropContext.position === ThyTreeDropPosition.before) {
            const targetContainerNodes = targetNodeParent?.children || this.treeNodes;
            after = targetContainerNodes[targetContainerNodes.indexOf(targetNode) - 2];
            targe = targetNodeParent;
        } else if (beforeDragDropContext.position === ThyTreeDropPosition.after) {
            after = targetNode;
            targe = targetNodeParent;
        } else {
            after = targetNode.children?.length > 0 ? targetNode.children[targetNode.children.length - 2] : null;
            targe = targetNode;
        }

        this.thyOnDragDrop.emit({
            dragNode: this.thyTreeService.getTreeNode(sourceNode.key),
            targetNode: targe,
            afterNode: after
        });

        this.cleanupDragArtifacts();
    }

    private getTargetPosition(target: HTMLElement, event: CdkDragMove) {
        const targetRect = target.getBoundingClientRect();
        const beforeOrAfterGap = targetRect.height * 0.3;
        // 将 Node 高度分为上中下三段，其中上下的 Gap 为 height 的 30%，通过判断鼠标位置在哪一段 gap 来计算对应的位置
        if (event.pointerPosition.y - targetRect.top < beforeOrAfterGap) {
            return ThyTreeDropPosition.before;
        } else if (event.pointerPosition.y >= targetRect.bottom - beforeOrAfterGap) {
            return ThyTreeDropPosition.after;
        } else {
            return ThyTreeDropPosition.in;
        }
    }

    private showDropPositionPlaceholder(targetElement: HTMLElement) {
        this.cleanupDropPositionPlaceholder();
        if (this.nodeDropTarget && targetElement) {
            targetElement.classList.add(`drop-position-${this.nodeDropTarget.position}`);
        }
    }

    private cleanupDropPositionPlaceholder() {
        this.document.querySelectorAll('.drop-position-before').forEach(element => element.classList.remove('drop-position-before'));
        this.document.querySelectorAll('.drop-position-after').forEach(element => element.classList.remove('drop-position-after'));
        this.document.querySelectorAll('.drop-position-in').forEach(element => element.classList.remove('drop-position-in'));
    }

    private cleanupDragArtifacts() {
        this.nodeDropTarget = null;
        this.cleanupDropPositionPlaceholder();
    }

    // region Public Functions

    selectTreeNode(node: ThyTreeNode) {
        if (node && !node.isDisabled) {
            this._selectionModel.select(node);
            this.thyTreeService.syncFlattenTreeNodes();
        }
    }

    getRootNodes(): ThyTreeNode[] {
        return this.treeNodes;
    }

    getTreeNode(key: string) {
        return this.thyTreeService.getTreeNode(key);
    }

    getSelectedNode(): ThyTreeNode {
        return this._selectionModel ? this._selectionModel.selected[0] : null;
    }

    getSelectedNodes(): ThyTreeNode[] {
        return this._selectionModel ? this._selectionModel.selected : [];
    }

    getExpandedNodes(): ThyTreeNode[] {
        return this.thyTreeService.getExpandedNodes();
    }

    getCheckedNodes(): ThyTreeNode[] {
        return this.thyTreeService.getCheckedNodes();
    }

    addTreeNode(node: ThyTreeNodeData, parent?: ThyTreeNode, index = -1) {
        this.thyTreeService.addTreeNode(new ThyTreeNode(node, null, this.thyTreeService), parent, index);
        this.thyTreeService.syncFlattenTreeNodes();
    }

    deleteTreeNode(node: ThyTreeNode) {
        if (this.isSelected(node)) {
            this._selectionModel.toggle(node);
        }
        this.thyTreeService.deleteTreeNode(node);
        this.thyTreeService.syncFlattenTreeNodes();
    }

    expandAllNodes() {
        const nodes = this.getRootNodes();
        nodes.forEach(n => n.setExpanded(true, true));
    }

    collapsedAllNodes() {
        const nodes = this.getRootNodes();
        nodes.forEach(n => n.setExpanded(false, true));
    }

    // endregion

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
