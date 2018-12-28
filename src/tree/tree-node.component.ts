import {
    Component,
    ViewEncapsulation,
    ContentChild,
    TemplateRef,
    Input,
    HostBinding,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter,
    NgZone,
    ViewChildren,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import { ThyTreeComponent } from './tree.component';
import { ThyTreeNodeData, ThyTreeNode } from './tree.class';
import { ThyTreeService } from './tree.service';
import { helpers } from '../util';
import { ThyListOptionComponent } from '../core/option';

@Component({
    selector: 'thy-tree-node',
    templateUrl: './tree-node.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyTreeNodeComponent {
    @Input() node: ThyTreeNode;

    @Input() thyAsync = false;

    @Input() thyMultiple = false;

    @Input() thyDraggable = false;

    @Input() templateRef: TemplateRef<any>;

    @Input() emptyChildrenTemplateRef: TemplateRef<any>;

    @Input()
    set thyShowExpand(value: boolean | ((_: ThyTreeNodeData) => boolean)) {
        this._showExpand = value;
    }

    get thyShowExpand() {
        return this._showExpand;
    }

    @Output() thyOnClick: EventEmitter<any> = new EventEmitter<any>();

    @Output() thyOnExpandChange: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild('childrenTree') childrenTreeTemplateRef: TemplateRef<any>;

    @ViewChild('title') titleInputElementRef: ElementRef<HTMLInputElement>;

    @HostBinding('class.thy-tree-node') thyTreeNodeClass = true;

    public get nodeIcon() {
        return this.node.origin.icon;
    }

    public get nodeIconStyle() {
        return this.node.origin.iconStyle;
    }

    private _showExpand: boolean | ((_: ThyTreeNodeData) => boolean);

    constructor(
        public root: ThyTreeComponent,
        public thyTreeService: ThyTreeService,
        private ngZone: NgZone
    ) {}

    public clickNode(event: Event) {
        this.root.toggleTreeNode(this.node);
        this.thyOnClick.emit({
            eventName: 'click',
            event: event,
            node: this.node
        });
    }

    public expandNode(event: Event) {
        event.stopPropagation();
        this.node.setExpanded(!this.node.isExpanded);
        if (this.node.isExpanded) {
            this.thyOnExpandChange.emit({
                eventName: 'expand',
                event: event,
                node: this.node
            });
            if (this.thyAsync && this.node.children.length === 0) {
                this.node.setLoading(true);
            }
        }
    }

    public isShowExpand(node: ThyTreeNodeData) {
        if (helpers.isFunction(this._showExpand)) {
            return (this._showExpand as Function)(node);
        } else {
            return this._showExpand;
        }
    }

    public createNodeContext(node: any) {
        const instance = {
            node: node,
            // level: this.thyLevel,
            template: this.templateRef
        };
        return {
            ...instance,
            $implicit: node,
            instance: instance
        };
    }
}
