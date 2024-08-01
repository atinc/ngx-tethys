import { Subject } from 'rxjs';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import {
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    numberAttribute
} from '@angular/core';

import { THY_TREE_ABSTRACT_TOKEN, ThyTreeAbstractComponent } from './tree-abstract';
import { ThyTreeNode } from './tree-node.class';
import { ThyTreeEmitEvent, ThyTreeNodeCheckState, ThyClickBehavior } from './tree.class';
import { ThyTreeService } from './tree.service';
import { ThyLoading } from 'ngx-tethys/loading';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgIf, NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';

const passiveEventListenerOptions = <AddEventListenerOptions>normalizePassiveListenerOptions({ passive: true });

/**
 * 树形控件的节点组件
 * @private
 * @name thy-tree-node
 */
@Component({
    selector: 'thy-tree-node',
    templateUrl: './tree-node.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgIf, ThyIcon, NgClass, NgStyle, NgTemplateOutlet, ThyLoading]
})
export class ThyTreeNodeComponent implements OnDestroy, OnInit, OnChanges {
    /**
     * node 节点展现所需的数据
     */
    @Input() node: ThyTreeNode;

    /**
     * 设置 TreeNode 是否支持异步加载
     */
    @Input({ transform: coerceBooleanProperty }) thyAsync = false;

    /**
     * 设置 TreeNode 是否支持多选节点
     */
    @Input({ transform: coerceBooleanProperty }) thyMultiple = false;

    /**
     * 设置 TreeNode 是否支持拖拽排序
     */
    @Input({ transform: coerceBooleanProperty }) thyDraggable = false;

    /**
     * 设置 TreeNode 是否支持 Checkbox 选择
     */
    @Input({ transform: coerceBooleanProperty }) thyCheckable = false;

    /**
     * 点击节点的行为，`default` 为选中当前节点，`selectCheckbox` 为选中节点的 Checkbox， `thyCheckable` 为 true 时生效。
     * @default default
     */
    @Input() thyClickBehavior: ThyClickBehavior;

    /**
     * 设置节点名称是否支持超出截取
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyTitleTruncate: boolean;

    /**
     * 设置 TreeNode 的渲染模板
     */
    @Input() templateRef: TemplateRef<any>;

    /**
     * 设置子的空数据渲染模板
     */
    @Input() emptyChildrenTemplateRef: TemplateRef<any>;

    /**
     * 设置 node 点击事件
     */
    @Output() thyOnClick: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    /**
     * 双击 node 事件
     */
    @Output() thyDblClick: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    /**
     * 点击展开触发事件
     */
    @Output() thyOnExpandChange: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    /**
     * 设置 check 选择事件
     */
    @Output() thyOnCheckboxChange: EventEmitter<ThyTreeEmitEvent> = new EventEmitter<ThyTreeEmitEvent>();

    /**
     * 设置 childrenTree 的渲染模板
     */
    @ContentChild('childrenTree') childrenTreeTemplateRef: TemplateRef<any>;

    /** The native `<div class="thy-tree-node-wrapper thy-sortable-item"></div>` element. */
    @ViewChild('treeNodeWrapper', { static: true }) treeNodeWrapper: ElementRef<HTMLElement>;

    @HostBinding('class.thy-tree-node') thyTreeNodeClass = true;

    @HostBinding('class') itemClass: string;

    /**
     * 开启虚拟滚动时，单行节点的高度，当`thySize`为`default`时，该参数才生效
     */
    @Input({ transform: numberAttribute }) thyItemSize = 44;

    /**
     * 设置节点缩进距离，缩进距离 = thyIndent * node.level
     */
    @Input({ transform: numberAttribute }) thyIndent = 25;

    public get nodeIcon() {
        return this.node.origin.icon;
    }

    public get nodeIconStyle() {
        return this.node.origin.iconStyle;
    }

    private destroy$ = new Subject<void>();

    checkState = ThyTreeNodeCheckState;

    constructor(@Inject(THY_TREE_ABSTRACT_TOKEN) public root: ThyTreeAbstractComponent, public thyTreeService: ThyTreeService) {}

    public clickNode(event: Event) {
        if (this.node.isDisabled) {
            this.expandNode(event);
        } else {
            if (this.thyCheckable && this.thyClickBehavior === 'selectCheckbox') {
                this.clickNodeCheck(event);
            } else {
                if (this.root.thyMultiple) {
                    this.root.toggleTreeNode(this.node);
                } else {
                    this.root.selectTreeNode(this.node);
                }
            }
        }
        this.thyOnClick.emit({
            eventName: 'click',
            event: event,
            node: this.node
        });
    }

    public dbClickNode(event: Event) {
        this.thyDblClick.emit({
            eventName: 'dbclick',
            event: event,
            node: this.node
        });
    }

    public clickNodeCheck(event: Event) {
        event.stopPropagation();
        if (this.node.isChecked === ThyTreeNodeCheckState.unchecked) {
            this.node.setChecked(true);
        } else if (this.node.isChecked === ThyTreeNodeCheckState.checked) {
            this.node.setChecked(false);
        } else if (this.node.isChecked === ThyTreeNodeCheckState.indeterminate) {
            if (this.node.children?.length) {
                const activeChildren = this.node.children.filter(item => !item.isDisabled);
                const isAllActiveChildrenChecked = activeChildren.every(item => item.isChecked);
                this.node.setChecked(!isAllActiveChildrenChecked);
            } else {
                this.node.setChecked(true);
            }
        }
        this.thyOnCheckboxChange.emit({
            eventName: 'checkboxChange',
            event: event,
            node: this.node
        });
    }

    public expandNode(event: Event) {
        event.stopPropagation();
        this.node.setExpanded(!this.node.isExpanded);
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
        this.itemClass = this.node?.itemClass?.join(' ');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.node && !changes.node.isFirstChange()) {
            this.itemClass = changes?.node?.currentValue.itemClass?.join(' ');
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
