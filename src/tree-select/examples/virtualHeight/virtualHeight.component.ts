import { Component, OnInit } from '@angular/core';
import { ThyTreeSelectNode } from '../tree-select.class';

@Component({
    selector: 'thy-tree-virtual-height-example',
    templateUrl: './virtualHeight.component.html'
})
export class ThyTreeSelectVirtualHeightExampleComponent implements OnInit {
    public selectedValue = '';
    public treeSelectNodes: ThyTreeSelectNode[] = [];
    constructor() {}

    ngOnInit() {
        const dig = (path = '0', level = 3): ThyTreeSelectNode[] => {
            const list = [];
            for (let i = 0; i < 9; i += 1) {
                const key = `${path}-${i}`;
                const treeNode: ThyTreeSelectNode = {
                    name: key,
                    _id: key,
                    expand: true,
                    children: [],
                    isLeaf: false
                };

                if (level > 0) {
                    treeNode.children = dig(key, level - 1);
                } else {
                    treeNode.isLeaf = true;
                }

                list.push(treeNode);
            }
            return list;
        };

        this.treeSelectNodes = dig();
    }
}
