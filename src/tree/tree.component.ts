import { coerceBooleanProperty, helpers } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf } from '@angular/cdk/scrolling';
import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    numberAttribute,
    TemplateRef,
    ViewEncapsulation,
    inject,
    input,
    signal,
    effect,
    computed,
    model,
    DestroyRef,
    viewChild,
    contentChild,
    viewChildren,
    afterNextRender,
    output,
    DOCUMENT
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { THY_TREE_ABSTRACT_TOKEN } from './tree-abstract';
import { ThyTreeNode } from './tree.class';
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

import { CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragMove, CdkDragStart, CdkDropList } from '@angular/cdk/drag-drop';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ThyTreeNodeDraggablePipe } from './tree.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    host: {
        class: 'thy-tree',
        '[class.thy-multiple-selection-list]': 'thyMultiple()',
        '[class.thy-virtual-scrolling-tree]': 'thyVirtualScroll()',
        '[class.thy-tree-draggable]': 'thyDraggable()',
        '[class.thy-tree-dragging]': 'dragging()'
    },
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
    imports: [
        CdkDrag,
        CdkDropList,
        CdkVirtualScrollViewport,
        CdkFixedSizeVirtualScroll,
        CdkVirtualForOf,
        ThyTreeNodeComponent,
        ThyTreeNodeDraggablePipe
    ]
})
export class ThyTree implements ControlValueAccessor {
    thyTreeService = inject(ThyTreeService);
    private document = inject(DOCUMENT);
    private destroyRef = inject(DestroyRef);

    private expandedKeys: (string | number)[];

    private selectedKeys: (string | number)[];

    private hostRenderer = useHostRenderer();

    private _onTouched: () => void = () => {};

    private _onChange: (value: any) => void = (_: any) => {};

    // 缓存 Element 和 DragRef 的关系，方便在 Item 拖动时查找
    private nodeDragsMap = new Map<HTMLElement, CdkDrag<ThyTreeNode>>();

    private nodeDragMoved = new Subject<CdkDragMove>();

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

    public selectionModel: SelectionModel<ThyTreeNode>;

    public get treeNodes() {
        return this.thyTreeService.treeNodes;
    }

    public readonly flattenTreeNodes = computed(() => this.thyTreeService.flattenTreeNodes());

    /**
     * 虚拟化滚动的视口
     */
    readonly viewport = viewChild<CdkVirtualScrollViewport>('viewport');

    /**
     * TreeNode 展现所需的数据
     * @type ThyTreeNodeData[]
     */
    readonly thyNodes = model<ThyTreeNodeData[]>(undefined);

    /**
     * 设置 TreeNode 是否支持展开
     * @type boolean | Function
     */
    readonly thyShowExpand = input<boolean | ((_: ThyTreeNodeData) => boolean)>(true);

    /**
     * 设置是否支持多选节点
     */
    readonly thyMultiple = input(false, { transform: coerceBooleanProperty });

    /**
     * 设置 TreeNode 是否支持拖拽排序
     * @default false
     */
    readonly thyDraggable = input(false, { transform: coerceBooleanProperty });

    /**
     * 设置 TreeNode 是否支持 Checkbox 选择
     * @default false
     */
    readonly thyCheckable = input(false, { transform: coerceBooleanProperty });

    /**
     * 点击节点的行为，`default` 为选中当前节点，`selectCheckbox` 为选中节点的 Checkbox， `thyCheckable` 为 true 时生效。
     */
    readonly thyClickBehavior = input<ThyClickBehavior>('default');

    /**
     * 设置 check 状态的计算策略
     */
    readonly thyCheckStateResolve = input<(node: ThyTreeNode) => ThyTreeNodeCheckState>();

    /**
     * 设置 TreeNode 是否支持异步加载
     */
    readonly thyAsync = input(false, { transform: coerceBooleanProperty });

    /**
     * 设置不同展示类型的 Tree，`default` 为小箭头展示， `especial` 为 加减号图标展示
     * @type ThyTreeType
     * @default default
     */
    readonly thyType = input<ThyTreeType>('default');

    /**
     * 设置不同 Tree 展开折叠的图标，`expand` 为展开状态的图标，`collapse` 为折叠状态的图标
     * @type { expand: string, collapse: string }
     */
    readonly thyIcons = input<ThyTreeIcons>({});
    /**
     * 支持 `sm` | `default` 两种大小，默认值为 `default`
     * @type ThyTreeSize
     * @default default
     */
    readonly thySize = input<ThyTreeSize>('default');

    /**
     * 设置是否开启虚拟滚动
     */
    readonly thyVirtualScroll = input(false, { transform: coerceBooleanProperty });

    /**
     * 开启虚拟滚动时，单行节点的高度，当`thySize`为`default`时，该参数才生效
     * @default 44
     */
    readonly thyItemSize = input(44, {
        transform: value => {
            if (value && this.thySize() !== 'default') {
                throw new Error('setting thySize and thyItemSize at the same time is not allowed');
            }
            return numberAttribute(value);
        }
    });

    protected readonly icons = computed(() => {
        if (this.thyType() === 'especial') {
            return { expand: 'minus-square', collapse: 'plus-square' };
        }
        return this.thyIcons();
    });

    public readonly itemSize = computed(() => {
        const itemSize = this.thyItemSize();
        const size = this.thySize();
        if (size === 'default') {
            return itemSize || treeItemSizeMap.default;
        } else if (size) {
            return treeItemSizeMap[size] || treeItemSizeMap.default;
        } else {
            return treeItemSizeMap.default;
        }
    });

    /**
     * 设置节点名称是否支持超出截取
     * @type boolean
     */
    readonly thyTitleTruncate = input(true, { transform: coerceBooleanProperty });

    /**
     * 已选中的 node 节点集合
     * @default []
     */
    readonly thySelectedKeys = input<string[]>(undefined);

    /**
     * 展开指定的树节点
     */
    readonly thyExpandedKeys = input<(string | number)[]>(undefined);

    /**
     * 是否展开所有树节点
     */
    readonly thyExpandAll = input(false, { transform: coerceBooleanProperty });

    /**
     * 设置缩进距离，缩进距离 = thyIndent * node.level
     * @type number
     */
    readonly thyIndent = input(25, { transform: numberAttribute });

    /**
     * 拖拽之前的回调，函数返回 false 则阻止拖拽
     */
    readonly thyBeforeDragStart = input<(context: ThyTreeBeforeDragStartContext) => boolean>(undefined);

    /**
     * 拖放到元素时回调，函数返回 false 则阻止拖放到当前元素
     */
    readonly thyBeforeDragDrop = input<(context: ThyTreeBeforeDragDropContext) => boolean>(undefined);

    /**
     * 设置子 TreeNode 点击事件
     */
    readonly thyOnClick = output<ThyTreeEmitEvent>();

    /**
     * 设置 check 选择事件
     */
    readonly thyOnCheckboxChange = output<ThyTreeEmitEvent>();

    /**
     * 设置点击展开触发事件
     */
    readonly thyOnExpandChange = output<ThyTreeEmitEvent>();

    /**
     * 设置 TreeNode 拖拽事件
     */
    readonly thyOnDragDrop = output<ThyTreeDragDropEvent>();

    /**
     * 双击 TreeNode 事件
     */
    readonly thyDblClick = output<ThyTreeEmitEvent>();

    /**
     * 设置 TreeNode 的渲染模板
     */
    readonly templateRef = contentChild<TemplateRef<any>>('treeNodeTemplate');

    /**
     * 设置子的空数据渲染模板
     */
    readonly emptyChildrenTemplate = contentChild<TemplateRef<any>>('emptyChildrenTemplate');

    dragging = signal(false);

    readonly cdkDrags = viewChildren(CdkDrag);

    constructor() {
        effect(() => {
            const resolve = this.thyCheckStateResolve();
            if (resolve) {
                this.thyTreeService.setCheckStateResolve(resolve);
            }
        });

        effect(() => {
            this.initThyNodes();
        });

        effect(() => {
            this.setTreeSize();
        });

        effect(() => {
            this.setTreeType();
        });

        effect(() => {
            this.instanceSelectionModel();
        });

        effect(() => {
            this.selectTreeNodes(this.thySelectedKeys());
        });

        effect(() => {
            const drags = this.cdkDrags();
            this.nodeDragsMap.clear();
            drags.forEach(drag => {
                if (drag.data) {
                    // cdkDrag 变化时，缓存 Element 与 DragRef 的关系，方便 Drag Move 时查找
                    this.nodeDragsMap.set(drag.element.nativeElement, drag);
                }
            });
        });

        afterNextRender(() => {
            this.nodeDragMoved
                .pipe(
                    // auditTime(30),
                    //  auditTime 可能会导致拖动结束后仍然执行 moved ，所以通过判断 dragging 状态来过滤无效 moved
                    filter((event: CdkDragMove) => event.source._dragRef.isDragging()),
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe(event => {
                    this.onDragMoved(event);
                });
        });
    }

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

    private initThyNodes() {
        this.expandedKeys = this.getExpandedNodes().map(node => node.key);
        this.selectedKeys = this.getSelectedNodes().map(node => node.key);
        this.thyTreeService.initializeTreeNodes(this.thyNodes());
        this.selectTreeNodes(this.selectedKeys);
        this.handleExpandedKeys();
    }

    private handleExpandedKeys() {
        if (this.thyExpandAll()) {
            this.thyTreeService.expandTreeNodes(true);
        } else {
            this.expandedKeys = helpers.concatArray(
                (this.thyExpandedKeys() || []).filter(key => !this.expandedKeys.includes(key)),
                this.expandedKeys
            );
            this.thyTreeService.expandTreeNodes(this.expandedKeys);
        }
    }

    private setTreeType() {
        const type = this.thyType();
        if (type && treeTypeClassMap[type]) {
            treeTypeClassMap[type].forEach(className => {
                this.hostRenderer.addClass(className);
            });
        }
    }

    private setTreeSize() {
        const size = this.thySize();
        if (size) {
            this.hostRenderer.addClass(`thy-tree-${size}`);
        }
    }

    private instanceSelectionModel() {
        this.selectionModel = new SelectionModel<any>(this.thyMultiple());
    }

    private selectTreeNodes(keys: (string | number)[]) {
        (keys || []).forEach(key => {
            const node = this.thyTreeService.getTreeNode(key);
            if (node) {
                this.selectTreeNode(this.thyTreeService.getTreeNode(key));
            }
        });
    }

    isSelected(node: ThyTreeNode) {
        return this.selectionModel.isSelected(node);
    }

    toggleTreeNode(node: ThyTreeNode) {
        if (node && !node.isDisabled) {
            this.selectionModel.toggle(node);
        }
    }

    trackByFn(index: number, item: any) {
        return item.key || index;
    }

    isShowExpand(node: ThyTreeNode) {
        const thyShowExpand = this.thyShowExpand();
        if (helpers.isFunction(thyShowExpand)) {
            return (thyShowExpand as Function)(node);
        } else {
            return thyShowExpand;
        }
    }

    writeValue(value: ThyTreeNodeData[]): void {
        if (value) {
            this.thyNodes.set(value);
        }
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    onDragStarted(event: CdkDragStart<ThyTreeNode>) {
        this.dragging.set(true);
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
        this.dragging.set(false);
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
        const targetDragRef = this.cdkDrags().find(item => item.data?.key === this.nodeDropTarget.key);
        const targetNode = targetDragRef?.data;
        const targetNodeParent = targetNode.parentNode;

        const beforeDragDropContext: ThyTreeBeforeDragDropContext = {
            previousItem: sourceNode,
            previousContainerItems: sourceNodeParent?.children,
            item: targetNode,
            containerItems: targetNodeParent?.children,
            position: this.nodeDropTarget.position
        };

        const thyBeforeDragDrop = this.thyBeforeDragDrop();
        if (thyBeforeDragDrop && !thyBeforeDragDrop(beforeDragDropContext)) {
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
            this.selectionModel.select(node);
            this.thyTreeService.syncFlattenTreeNodes();
        }
    }

    getTreeNode(key: string) {
        return this.thyTreeService.getTreeNode(key);
    }

    getSelectedNode(): ThyTreeNode {
        return this.selectionModel ? this.selectionModel.selected[0] : null;
    }

    getSelectedNodes(): ThyTreeNode[] {
        return this.selectionModel ? this.selectionModel.selected : [];
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
            this.selectionModel.toggle(node);
        }
        this.thyTreeService.deleteTreeNode(node);
        this.thyTreeService.syncFlattenTreeNodes();
    }

    expandAllNodes() {
        const nodes = this.treeNodes;
        nodes.forEach(n => n.setExpanded(true, true));
    }

    collapsedAllNodes() {
        const nodes = this.treeNodes;
        nodes.forEach(n => n.setExpanded(false, true));
    }
}
