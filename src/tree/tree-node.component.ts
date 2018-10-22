import {
    Component, ViewEncapsulation, ContentChild, TemplateRef, Input, HostBinding,
    ViewChild, ElementRef, Output, EventEmitter, NgZone
} from '@angular/core';
import { ThyTreeComponent } from './tree.component';
import { ThyTreeNode } from './tree.class';
import { ThyTreeService } from './tree.service';
import { helpers } from '../util';

@Component({
    selector: 'thy-tree-node',
    templateUrl: './tree-node.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyTreeNodeComponent {

    @Input() node: ThyTreeNode;

    @Input() templateRef: TemplateRef<any>;

    @Input() flexibleTemplateRef: TemplateRef<any>;

    @Input() emptyChildrenTemplateRef: TemplateRef<any>;

    @Input() thyChildrenPropName: string;

    @Input() thyLevel: number;

    @Input() thyMultiple = false;

    @Input() thyDraggable = false;

    @Input()
    set thyEditable(value: boolean | ((_: ThyTreeNode) => boolean)) {
        this._editable = value;
    }

    get thyEditable() {
        return this._editable;
    }

    @Input()
    set thyDeletable(value: boolean | ((_: ThyTreeNode) => boolean)) {
        this._deletable = value;
    }

    get thyDeletable() {
        return this._deletable;
    }

    @Input()
    set thyShowExpand(value: boolean | ((_: ThyTreeNode) => boolean)) {
        this._showExpand = value;
    }

    get thyShowExpand() {
        return this._showExpand;
    }

    @Output() thyOnClick: EventEmitter<any> = new EventEmitter<any>();

    @Output() thyOnEdit: EventEmitter<any> = new EventEmitter<any>();

    @Output() thyOnDelete: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild('childrenTree') childrenTreeTemplateRef: TemplateRef<any>;

    @HostBinding('class.thy-tree-node') thyTreeNodeClass = true;

    @ViewChild('title') titleInputElementRef: ElementRef<HTMLInputElement>;

    private _editable: boolean | ((_: ThyTreeNode) => boolean);

    private _deletable: boolean | ((_: ThyTreeNode) => boolean);

    private _showExpand: boolean | ((_: ThyTreeNode) => boolean);

    constructor(
        public root: ThyTreeComponent,
        public thyTreeService: ThyTreeService,
        private ngZone: NgZone
    ) {
    }

    public clickNode(event: Event) {
        this.thyTreeService.setNodeActive(this.node, this.thyMultiple);
        this.thyOnClick.emit({
            eventName: 'click',
            event: event,
            node: this.node
        });
    }

    public clickEditInput(event: Event) {
        event.stopPropagation();
    }

    public expandNode(event: Event) {
        event.stopPropagation();
        this.ngZone.runTask(() => {
            this.node.expanded = !this.node.expanded;
        });

    }

    public editNode(event: Event) {
        event.stopPropagation();
        this.ngZone.runTask(() => {
            this.node.selected = false;
            this.node.edited = !this.node.edited;
            setTimeout(() => {
                this.titleInputElementRef.nativeElement.value = this.node.title;
            });
        });
    }

    public updateNode(event: Event, title: string) {
        if (title) {
            this.node.edited = !this.node.edited;
        }
        this.node.title = title;
        this.thyOnEdit.emit({
            eventName: 'edit',
            event: event,
            node: this.node
        });
    }

    public deleteNode(event: Event) {
        this.thyOnDelete.emit({
            eventName: 'edit',
            event: event,
            node: this.node
        });
    }

    public isEditable(node: ThyTreeNode) {
        if (helpers.isFunction(this._editable)) {
            return (this._editable as Function)(node);
        } else {
            return this._editable;
        }
    }

    public isDeletable(node: ThyTreeNode) {
        if (helpers.isFunction(this._deletable)) {
            return (this._deletable as Function)(node);
        } else {
            return this._deletable;
        }
    }

    public isShowExpand(node: ThyTreeNode) {
        if (helpers.isFunction(this._showExpand)) {
            return (this._showExpand as Function)(node);
        } else {
            return this._showExpand;
        }
    }

    public createNodeContext(node: any) {
        const instance = {
            node: node,
            level: this.thyLevel,
            template: this.flexibleTemplateRef || this.templateRef
        };
        return {
            ...instance,
            $implicit: node,
            instance: instance
        };
    }
}

