import { Component, OnInit } from '@angular/core';
import { ThyTreeSelectNode } from '../tree-select.class';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-tree-select-async-fetch-example',
    templateUrl: './async-fetch.component.html',
    standalone: false
})
export class ThyTreeSelectAsyncFetchExampleComponent implements OnInit {
    public asyncNodes: ThyTreeSelectNode[] = [
        {
            _id: '01',
            name: 'parent-1',
            level: 0,
            icon: 'children',
            children: [],
            childCount: 2
        }
    ];

    public asyncValue = '';

    constructor() {}

    ngOnInit() {}

    fetchNodeChildren(node: ThyTreeSelectNode) {
        return of([
            {
                _id: '010101',
                name: 'child-1',
                level: 2,
                icon: 'flag',
                children: []
            },
            {
                _id: '010102',
                name: 'child-2',
                level: 2,
                icon: 'flag',
                children: []
            }
        ]).pipe(delay(600));
    }
}
