import {
    Component,
    Input,
    Output,
    ElementRef,
    ViewEncapsulation,
    TemplateRef,
    OnInit,
    OnChanges,
    EventEmitter,
    ContentChild,
    HostBinding,
    NgZone,
    forwardRef,
    SimpleChanges
} from '@angular/core';
import { ThyTreeNodeData, ThyTreeEmitEvent, ThyTreeNode, ThyTreeDragDropEvent } from './tree.class';
import { helpers } from '../util';
import { SortablejsOptions } from 'angular-sortablejs';
import { ThyTreeService } from './tree.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { UpdateHostClassService } from '../shared/update-host-class.service';
import { ThyDragDropEvent, ThyDropPosition, ThyDragOverEvent, ThyDragStartEvent } from '../drag-drop/drag-drop.class';

type ThyTreeSize = 'sm' | '';

type ThyTreeType = 'default' | 'especial';

const treeTypeClassMap: any = {
    default: ['thy-tree-default'],
    especial: ['thy-tree-especial']
};

@Component({
    selector: 'thy-tree',
    templateUrl: './tree.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyTreeComponent),
            multi: true
        },
        ThyTreeService,
        UpdateHostClassService
    ]
})
export class ThyTreeComponent implements ControlValueAccessor, OnInit, OnChanges {
    private _templateRef: TemplateRef<any>;

    private _emptyChildrenTemplateRef: TemplateRef<any>;

    private _draggable = false;

    public _selectionModel: SelectionModel<ThyTreeNode>;

    // private _draggableNode: ThyTreeNode;

    // public treeNodesSortableOptions: SortablejsOptions = {
    //     group: {
    //         name: 'tree-node',
    //         put: ['tree-node']
    //     },
    //     disabled: true,
    //     animation: 250,
    //     ghostClass: 'thy-sortable-ghost',
    //     handle: '.thy-sortable-handle',
    //     dragClass: 'thy-sortable-drag',
    //     onStart: this._onDraggableStart.bind(this),
    //     onAdd: this._onDraggableAdd.bind(this),
    //     onUpdate: this._onDraggableUpdate.bind(this)
    // };

    public treeNodes: ThyTreeNode[];

    @Input()
    set thyNodes(value: ThyTreeNodeData[]) {
        this.treeNodes = (value || []).map(node => new ThyTreeNode(node, null, this.thyTreeService));
        this.thyTreeService.treeNodes = this.treeNodes;
    }

    @Input() thyShowExpand: boolean | ((_: ThyTreeNodeData) => boolean) = true;

    @HostBinding(`class.thy-multiple-selection-list`)
    @Input()
    thyMultiple = false;

    @Input()
    set thyDraggable(value: boolean | any) {
        this._draggable = value;
        this.thyTreeDraggableClass = this._draggable;

        // if (helpers.isBoolean(value)) {
        //     this._draggable = value;
        //     this.treeNodesSortableOptions.disabled = !value;
        // } else {
        //     if (value) {
        //         Object.assign(this.treeNodesSortableOptions, value);
        //         this._draggable = !this.treeNodesSortableOptions.disabled;
        //     }
        // }
    }

    get thyDraggable() {
        return this._draggable;
    }

    @Input() thyAsync = false;

    @Input() thyType: ThyTreeType = 'default';

    @Input() thySize: ThyTreeSize;

    @Input() thyTitleTruncate = true;

    @Input() thyBeforeDragStart: (e: ThyDragStartEvent) => boolean;

    @Input() thyBeforeDragDrop: (e: ThyDragDropEvent) => boolean;

    @Output() thyOnClick: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    @Output() thyOnExpandChange: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    @Output() thyOnDragDrop: EventEmitter<ThyTreeDragDropEvent> = new EventEmitter<ThyTreeDragDropEvent>();

    @ContentChild('treeNodeTemplate')
    set templateRef(template: TemplateRef<any>) {
        if (template) {
            this._templateRef = template;
        }
    }

    get templateRef() {
        return this._templateRef;
    }

    @ContentChild('emptyChildrenTemplate') emptyChildrenTemplate: TemplateRef<any>;
    set emptyChildrenTemplateRef(template: TemplateRef<any>) {
        if (template) {
            this._emptyChildrenTemplateRef = template;
        }
    }

    get emptyChildrenTemplateRef() {
        return this._emptyChildrenTemplateRef;
    }

    @HostBinding('class.thy-tree') thyTreeClass = true;

    @HostBinding('class.thy-tree-draggable') thyTreeDraggableClass = false;

    beforeDragOver = (event: ThyDragOverEvent<ThyTreeNode>) => {
        return (
            this.isShowExpand(event.item) || (!this.isShowExpand(event.item) && event.position !== ThyDropPosition.in)
        );
    };

    private _onTouched: () => void = () => {};

    private _onChange: (value: any) => void = (_: any) => {};

    constructor(
        private ngZone: NgZone,
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService,
        public thyTreeService: ThyTreeService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyType && !changes.thyType.isFirstChange) {
            this._setTreeType();
        }
    }

    ngOnInit(): void {
        this.updateHostClassService.initializeElement(this.elementRef.nativeElement);
        this._setTreeType();
        this._setTreeSize();
        this._instanceSelectionModel();
    }

    private _setTreeType() {
        if (this.thyType) {
            this.updateHostClassService.addClass(treeTypeClassMap[this.thyType]);
        }
    }

    private _setTreeSize() {
        if (this.thySize) {
            this.updateHostClassService.addClass(`thy-tree-${this.thySize}`);
        }
    }

    private _instanceSelectionModel() {
        this._selectionModel = new SelectionModel<any>(this.thyMultiple);
    }

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

    // private _formatDraggableEvent(event: any, eventName: string): ThyTreeEmitEvent {
    //     const dragToElement: HTMLElement = event.to;
    //     const key = dragToElement.getAttribute('node-key');
    //     const targetNode = this.thyTreeService.getTreeNode(key);
    //     return {
    //         eventName,
    //         dragNode: this._draggableNode,
    //         targetNode: targetNode,
    //         event: event
    //     };
    // }

    // private _onDraggableStart(event: any) {
    //     const key = event.from.getAttribute('node-key');
    //     if (key) {
    //         const node = this.thyTreeService.getTreeNode(key);
    //         this._draggableNode = node.children[event.oldIndex];
    //     } else {
    //         this._draggableNode = this.treeNodes[event.oldIndex];
    //     }
    // }

    // private _onDraggableUpdate(event: any) {
    //     const draggableEvent = this._formatDraggableEvent(event, 'draggableChange');
    //     this.thyTreeService.resetSortedTreeNodes(this.treeNodes);
    //     this.ngZone.runTask(() => {
    //         this.thyOnDraggableChange.emit(draggableEvent);
    //     });
    // }

    // private _onDraggableAdd(event: any) {
    //     const draggableEvent = this._formatDraggableEvent(event, 'draggableChange');
    //     this.thyTreeService.resetSortedTreeNodes(this.treeNodes);
    //     this.ngZone.runTask(() => {
    //         this.thyOnDraggableChange.emit(draggableEvent);
    //     });
    // }

    public onDragStart(event: ThyDragStartEvent<ThyTreeNode>) {
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
            this.treeNodes = this.treeNodes.filter(item => item !== event.previousItem);
        }
        switch (event.position) {
            case ThyDropPosition.in:
                event.item.addChildren(event.previousItem.origin);
                break;
            case ThyDropPosition.after:
            case ThyDropPosition.before:
                const targetParent = event.item.parentNode;
                const index = event.position === ThyDropPosition.before ? 0 : 1;
                if (targetParent) {
                    targetParent.addChildren(event.previousItem.origin, event.currentIndex + index);
                } else {
                    this.treeNodes.splice(event.currentIndex + index, 0, event.previousItem);
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
        this.thyNodes = value;
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    // region 公开出去函数

    public selectTreeNode(node: ThyTreeNode) {
        this._selectionModel.select(node);
    }

    public getRootNodes(): ThyTreeNode[] {
        return this.treeNodes;
    }

    public getSelectedNode(): ThyTreeNode {
        return this._selectionModel.selected[0];
    }

    public getSelectedNodes(): ThyTreeNode[] {
        return this._selectionModel.selected;
    }

    public getExpandedNodes(): ThyTreeNode[] {
        return this.thyTreeService.getExpandedNodes();
    }

    public addTreeNode(node: ThyTreeNodeData, parent?: ThyTreeNode, index = -1) {
        if (parent) {
            parent.addChildren(node, index);
        } else {
            if (index > -1) {
                this.treeNodes.splice(index, 0, new ThyTreeNode(node, null, this.thyTreeService));
            } else {
                this.treeNodes.push(new ThyTreeNode(node, null, this.thyTreeService));
            }
        }
    }

    public deleteTreeNode(node: ThyTreeNode) {
        if (this.isSelected(node)) {
            this._selectionModel.toggle(node);
        }
        this.thyTreeService.deleteTreeNode(node);
    }

    // endregion
}
