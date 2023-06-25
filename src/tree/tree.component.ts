import { InputBoolean, InputNumber } from 'ngx-tethys/core';
// import { auditTime, debounceTime, filter, startWith, Subject, takeUntil } from 'rxjs';
import { startWith, auditTime, filter } from 'rxjs/operators';
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
    ViewEncapsulation,
    ViewChildren,
    QueryList,
    AfterViewInit,
    Inject
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
import { NgIf, NgFor, DOCUMENT } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDragMove, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';

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
        NgFor,
        DragDropModule
    ]
})
export class ThyTreeComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
    private _templateRef: TemplateRef<any>;

    private _emptyChildrenTemplateRef: TemplateRef<any>;

    private _draggable = false;

    private _expandedKeys: (string | number)[];

    private _selectedKeys: (string | number)[];

    private hostRenderer = useHostRenderer();

    public _selectionModel: SelectionModel<ThyTreeNode>;

    public treeNodes: ThyTreeNode[];

    public flattenTreeNodes: ThyTreeNode[] = [];

    private itemDragMoved = new Subject<CdkDragMove>();

    dragging = false;

    // Item 拖动经过目标时临时记录目标id以及相对应目标的位置
    private itemDropTarget: {
        position?: 'before' | 'inside' | 'after';
        id?: string;
        key?: string;
    };

    // 缓存 Element 和 DragRef 的关系，方便在 Item 拖动时查找
    private itemDragsMap = new Map<HTMLElement, CdkDrag>();

    items = [
        { value: 'I can be dragged', disabled: false },
        { value: 'I cannot be dragged', disabled: true },
        { value: 'I can also be dragged', disabled: false }
    ];

    @Input() dropEnterPredicate?: (cxt: any) => boolean;

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

    @ViewChildren(CdkDrag<string>) cdkDrags: QueryList<CdkDrag>;

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

    onItemDragMoved(event: CdkDragMove) {
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
        this.itemDropTarget = {
            key: this.itemDragsMap.get(targetElement)?.data.key,
            id: this.itemDragsMap.get(targetElement)?.data.id,
            position: this.getTargetPosition(targetElement, event)
        };

        // 执行外部传入的 dropEnterPredicate 判断是否允许拖入目标项
        if (this.dropEnterPredicate) {
            const targetDragRef = this.itemDragsMap.get(targetElement);
            if (
                this.dropEnterPredicate({
                    source: event.source.data.origin,
                    target: targetDragRef.data.origin,
                    dropPosition: this.itemDropTarget.position
                })
            ) {
                this.showDropPositionPlaceholder(targetElement);
            } else {
                this.itemDropTarget = null;
                this.cleanupDragArtifacts(false);
            }
        } else {
            this.showDropPositionPlaceholder(targetElement);
        }
    }

    private showDropPositionPlaceholder(targetElement: HTMLElement) {
        this.cleanupDragArtifacts();
        if (this.itemDropTarget && targetElement) {
            targetElement.classList.add(`drop-position-${this.itemDropTarget.position}`);
        }
    }

    private getTargetPosition(target: HTMLElement, event: CdkDragMove) {
        const targetRect = target.getBoundingClientRect();
        const beforeOrAfterGap = targetRect.height * 0.3;
        // 将 Item 高度分为上中下三段，其中上下的 Gap 为 height 的 30%，通过判断鼠标位置在哪一段 gap 来计算对应的位置
        if (event.pointerPosition.y - targetRect.top < beforeOrAfterGap) {
            return 'before';
        } else if (event.pointerPosition.y >= targetRect.bottom - beforeOrAfterGap) {
            return 'after';
        } else {
            return 'inside';
        }
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.flattenTreeNodes, event.previousIndex, event.currentIndex);
    }

    private getChildrenElementsByElement(dragElement: HTMLElement) {
        // 通过循环持续查找 next element，如果 element 的 level 小于当前 item 的 level，则为它的 children
        const children: HTMLElement[] = [];
        const dragRef = this.itemDragsMap.get(dragElement);

        // 如果当前的 Drag 正在拖拽，会创建 PlaceholderElement 占位，所以以 PlaceholderElement 向下查找
        let nextElement = (dragRef.getPlaceholderElement() || dragElement).nextElementSibling as HTMLElement;
        let nextDragRef = this.itemDragsMap.get(nextElement);
        while (nextDragRef && nextDragRef.data.level > dragRef.data.level) {
            children.push(nextElement);
            nextElement = nextElement.nextElementSibling as HTMLElement;
            nextDragRef = this.itemDragsMap.get(nextElement);
        }

        return children;
    }

    onItemDragStarted(event: any) {
        this.dragging = true;
        // 拖动开始时隐藏所有的子项
        const children = this.getChildrenElementsByElement(event.source.element.nativeElement);
        children.forEach(element => {
            element.classList.add('drag-item-hide');
        });
    }

    ngAfterViewInit(): void {
        console.log('222');
        this.cdkDrags.changes.pipe(startWith(this.cdkDrags)).subscribe((drags: QueryList<CdkDrag>) => {
            this.itemDragsMap.clear();
            drags.forEach(drag => {
                if (drag.data) {
                    // cdkDrag 变化时，缓存 Element 与 DragRef 的关系，方便 Drag Move 时查找
                    this.itemDragsMap.set(drag.element.nativeElement, drag);
                }
            });
        });

        this.itemDragMoved
            .pipe(
                auditTime(300),
                //  auditTime 可能会导致拖动结束后仍然执行 moved ，所以通过判断 dragging 状态来过滤无效 moved
                filter((event: CdkDragMove) => event.source._dragRef.isDragging())
            )
            .subscribe(event => {
                this.onItemDragMoved(event);
            });
    }
    emitItemDragMoved(event: CdkDragMove) {
        this.itemDragMoved.next(event);
    }

    private cleanupDragArtifacts(dropped = false) {
        if (dropped) {
            this.itemDropTarget = null;
            console.log(this.document.querySelectorAll('.drag-item-hide'));

            this.document.querySelectorAll('.drag-item-hide').forEach(element => element.classList.remove('drag-item-hide'));
        }
        this.document.querySelectorAll('.drop-position-before').forEach(element => element.classList.remove('drop-position-before'));
        this.document.querySelectorAll('.drop-position-after').forEach(element => element.classList.remove('drop-position-after'));
        this.document.querySelectorAll('.drop-position-inside').forEach(element => element.classList.remove('drop-position-inside'));
    }

    onItemDragEnded(event: any) {
        this.dragging = false;
    }

    private insertChildrenItem(target: any, inserted: any, children: any[]) {
        console.log(target, inserted, children);
        if (target.expanded) {
            this.treeNodes.splice(this.treeNodes.indexOf(target) + target.children.length + 1, 0, inserted, ...children);
            this.flattenTreeNodes.splice(this.flattenTreeNodes.indexOf(target) + target.children.length + 1, 0, inserted, ...children);
        }
        target.children.push(inserted);
        console.log(target, this.treeNodes, this.flattenTreeNodes);
    }

    private getParentByItem(item: any) {
        return (this.treeNodes || []).find((n: any) => {
            return n.children?.includes(item);
        });
    }

    private getExpandChildrenByDrag(dragRef: any) {
        if (!dragRef.data.expanded) {
            return [];
        } else {
            const childrenElements = this.getChildrenElementsByElement(dragRef.element.nativeElement);
            return childrenElements.map(element => this.itemDragsMap.get(element).data);
        }
    }

    private removeItem(item: any, children: any) {
        this.treeNodes.splice(this.treeNodes.indexOf(item), 1 + children.length);
        this.flattenTreeNodes.splice(this.flattenTreeNodes.indexOf(item), 1 + children.length);
    }

    private insertItem(target: any, inserted: any, children: any[], position: 'before' | 'after') {
        if (position === 'before') {
            this.treeNodes.splice(this.treeNodes.indexOf(target), 0, inserted, ...children);
            this.flattenTreeNodes.splice(this.flattenTreeNodes.indexOf(target), 0, inserted, ...children);
            console.log(target, this.treeNodes, this.flattenTreeNodes);
        } else {
            const dragRef = this.cdkDrags.find(drag => drag.data === target);
            // 如果目标项是展开的，插入的 index 位置需要考虑子项的数量
            let childrenCount = 0;
            if (target.expanded) {
                childrenCount = this.getChildrenElementsByElement(dragRef.element.nativeElement)?.length || 0;
            }
            this.treeNodes.splice(this.treeNodes.indexOf(target) + 1 + childrenCount, 0, inserted, ...children);
            this.flattenTreeNodes.splice(this.flattenTreeNodes.indexOf(target) + 1 + childrenCount, 0, inserted, ...children);
        }
    }

    forEachTree(tree: any[], fn: Function) {
        tree.forEach(item => {
            fn(item, tree);
            item.children && this.forEachTree(item.children, fn);
        });
    }

    onListDropped(event: any) {
        if (!this.itemDropTarget) {
            return;
        }

        const sourceItem = event.item.data;
        const sourceParent = this.getParentByItem(sourceItem);
        const sourceChildren = this.getExpandChildrenByDrag(event.item);

        const targetDragRef = this.cdkDrags.find(item => item.data?.key === this.itemDropTarget.key);
        const targetItem = targetDragRef?.data;
        const targetParent = this.getParentByItem(targetItem);

        this.removeItem(sourceItem, sourceChildren);

        switch (this.itemDropTarget.position) {
            case 'before':
            case 'after':
                this.insertItem(targetItem, sourceItem, sourceChildren, this.itemDropTarget.position);
                sourceItem.level = targetItem.level;
                // this.forEachTree([sourceItem], (node: any, parent: any) => {
                //     console.log(node, parent);
                //     node.level = parent[0].level + 1;
                // });
                break;
            case 'inside':
                this.insertChildrenItem(targetItem, sourceItem, sourceChildren);
                sourceItem.level = targetItem.level + 1;
                console.log(sourceItem.level, 'sourceItem.level');
                // this.forEachTree([sourceItem], (node: any, parent: any) => (node.level = parent[0].level + 1));
                break;
        }

        this.cleanupDragArtifacts(true);
    }
}
