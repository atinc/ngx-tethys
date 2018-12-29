import {
    Component,
    Input,
    Output,
    ElementRef,
    ViewEncapsulation,
    TemplateRef,
    OnInit,
    EventEmitter,
    ContentChild,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    HostBinding,
    NgZone
} from '@angular/core';
import { ThyTreeNodeData, ThyTreeEmitEvent, ThyTreeNode } from './tree.class';
import { helpers } from '../util';
import { SortablejsOptions } from 'angular-sortablejs';
import { ThyTreeService } from './tree.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'thy-tree',
    templateUrl: './tree.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ThyTreeService]
})
export class ThyTreeComponent implements OnInit {
    private _templateRef: TemplateRef<any>;

    private _emptyChildrenTemplateRef: TemplateRef<any>;

    private _draggable = false;

    private _draggableNode: ThyTreeNode;

    public treeNodesSortableOptions: SortablejsOptions = {
        group: {
            name: 'tree-node',
            put: ['tree-node']
        },
        disabled: true,
        ghostClass: 'thy-tree-item-ghost',
        chosenClass: 'thy-tree-item-chosen',
        onStart: this._onDraggableStart.bind(this),
        onAdd: this._onDraggableAdd.bind(this),
        onUpdate: this._onDraggableUpdate.bind(this)
    };

    public treeNodes: ThyTreeNode[];

    public selectionModel: SelectionModel<ThyTreeNode>;

    @Input()
    set thyNodes(value: ThyTreeNodeData[]) {
        this.treeNodes = (value || []).map(node => new ThyTreeNode(node));
        this.thyTreeService.treeNodes = this.treeNodes;
    }

    @Input() thyShowExpand = true;

    @HostBinding(`class.thy-multiple-selection-list`)
    @Input()
    thyMultiple = false;

    @Input()
    set thyDraggable(value: boolean | any) {
        if (helpers.isBoolean(value)) {
            this._draggable = value;
            this.treeNodesSortableOptions.disabled = !value;
        } else {
            if (value) {
                Object.assign(this.treeNodesSortableOptions, value);
                this._draggable = !this.treeNodesSortableOptions.disabled;
            }
        }
        this.thyTreeDraggableClass = this._draggable;
    }

    get thyDraggable() {
        return this._draggable;
    }

    @Input() thyAsync = false;

    @Output() thyOnClick: EventEmitter<any> = new EventEmitter<any>();

    @Output() thyOnExpandChange: EventEmitter<any> = new EventEmitter<any>();

    @Output() thyOnDraggableChange: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild('treeNodeTemplate')
    set templateRef(template: TemplateRef<any>) {
        if (template) {
            this._templateRef = template;
        }
    }

    get templateRef() {
        return this._templateRef;
    }

    @ContentChild('emptyChildrenTemplate') emptyChildrenTemplate: TemplateRef<
        any
    >;
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

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private ngZone: NgZone,
        public thyTreeService: ThyTreeService
    ) {}

    ngOnInit(): void {
        this._instanceSelectionModel();
    }

    private _instanceSelectionModel() {
        this.selectionModel = new SelectionModel<any>(this.thyMultiple);
    }

    public isSelected(node: ThyTreeNode) {
        return this.selectionModel.isSelected(node);
    }

    public toggleTreeNode(node: ThyTreeNode) {
        if (node && !node.isDisabled) {
            this.selectionModel.toggle(node);
        }
    }

    public trackByFn(index: number, item: any) {
        return item.key || index;
    }

    private _formatDraggableEvent(
        event: any,
        eventName: string
    ): ThyTreeEmitEvent {
        const dragToElement: HTMLElement = event.to;
        const key = dragToElement.getAttribute('node-key');
        const targetNode = this.thyTreeService.getTreeNode(key);
        return {
            eventName,
            dragNode: this._draggableNode,
            targetNode: targetNode,
            event: event
        };
    }

    private _onDraggableStart(event: any) {
        const key = event.from.getAttribute('node-key');
        if (key) {
            const node = this.thyTreeService.getTreeNode(key);
            this._draggableNode = node.children[event.oldIndex];
        } else {
            this._draggableNode = this.treeNodes[event.oldIndex];
        }
    }

    private _onDraggableUpdate(event: any) {
        const draggableEvent = this._formatDraggableEvent(
            event,
            'draggableChange'
        );
        this.thyTreeService.resetSortedTreeNodes(this.treeNodes);
        this.ngZone.runTask(() => {
            this.thyOnDraggableChange.emit(draggableEvent);
        });
    }

    private _onDraggableAdd(event: any) {
        const draggableEvent = this._formatDraggableEvent(
            event,
            'draggableChange'
        );
        this.thyTreeService.resetSortedTreeNodes(this.treeNodes);
        this.ngZone.runTask(() => {
            this.thyOnDraggableChange.emit(draggableEvent);
        });
    }

    // region 公开出去函数

    public getRootNodes(): ThyTreeNode[] {
        return this.treeNodes;
    }

    public getSelectedNode(): ThyTreeNode {
        return this.selectionModel.selected[0];
    }

    public getSelectedNodes(): ThyTreeNode[] {
        return this.selectionModel.selected;
    }

    public getExpandedNodes(): ThyTreeNode[] {
        return this.thyTreeService.getExpandedNodes();
    }

    public addTreeNode(
        node: ThyTreeNodeData,
        parent?: ThyTreeNode,
        index = -1
    ) {
        if (parent) {
            parent.addChildren(node, index);
        } else {
            if (index > -1) {
                this.treeNodes.splice(index, 0, new ThyTreeNode(node));
            } else {
                this.treeNodes.push(new ThyTreeNode(node));
            }
        }
    }

    public deleteTreeNode(node: ThyTreeNode) {
        if (this.isSelected(node)) {
            this.selectionModel.toggle(node);
        }
        this.thyTreeService.deleteTreeNode(node);
    }

    // endregion
}
