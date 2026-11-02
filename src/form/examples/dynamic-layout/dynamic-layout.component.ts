import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import {
    ThyDynamicForm,
    ThyDynamicFormValue,
    ThyFormFieldSchema,
    ThyFormGroupFooter,
    ThyFormLayout
} from 'ngx-tethys/form';

interface LayoutInfo {
    value: ThyFormLayout;
    text: string;
}

@Component({
    selector: 'thy-form-dynamic-layout-example',
    templateUrl: './dynamic-layout.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgClass, ThyButton, ThyButtonGroup, ThyDynamicForm, ThyFormGroupFooter]
})
export class ThyFormDynamicLayoutExampleComponent {
    readonly layouts: LayoutInfo[] = [
        { value: 'horizontal', text: 'Horizontal' },
        { value: 'vertical', text: 'Vertical' },
        { value: 'inline', text: 'Inline' }
    ];

    currentLayout = signal<LayoutInfo>(this.layouts[0]);

    value = signal<ThyDynamicFormValue>({});

    saving = signal(false);

    readonly fields: ThyFormFieldSchema[] = [
        {
            key: 'username',
            kind: 'input',
            props: {
                label: 'Username',
                placeholder: 'Please type username'
            }
        },
        {
            key: 'password',
            kind: 'input',
            props: {
                label: 'Password',
                placeholder: 'Please type password',
                type: 'password'
            }
        }
    ];

    updateLayout(layout: LayoutInfo) {
        this.currentLayout.set(layout);
    }

    onSubmit(_value: ThyDynamicFormValue) {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        setTimeout(() => {
            this.saving.set(false);
        }, 2000);
    }
}
