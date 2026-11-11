import { Component, signal } from '@angular/core';
import { ThyButtonGroup, ThyButton } from 'ngx-tethys/button';
import { FormsModule } from '@angular/forms';
import { ThyFormDirective, ThyFormGroupFooter, ThyFormLayout, ThyFormSubmitDirective, ThyFormGroup } from 'ngx-tethys/form';
import { NgClass } from '@angular/common';
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
        NgClass,
        FormsModule,
        ThyFormDirective,
        ThyFormGroup,
        ThyInputDirective,
        ThyFormGroupFooter,
        ThyFormSubmitDirective
    ]
})
export class ThyFormLayoutExampleComponent {
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

    showForm = signal<boolean>(true);

    saving = signal<boolean>(false);

    currentLayout = signal<LayoutInfo>(this.layouts[0]);

    updateLayout(layout: LayoutInfo) {
        this.showForm.set(false);
        this.currentLayout.set(layout);
        setTimeout(() => {
            this.showForm.set(true);
        });
    }

    login() {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        setTimeout(() => {
            this.saving.set(false);
        }, 2000);
    }
}
