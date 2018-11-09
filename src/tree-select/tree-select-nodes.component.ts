import { Component, OnInit } from '@angular/core';
import { ThyTreeSelectComponent } from './tree-select.component';
import { ThyTreeSelectNode } from './tree-select.class';

@Component({
    selector: 'thy-tree-select-nodes',
    templateUrl: './tree-select-nodes.component.html'
})
export class ThyTreeSelectNodesComponent implements OnInit {

    public treeNodes = this.parent.treeNodes;

    public primaryKey = this.parent.thyPrimaryKey;

    public showKey = this.parent.thyShowKey;

    constructor(
        public parent: ThyTreeSelectComponent,
    ) { }

    ngOnInit() { }

    treeNodeIsSelected(node: ThyTreeSelectNode) {
        if (this.parent.thyMultiple) {
            return (this.parent.selectedNodes || []).find(item => {
                return item[this.primaryKey] === node[this.primaryKey];
            });
        } else {
            return this.parent.selectedNode && this.parent.selectedNode[this.primaryKey] === node[this.primaryKey];
        }
    }

    treeNodeIsHidden(node: ThyTreeSelectNode) {
        if (this.parent.thyHiddenNodeKey) {
            return node[this.parent.thyHiddenNodeKey];
        }
        if (this.parent.thyHiddenNodeFn) {
            return this.parent.thyHiddenNodeFn(node);
        }
        return false;
    }

    treeNodeIsDisable(node: ThyTreeSelectNode) {
        if (this.parent.thyDisableNodeKey) {
            return node[this.parent.thyDisableNodeKey];
        }
        if (this.parent.thyDisableNodeFn) {
            return this.parent.thyDisableNodeFn(node);
        }
        return false;
    }

    treeNodeIsExpand(node: ThyTreeSelectNode) {
        let isSelectedNodeParent = false;
        if (this.parent.thyMultiple) {
            isSelectedNodeParent = !!(this.parent.selectedNodes || []).find(item => {
                return item.parentValues.indexOf(node[this.primaryKey]) > -1;
            });
        } else {
            isSelectedNodeParent = this.parent.selectedNode ?
                this.parent.selectedNode.parentValues.indexOf(node[this.primaryKey]) > -1 : false;
        }
        return node.expand || (Object.keys(node)).indexOf('expand') < 0 && isSelectedNodeParent;
    }

    getNodeChildren(node: ThyTreeSelectNode) {
        this.parent.getNodeChildren(node);
    }

    selectTreeNode(event: Event, node: ThyTreeSelectNode) {
        event.stopPropagation();
        if (this.treeNodeIsDisable(node)) {
            return;
        }
        this.parent.selectNode(node);
    }

    nodeExpandToggle(event: Event, node: ThyTreeSelectNode) {
        event.stopPropagation();
        if (Object.keys(node).indexOf('expand') > -1) {
            node.expand = !node.expand;
        } else {
            if (this.treeNodeIsExpand(node)) {
                node.expand = false;
            } else {
                node.expand = true;
            }
        }

        if (node.expand && this.parent.thyAsyncNode) {
            this.getNodeChildren(node);
        }
    }

}
