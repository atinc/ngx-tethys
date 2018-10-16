import {
    Component, Input, Output, ElementRef,
    ViewEncapsulation, TemplateRef, OnInit,
    EventEmitter, ContentChild, ViewChild,
    ViewContainerRef, ComponentFactoryResolver, HostBinding, NgZone
} from '@angular/core';
import { ThyTreeNode, ThyTreeEmitEvent } from './tree.class';
import { helpers } from '../util';
import { SortablejsOptions } from 'angular-sortablejs';
import { ThyTreeService } from './tree.service';

@Component({
    selector: 'thy-tree',
    templateUrl: './tree.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [
        ThyTreeService
    ]
})
export class ThyTreeComponent implements OnInit {

    private _templateRef: TemplateRef<any>;

    private _flexibleTemplateRef: TemplateRef<any>;

    private _draggable = false;

    private _draggableNode: ThyTreeNode;

    public treeNodesSortableOptions: SortablejsOptions = {
        group: {
            name: 'tree-node',
            put: ['tree-node']
        },
        delay: 200,
        disabled: true,
        ghostClass: 'thy-tree-item-ghost',
        chosenClass: 'thy-tree-item-chosen',
        onStart: this._onDraggableStart.bind(this),
        onAdd: this._onDraggableAdd.bind(this),
        onUpdate: this._onDraggableUpdate.bind(this)
    };

    public treeNodes: ThyTreeNode[];

    @Input()
    set thyNodes(value: ThyTreeNode[]) {
        this.treeNodes = value;
        this.thyTreeService.treeNodesOfFlat = value;
    }

    @Input() thyLevel = 0;

    @Input() thyChildrenPropName = 'children';

    @Input() thyEditable = false;

    @Input() thyDeletable = false;

    @Input() thyShowExpand = true;

    @Input() thyMultiple = false;

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

    @Input()
    set thyTemplate(value: TemplateRef<any>) {
        if (value) {
            this.templateRef = value;
        }
    }

    @Input()
    set thyInstance(value: any) {
        if (value) {
            this.treeNodes = value.node[this.thyChildrenPropName];
            this.thyTreeService.treeNodesOfFlat = this.treeNodes;
            this.thyLevel = value.level + 1;
            this.flexibleTemplateRef = value.template;
        }
    }

    @Output() thyOnClick: EventEmitter<any> = new EventEmitter<any>();

    @Output() thyOnEdit: EventEmitter<any> = new EventEmitter<any>();

    @Output() thyOnDelete: EventEmitter<any> = new EventEmitter<any>();

    @Output() thyOnDraggableAdd: EventEmitter<any> = new EventEmitter<any>();

    @Output() thyOnDraggableUpdate: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild('treeNodeTemplate')
    set templateRef(template: TemplateRef<any>) {
        if (template) {
            this._templateRef = template;
            this.thyTreeService.setTreeTemplateToCustom();
        }
    }

    get templateRef() {
        return this._templateRef;
    }

    @ContentChild('treeNodeFlexibleTemplate')
    set flexibleTemplateRef(template: TemplateRef<any>) {
        if (template) {
            this._flexibleTemplateRef = template;
            this.thyTreeService.setTreeTemplateToCustom();
        }
    }

    get flexibleTemplateRef() {
        return this._flexibleTemplateRef;
    }

    @HostBinding('class.thy-tree') thyTreeClass = true;

    @HostBinding('class.thy-tree-draggable') thyTreeDraggableClass = false;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private ngZone: NgZone,
        public thyTreeService: ThyTreeService
    ) {
    }

    ngOnInit(): void {
    }

    public trackByFn(index: number, item: any) {
        return item.key || index;
    }

    public createTreeComponent(viewRef: ViewContainerRef, instance: object) {
        viewRef.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ThyTreeComponent);
        const componentRef = viewRef.createComponent(componentFactory);
        const componentInstance = (<ThyTreeComponent>componentRef.instance);
        componentInstance.thyInstance = instance;
    }

    private _formatDraggableEvent(event: any, eventName: string): ThyTreeEmitEvent {
        const dragToElement: HTMLElement = event.to;
        const toNodeKey = dragToElement.getAttribute('node-key');
        const treeNodesOfFlat = this.thyTreeService.treeNodesOfFlat;
        const targetNode = treeNodesOfFlat.find(node => node.key === toNodeKey);
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
            const treeNodesOfFlat = this.thyTreeService.treeNodesOfFlat;
            const node = treeNodesOfFlat.find(item => item.key === key);
            this._draggableNode = node.children[event.oldIndex];
        } else {
            this._draggableNode = this.treeNodes[event.oldIndex];
        }
    }

    private _onDraggableUpdate(event: any) {
        const draggableEvent = this._formatDraggableEvent(event, 'draggableUpdate');
        this.ngZone.runTask(() => {
            this.thyOnDraggableUpdate.emit(draggableEvent);
        });
    }

    private _onDraggableAdd(event: any) {
        const draggableEvent = this._formatDraggableEvent(event, 'draggableAdd');
        this.ngZone.runTask(() => {
            this.thyOnDraggableAdd.emit(draggableEvent);
        });
    }

    // region 公开出去函数

    public deleteTreeNode(node: string | ThyTreeNode) {
        this.thyTreeService.deleteTreeNode(node, this.treeNodes);
    }

    // endregion
}

