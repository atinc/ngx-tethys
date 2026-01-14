import { Component, OnInit } from '@angular/core';
import { ThyButtonGroup, ThyButton } from 'ngx-tethys/button';
import { FormsModule } from '@angular/forms';
import { ThyFormDirective, ThyFormGroupFooter, ThyFormLayout, ThyFormSubmitDirective, ThyFormGroup } from 'ngx-tethys/form';

import { ThyInputDirective } from 'ngx-tethys/input';

interface LayoutInfo {
    value: ThyFormLayout;
    text: string;
}

@Component({
    selector: 'thy-form-layout-example',
    templateUrl: './layout.component.html',
    imports: [
    ThyButtonGroup,
    ThyButton,
    FormsModule,
    ThyFormDirective,
    ThyFormGroup,
    ThyInputDirective,
    ThyFormGroupFooter,
    ThyFormSubmitDirective
]
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
