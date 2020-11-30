import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-select-auto-expend-example',
    templateUrl: './auto-expend.component.html'
})
export class ThySelectAutoExpendExampleComponent implements OnInit {
    listOfOption: Array<{ label: string; value: string }> = [];

    isAutoExpend = true;

    constructor() {}

    ngOnInit() {
        const children: Array<{ label: string; value: string }> = [];
        for (let i = 10; i < 36; i++) {
            children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        this.listOfOption = children;
    }
}
