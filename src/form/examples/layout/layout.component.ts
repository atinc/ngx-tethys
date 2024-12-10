import { Component, OnInit } from '@angular/core';
import { ThyFormLayout } from 'ngx-tethys/form';

interface LayoutInfo {
    value: ThyFormLayout;
    text: string;
}

@Component({
    selector: 'thy-form-layout-example',
    templateUrl: './layout.component.html',
    standalone: false
})
export class ThyFormLayoutExampleComponent implements OnInit {
    layouts: LayoutInfo[] = [
        {
            value: 'horizontal',
            text: 'Horizontal'
        },
        {
            value: 'vertical',
            text: 'Vertical'
        },
        {
            value: 'inline',
            text: 'Inline'
        }
    ];

    showForm = true;
    saving = false;

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

    login() {
        if (this.saving) {
            return;
        }
        this.saving = true;
        setTimeout(() => {
            this.saving = false;
        }, 2000);
    }
}
