import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import {
    ThyDynamicForm,
    ThyDynamicFormFieldConfig,
    ThyDynamicFormFieldValueChange,
    ThyDynamicFormSelectOptions,
    ThyDynamicFormValue
} from 'ngx-tethys/form';

const PROJECTS: Record<string, ThyDynamicFormSelectOptions> = {
    'org-a': [
        { value: 'p-a1', label: '项目 A1' },
        { value: 'p-a2', label: '项目 A2' }
    ],
    'org-b': [
        { value: 'p-b1', label: '项目 B1' },
        { value: 'p-b2', label: '项目 B2' }
    ]
};

@Component({
    selector: 'thy-form-dynamic-linkage-example',
    templateUrl: './dynamic-linkage.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [JsonPipe, ThyDynamicForm, ThyButton]
})
export class ThyFormDynamicLinkageExampleComponent {
    value = signal<ThyDynamicFormValue>({});

    fields = signal<ThyDynamicFormFieldConfig[]>([
        {
            key: 'role',
            kind: 'select',
            col: 6,
            props: {
                label: '角色',
                placeholder: '请选择角色',
                required: true,
                options: [
                    { value: 'dev', label: '开发' },
                    { value: 'pm', label: '产品' }
                ]
            }
        },
        {
            key: 'title',
            kind: 'input',
            col: 6,
            disabled: false,
            props: {
                label: '职称',
                placeholder: '开发角色时禁用'
            }
        },
        {
            key: 'orgId',
            kind: 'select',
            col: 6,
            props: {
                label: '组织',
                placeholder: '请选择组织',
                required: true,
                options: [
                    { value: 'org-a', label: '组织 A' },
                    { value: 'org-b', label: '组织 B' }
                ]
            }
        },
        {
            key: 'projectId',
            kind: 'select',
            col: 6,
            props: {
                label: '项目',
                placeholder: '请先选择组织',
                required: true,
                options: []
            }
        }
    ]);

    private projectSeq = 0;

    onValueChange(value: ThyDynamicFormValue) {
        this.value.set(value);
    }

    onFieldValueChange(event: ThyDynamicFormFieldValueChange) {
        if (event.key === 'role') {
            this.patchTitleDisabled(event.value === 'dev');
            return;
        }
        if (event.key !== 'orgId') {
            return;
        }
        this.value.update(current => ({ ...current, orgId: event.value, projectId: null }));
        this.patchProjectOptions([]);
        void this.loadProjects(event.value);
    }

    private patchTitleDisabled(disabled: boolean) {
        this.fields.update(fields => fields.map(field => (field.key === 'title' ? { ...field, disabled } : field)));
    }

    private async loadProjects(orgId: unknown) {
        const seq = ++this.projectSeq;
        await new Promise(resolve => setTimeout(resolve, 300));
        if (seq !== this.projectSeq) {
            return;
        }
        this.patchProjectOptions(typeof orgId === 'string' ? (PROJECTS[orgId] ?? []) : []);
    }

    private patchProjectOptions(options: ThyDynamicFormSelectOptions) {
        this.fields.update(fields =>
            fields.map(field =>
                field.key === 'projectId' && field.kind === 'select' ? { ...field, props: { ...field.props, options } } : field
            )
        );
    }
}
