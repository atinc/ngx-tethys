import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import {
    ThyDynamicForm,
    ThyDynamicFormFieldConfig,
    ThyDynamicFormFieldValueChange,
    ThyDynamicFormSubmitEvent,
    ThyDynamicFormValue
} from 'ngx-tethys/form';

@Component({
    selector: 'thy-form-dynamic-example',
    templateUrl: './dynamic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [JsonPipe, ThyDynamicForm, ThyButton]
})
export class ThyFormDynamicExampleComponent {
    value = signal<ThyDynamicFormValue>({});

    lastSubmit = signal<ThyDynamicFormSubmitEvent | null>(null);

    fields: ThyDynamicFormFieldConfig[] = [
        {
            key: 'code',
            kind: 'input',
            validators: [
                ctx => {
                    const value = String(ctx.value ?? '').trim();
                    if (!value) {
                        return null;
                    }
                    return value === 'ok' ? null : { codeIsOk: '必须输入 ok' };
                }
            ],
            props: {
                label: '口令',
                placeholder: '输入 ok'
            }
        },
        {
            key: 'name',
            kind: 'input',
            updateOn: 'blur',
            errorMessages: {
                required: '请填写名称',
                minlength: '名称至少 2 个字'
            },
            props: {
                label: '名称',
                placeholder: '请输入名称',
                required: true,
                minlength: 2
            }
        },
        {
            key: 'email',
            kind: 'input',
            col: 6,
            errorMessages: {
                required: '请填写邮箱',
                pattern: '邮箱格式不正确'
            },
            props: {
                label: '邮箱',
                placeholder: 'name@example.com',
                required: true,
                pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
            }
        },
        {
            key: 'age',
            kind: 'input',
            col: 6,
            props: {
                label: '年龄',
                placeholder: '18 及以上',
                type: 'number',
                min: 18,
                max: 120
            }
        },
        {
            key: 'bio',
            kind: 'textarea',
            props: {
                label: '简介',
                placeholder: '最多 50 个字',
                rows: 4,
                maxlength: 50
            }
        }
    ];

    onValueChange(value: ThyDynamicFormValue) {
        this.value.set(value);
    }

    onFieldValueChange(event: ThyDynamicFormFieldValueChange) {
        console.log('onFieldValueChange', event);
    }

    onSubmit(event: ThyDynamicFormSubmitEvent) {
        this.lastSubmit.set(event);
    }
}
