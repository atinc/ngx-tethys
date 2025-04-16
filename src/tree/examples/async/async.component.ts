import { Component, ViewChild } from '@angular/core';
import { ThyTree, ThyTreeEmitEvent, ThyTreeNodeData } from 'ngx-tethys/tree';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-tree-async-example',
    templateUrl: './async.component.html',
    imports: [ThyTree]
})
export class ThyTreeAsyncExampleComponent {
    @ViewChild('tree') treeComponent: ThyTree;

    treeNodes: ThyTreeNodeData[] = [
        {
            key: '111111111111111111111111',
            title: '组织架构',
            expanded: false,
            _id: '111111111111111111111111',
            name: '组织架构',
            member_count: 3
        }
    ];

    constructor() {}

    expandChange(event: ThyTreeEmitEvent) {
        // load child async
        if (event.eventName === 'expand') {
            const node = event.node;
            if (node?.getChildren().length === 0 && node?.isExpanded) {
                this.loadNode().then(data => {
                    node.addChildren(data);
                });
            }
        }
    }

    loadNode(): Promise<ThyTreeNodeData[]> {
        return new Promise(resolve => {
            setTimeout(
                () =>
                    resolve([
                        { title: 'Child Node', key: `${new TinyDate().getTime()}-0` },
                        { title: 'Child Node', key: `${new TinyDate().getTime()}-1` }
                    ]),
                500
            );
        });
    }
}
