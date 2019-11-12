import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-tree-select-empty',
    templateUrl: './empty.component.html'
})
export class DemoTreeSelectEmptyComponent implements OnInit {
    public emptyNodes = [];

    public emptyValue;

    constructor() {}

    ngOnInit() {}
}
