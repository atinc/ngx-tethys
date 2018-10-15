import {
    Component, ViewEncapsulation, ContentChild, TemplateRef, Input, HostBinding,
    ViewChild, ElementRef, Output, EventEmitter, NgZone
} from '@angular/core';
import { ThyTreeComponent } from './tree.component';
import { ThyTreeNode } from './tree.class';
import { ThyTreeService } from './tree.service';

@Component({
    selector: 'thy-tree-node',
    templateUrl: './tree-node.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyTreeNodeComponent {

    @Input() node: ThyTreeNode;

    @Input() templateRef: TemplateRef<any>;

    @Input() flexibleTemplateRef: TemplateRef<any>;

    @Input() thyChildrenPropName: string;

    @Input() thyLevel: number;

    @Input() thyEditable = false;

    @Input() thyDeletable = false;

    @Input() thyMultiple = false;

    @Output() thyOnClick: EventEmitter<any> = new EventEmitter<any>();

    @Output() thyOnEdit: EventEmitter<any> = new EventEmitter<any>();

    @Output() thyOnDelete: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild('childrenTree') childrenTreeTemplateRef: TemplateRef<any>;

    @HostBinding('class.thy-tree-node') thyTreeNodeClass = true;

    @ViewChild('title') titleInputElementRef: ElementRef<HTMLInputElement>;

    constructor(
        public root: ThyTreeComponent,
        public thyTreeService: ThyTreeService,
        private ngZone: NgZone
    ) {
    }

    public clickNode() {
        this.thyTreeService.setNodeActive(this.node, this.thyMultiple);
        this.thyOnClick.emit(this.node);
    }

    public expandNode(event: Event) {
        event.stopPropagation();
        this.ngZone.runTask(() => {
            this.node.expanded = !this.node.expanded;
        });

    }

    public editNode() {
        this.node.edited = !this.node.edited;
        setTimeout(() => {
            this.titleInputElementRef.nativeElement.value = this.node.title;
        });
    }

    public updateNode(title: string) {
        if (title) {
            this.node.edited = !this.node.edited;
            this.node.title = title;
            this.thyOnEdit.emit(this.node);
        }
    }

    public deleteNode() {
        this.root.deleteTreeNode(this.node);
        this.thyOnDelete.emit(this.node);
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

