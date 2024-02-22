import { Component, ViewChild } from '@angular/core';
import { ThyTreeComponent, ThyTreeEmitEvent, ThyTreeNodeData } from 'ngx-tethys/tree';

@Component({
    selector: 'thy-tree-async-example',
    templateUrl: './async.component.html'
})
export class ThyTreeAsyncExampleComponent {
    @ViewChild('tree') treeComponent: ThyTreeComponent;

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
                        { title: 'Child Node', key: `${new Date().getTime()}-0` },
                        { title: 'Child Node', key: `${new Date().getTime()}-1` }
                    ]),
                500
            );
        });
    }
}
