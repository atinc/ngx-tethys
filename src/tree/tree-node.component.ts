import {
    Component,
    ElementRef,
    TemplateRef,
    ViewEncapsulation,
    numberAttribute,
    inject,
    input,
    computed,
    contentChild,
    viewChild,
    output
} from '@angular/core';

import { THY_TREE_ABSTRACT_TOKEN } from './tree-abstract';
import { ThyTreeNode , ThyTreeEmitEvent, ThyTreeNodeCheckState, ThyClickBehavior } from './tree.class';
import { ThyTreeService } from './tree.service';
import { ThyLoading } from 'ngx-tethys/loading';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 树形控件的节点组件
 * @private
 * @name thy-tree-node
 */
@Component({
    selector: 'thy-tree-node',
    standalone: true,
    templateUrl: './tree-node.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [ThyIcon, NgClass, NgStyle, NgTemplateOutlet, ThyLoading],
    host: {
        '[class.thy-tree-node]': 'true',
        '[class]': 'itemClass()'
    }
})
export class ThyTreeNodeComponent {
    root = inject(THY_TREE_ABSTRACT_TOKEN);
    thyTreeService = inject(ThyTreeService);

    /**
     * node 节点展现所需的数据
     */
    readonly node = input<ThyTreeNode>(null);

    /**
     * 设置 TreeNode 是否支持异步加载
     */
    readonly thyAsync = input(false, { transform: coerceBooleanProperty });

    /**
     * 设置 TreeNode 是否支持多选节点
     */
    readonly thyMultiple = input(false, { transform: coerceBooleanProperty });

    /**
     * 设置 TreeNode 是否支持拖拽排序
     */
    readonly thyDraggable = input(false, { transform: coerceBooleanProperty });

    /**
     * 设置 TreeNode 是否支持 Checkbox 选择
     */
    readonly thyCheckable = input(false, { transform: coerceBooleanProperty });

    /**
     * 点击节点的行为，`default` 为选中当前节点，`selectCheckbox` 为选中节点的 Checkbox， `thyCheckable` 为 true 时生效。
     * @default default
     */
    readonly thyClickBehavior = input<ThyClickBehavior>(undefined);

    /**
     * 设置节点名称是否支持超出截取
     * @default false
     */
    readonly thyTitleTruncate = input(false, { transform: coerceBooleanProperty });

    /**
     * 设置 TreeNode 的渲染模板
     */
    readonly templateRef = input<TemplateRef<any>>();

    /**
     * 设置子的空数据渲染模板
     */
    readonly emptyChildrenTemplateRef = input<TemplateRef<any>>();

    /**
     * 设置 node 点击事件
     */
    readonly thyOnClick = output<ThyTreeEmitEvent>();

    /**
     * 双击 node 事件
     */
    readonly thyDblClick = output<ThyTreeEmitEvent>();

    /**
     * 点击展开触发事件
     */
    readonly thyOnExpandChange = output<ThyTreeEmitEvent>();

    /**
     * 设置 check 选择事件
     */
    readonly thyOnCheckboxChange = output<ThyTreeEmitEvent>();

    /**
     * 设置 childrenTree 的渲染模板
     */
    readonly childrenTreeTemplateRef = contentChild<TemplateRef<any>>('childrenTree');

    /** The native `<div class="thy-tree-node-wrapper thy-sortable-item"></div>` element. */
    readonly treeNodeWrapper = viewChild<ElementRef<HTMLElement>>('treeNodeWrapper');

    /**
     * 开启虚拟滚动时，单行节点的高度，当`thySize`为`default`时，该参数才生效
     */
    readonly thyItemSize = input(44, { transform: numberAttribute });

    /**
     * 设置节点缩进距离，缩进距离 = thyIndent * node.level
     */
    readonly thyIndent = input(25, { transform: numberAttribute });

    readonly nodeIcon = computed(() => {
        return this.node().origin.icon;
    });

    readonly nodeIconStyle = computed(() => {
        return this.node().origin.iconStyle;
    });

    protected readonly itemClass = computed(() => {
        return this.node()?.itemClass?.join(' ');
    });

    checkState = ThyTreeNodeCheckState;

    public clickNode(event: Event) {
        const node = this.node();
        if (node.isDisabled) {
            this.expandNode(event);
        } else {
            if (this.thyCheckable() && this.thyClickBehavior() === 'selectCheckbox') {
                this.clickNodeCheck(event);
            } else {
                if (this.root.thyMultiple()) {
                    this.root.toggleTreeNode(node);
                } else {
                    this.root.selectTreeNode(node);
                }
            }
        }
        this.thyOnClick.emit({
            eventName: 'click',
            event: event,
            node: node
        });
    }

    public dbClickNode(event: Event) {
        this.thyDblClick.emit({
            eventName: 'dbclick',
            event: event,
            node: this.node()
        });
    }

    public clickNodeCheck(event: Event) {
        event.stopPropagation();
        const node = this.node();
        if (node.isChecked === ThyTreeNodeCheckState.unchecked) {
            node.setChecked(true);
        } else if (node.isChecked === ThyTreeNodeCheckState.checked) {
            node.setChecked(false);
        } else if (node.isChecked === ThyTreeNodeCheckState.indeterminate) {
            if (node.children?.length) {
                const activeChildren = node.children.filter(item => !item.isDisabled);
                const isAllActiveChildrenChecked = activeChildren.every(item => item.isChecked);
                node.setChecked(!isAllActiveChildrenChecked);
            } else {
                node.setChecked(true);
            }
        }
        this.thyOnCheckboxChange.emit({
            eventName: 'checkboxChange',
            event: event,
            node: node
        });
    }

    public expandNode(event: Event) {
        event.stopPropagation();
        const node = this.node();
        this.node().setExpanded(!node.isExpanded);
        if (this.root.thyShowExpand()) {
            this.thyOnExpandChange.emit({
                eventName: 'expand',
                event: event,
                node: node
            });
            if (this.thyAsync() && node.children.length === 0) {
                node.setLoading(true);
            }
        }
    }

    public isShowExpand(node: ThyTreeNode) {
        return this.root.isShowExpand(node);
    }
}
