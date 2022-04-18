import { ThyDragStartEvent } from 'ngx-tethys/drag-drop';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import {
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { THY_TREE_ABSTRACT_TOKEN, ThyTreeAbstractComponent } from './tree-abstract';
import { ThyTreeNode } from './tree-node.class';
import { ThyTreeEmitEvent, ThyTreeNodeCheckState } from './tree.class';
import { ThyTreeService } from './tree.service';

const passiveEventListenerOptions = <AddEventListenerOptions>normalizePassiveListenerOptions({ passive: true });

@Component({
    selector: 'thy-tree-node',
    templateUrl: './tree-node.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyTreeNodeComponent implements OnDestroy, OnInit {
    @Input() node: ThyTreeNode;

    @Input() thyAsync = false;

    @Input() thyMultiple = false;

    @Input() thyDraggable = false;

    @Input() thyCheckable = false;

    @Input() thyTitleTruncate: boolean;

    @Input() templateRef: TemplateRef<any>;

    @Input() emptyChildrenTemplateRef: TemplateRef<any>;

    @Output() thyOnClick: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    @Output() thyOnExpandChange: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    @Output() thyOnCheckboxChange: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    @ContentChild('childrenTree') childrenTreeTemplateRef: TemplateRef<any>;

    /** The native `<div class="thy-tree-node-wrapper thy-sortable-item"></div>` element. */
    @ViewChild('treeNodeWrapper', { static: true }) treeNodeWrapper: ElementRef<HTMLElement>;

    @HostBinding('class.thy-tree-node') thyTreeNodeClass = true;

    @Input() thyItemSize = 44;

    public get nodeIcon() {
        return this.node.origin.icon;
    }

    public get nodeIconStyle() {
        return this.node.origin.iconStyle;
    }

    private destroy$ = new Subject();

    checkState = ThyTreeNodeCheckState;

    constructor(
        @Inject(THY_TREE_ABSTRACT_TOKEN) public root: ThyTreeAbstractComponent,
        public thyTreeService: ThyTreeService,
        private ngZone: NgZone,
        cdr: ChangeDetectorRef
    ) {
        this.thyTreeService
            .statusChanged()
            .pipe(
                filter(data => data.node.key === this.node.key),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.thyTreeService.syncFlattenTreeNodes();
            });
    }

    private changeDragIconVisibility(event: Event, showDragIcon: boolean): void {
        const nodeElement = event.target as HTMLElement;
        const dragIcon: HTMLElement | null = nodeElement.querySelector<HTMLElement>('.thy-tree-drag-icon');
        if (dragIcon) {
            dragIcon.style.visibility = showDragIcon ? 'visible' : 'hidden';
        }
    }

    public clickNode(event: Event) {
        if (!this.root.thyMultiple) {
            this.root.selectTreeNode(this.node);
        } else {
            this.root.toggleTreeNode(this.node);
        }
        this.thyOnClick.emit({
            eventName: 'click',
            event: event,
            node: this.node
        });
    }

    public clickNodeCheck(event: Event) {
        event.stopPropagation();
        if (this.node.isChecked === ThyTreeNodeCheckState.unchecked || this.node.isChecked === ThyTreeNodeCheckState.indeterminate) {
            this.node.setChecked(true);
        } else {
            this.node.setChecked(false);
        }
        this.thyTreeService.syncFlattenTreeNodes();
        this.thyOnCheckboxChange.emit({
            eventName: 'checkboxChange',
            event: event,
            node: this.node
        });
    }

    public expandNode(event: Event) {
        event.stopPropagation();
        this.node.setExpanded(!this.node.isExpanded);
        this.thyTreeService.syncFlattenTreeNodes();
        if (this.root.thyShowExpand) {
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

    ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.treeNodeWrapper.nativeElement, 'mouseenter', passiveEventListenerOptions)
                .pipe(takeUntil(this.destroy$))
                .subscribe((event: MouseEvent) => {
                    if (!this.root.thyDraggable || this.node.isDisabled) {
                        return;
                    } else if (this.root.thyDraggable && !this.root.thyBeforeDragStart) {
                        this.changeDragIconVisibility(event, true);
                    } else {
                        const parentNode = this.node.getParentNode();
                        const containerItems = parentNode?.getChildren() ?? this.root.treeNodes;
                        const dragStartEvent: ThyDragStartEvent = {
                            event: event as DragEvent,
                            item: this.node,
                            containerItems,
                            currentIndex: containerItems.indexOf(this.node)
                        };
                        this.changeDragIconVisibility(event, this.root.thyBeforeDragStart(dragStartEvent));
                    }
                });

            fromEvent(this.treeNodeWrapper.nativeElement, 'mouseleave', passiveEventListenerOptions)
                .pipe(takeUntil(this.destroy$))
                .subscribe((event: MouseEvent) => {
                    if (!this.root.thyDraggable || this.node.isDisabled) {
                        return;
                    } else {
                        this.changeDragIconVisibility(event, false);
                    }
                });
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
