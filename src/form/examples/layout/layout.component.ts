import { Component, OnInit } from '@angular/core';
import { ThyFormLayout } from 'ngx-tethys';

interface LayoutInfo {
    value: ThyFormLayout;
    text: string;
}

@Component({
    selector: 'thy-form-layout-example',
    templateUrl: './layout.component.html'
})
export class ThyFormLayoutExampleComponent implements OnInit {
    layouts: LayoutInfo[] = [
        {
            value: 'horizontal',
            text: 'Horizontal 水平'
        },
        {
            value: 'vertical',
            text: 'Vertical 垂直'
        },
        {
            value: 'inline',
            text: 'Inline 行内'
        }
    ];

    showForm = true;

    currentLayout: LayoutInfo = this.layouts[0];

    constructor() {}

    ngOnInit(): void {}

    updateLayout(layout: LayoutInfo) {
        this.showForm = false;
        this.currentLayout = layout;
        setTimeout(() => {
            this.showForm = true;
        });
    }
}
