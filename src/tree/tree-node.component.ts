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
    OnDestroy,
    ChangeDetectorRef
} from '@angular/core';
import { ThyTreeComponent } from './tree.component';
import { ThyTreeNodeData, TreeNodeCheckState, ThyTreeEmitEvent } from './tree.class';
import { ThyTreeNode } from './tree-node.class';
import { ThyTreeService } from './tree.service';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'thy-tree-node',
    templateUrl: './tree-node.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyTreeNodeComponent implements OnDestroy {
    @Input() node: ThyTreeNode;

    @Input() thyAsync = false;

    @Input() thyMultiple = false;

    @Input() thyDraggable = false;

    @Input() thyCheckable = false;

    @Input() thyTitleTruncate: boolean;

    @Input() templateRef: TemplateRef<any>;

    @Input() emptyChildrenTemplateRef: TemplateRef<any>;

    @Input()
    set thyShowExpand(value: boolean | ((_: ThyTreeNodeData) => boolean)) {
        this._showExpand = value;
    }

    get thyShowExpand() {
        return this._showExpand;
    }

    @Output() thyOnClick: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    @Output() thyOnExpandChange: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    @Output() thyOnCheckboxChange: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    @ContentChild('childrenTree') childrenTreeTemplateRef: TemplateRef<any>;

    @ViewChild('title') titleInputElementRef: ElementRef<HTMLInputElement>;

    @HostBinding('class.thy-tree-node') thyTreeNodeClass = true;

    public get nodeIcon() {
        return this.node.origin.icon;
    }

    public get nodeIconStyle() {
        return this.node.origin.iconStyle;
    }

    private _showExpand: boolean | ((_: ThyTreeNode) => boolean);

    destroy$ = new Subject();

    checkState = TreeNodeCheckState;

    markForCheck(): void {
        this.cdr.markForCheck();
    }

    constructor(
        public root: ThyTreeComponent,
        public thyTreeService: ThyTreeService,
        private ngZone: NgZone,
        private cdr: ChangeDetectorRef
    ) {
        this.thyTreeService
            .statusChanged()
            .pipe(
                filter(data => data.node.key === this.node.key),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.markForCheck();
            });
    }

    public clickNode(event: Event) {
        this.root.toggleTreeNode(this.node);
        this.thyOnClick.emit({
            eventName: 'click',
            event: event,
            node: this.node
        });
    }

    public clickNodeCheck(event: Event) {
        event.stopPropagation();
        this.node.setChecked(this.node.isChecked === TreeNodeCheckState.unchecked ? true : false);
        this.thyOnCheckboxChange.emit({
            eventName: 'checkboxChange',
            event: event,
            node: this.node
        });
    }

    public expandNode(event: Event) {
        event.stopPropagation();
        this.node.setExpanded(!this.node.isExpanded);
        if (this.thyShowExpand) {
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

    public isShowExpand(node: ThyTreeNode) {
        return this.root.isShowExpand(node);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
