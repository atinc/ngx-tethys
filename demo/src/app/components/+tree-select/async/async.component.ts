import { Component, OnInit } from '@angular/core';
import { ThyTreeSelectNode } from 'ngx-tethys';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'demo-tree-select-async',
    templateUrl: './async.component.html'
})
export class DemoTreeSelectAsyncComponent implements OnInit {
    public asyncNodes = [
        {
            key: '01',
            title: 'root1',
            level: 0,
            children: [],
            childCount: 2
        }
    ];

    public asyncValue = '';

    public singleModel = {
        selectedValue: '010101',
        allowClear: false,
        disabled: false,
        showWholeName: true
    };

    constructor() {}

    ngOnInit() {}

    fetchNodeChildren(node: ThyTreeSelectNode) {
        return of([
            {
                key: '010101',
                title: 'child11',
                level: 2,
                icon: 'wtf wtf-file-text',
                children: []
            },
            {
                key: '010102',
                title: 'child12',
                level: 2,
                icon: 'wtf wtf-file-text',
                children: []
            }
        ]).pipe(delay(1000));
    }
}
