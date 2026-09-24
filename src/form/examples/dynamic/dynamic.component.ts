import { JsonPipe } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, computed, signal, viewChild } from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import { ThyButton } from 'ngx-tethys/button';
import { ThyDynamicForm, ThyFormFieldConfig, ThyFormFieldValueChange, ThyDynamicFormValue, ThyFormGroupFooter } from 'ngx-tethys/form';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThySelectOptionModel } from 'ngx-tethys/select';
import { ThyTag } from 'ngx-tethys/tag';

const PROJECTS: Record<string, ThySelectOptionModel[]> = {
    'organization-a': [
        { value: 'project-a1', label: 'Project A1' },
        { value: 'project-a2', label: 'Project A2' }
    ],
    'organization-b': [
        { value: 'project-b1', label: 'Project B1' },
        { value: 'project-b2', label: 'Project B2' }
    ]
};

@Component({
    selector: 'thy-form-dynamic-example',
    templateUrl: './dynamic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [JsonPipe, ThyDynamicForm, ThyButton, ThyFormGroupFooter, ThyTag, ThyRowDirective, ThyColDirective]
})
export class ThyFormDynamicExampleComponent {
    private readonly dynamicForm = viewChild(ThyDynamicForm);

    value = signal<ThyDynamicFormValue>({});

    lastSubmit = signal<ThyDynamicFormValue | null>(null);

    status = signal<FormControlStatus>('INVALID');

    readonly statusColor = computed(() => {
        switch (this.status()) {
            case 'VALID':
                return 'success';
            case 'INVALID':
                return 'danger';
            case 'PENDING':
                return 'warning';
            default:
                return 'default';
        }
    });

    fields = signal<ThyFormFieldConfig[]>([
        {
            key: 'username',
            kind: 'input',
            updateOn: 'blur',
            defaultValue: 'Ada',
            errorMessages: {
                required: 'Please type username',
                reserved: 'admin is reserved'
            },
            validators: [({ value }) => (value === 'admin' ? { reserved: true } : null)],
            props: {
                label: 'Username',
                placeholder: 'Please type username',
                required: true,
                minlength: 2
            }
        },
        {
            key: 'email',
            kind: 'input',
            col: 6,
            props: {
                label: 'Email',
                placeholder: 'Please type email',
                required: true,
                pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
            }
        },
        {
            key: 'age',
            kind: 'input',
            col: 6,
            props: {
                label: 'Age',
                placeholder: 'Please type number larger than 10',
                type: 'number',
                required: true,
                min: 10
            }
        },
        {
            key: 'role',
            kind: 'select',
            props: {
                label: 'Role',
                placeholder: 'Please select',
                required: true,
                options: [
                    { value: 'product', label: 'Product' },
                    { value: 'developer', label: 'Developer' }
                ]
            }
        },
        {
            key: 'organization',
            kind: 'select',
            col: 6,
            props: {
                label: 'Organization',
                placeholder: 'Disabled when Role is Developer',
                required: true,
                options: [
                    { value: 'organization-a', label: 'Organization A' },
                    { value: 'organization-b', label: 'Organization B' }
                ]
            }
        },
        {
            key: 'project',
            kind: 'select',
            col: 6,
            props: {
                label: 'Project',
                placeholder: 'Please select organization first',
                required: true,
                options: []
            }
        }
    ]);

    private projectSeq = 0;

    constructor() {
        afterNextRender(() => {
            const form = this.dynamicForm();
            if (!form) {
                return;
            }
            this.value.set(form.formGroup.getRawValue() as ThyDynamicFormValue);
            this.status.set(form.formGroup.status);
        });
    }

    onValueChange(value: ThyDynamicFormValue) {
        this.value.set(value);
    }

    onFieldValueChange(event: ThyFormFieldValueChange) {
        if (event.key === 'role') {
            this.patchOrganizationDisabled(event.value === 'developer');
            return;
        }
        if (event.key !== 'organization') {
            return;
        }
        this.value.update(current => ({ ...current, organization: event.value, project: null }));
        this.patchProjectOptions([]);
        void this.loadProjects(event.value);
    }

    onSubmit(value: ThyDynamicFormValue) {
        this.lastSubmit.set(value);
    }

    onStatusChange(status: FormControlStatus) {
        this.status.set(status);
    }

    private patchOrganizationDisabled(disabled: boolean) {
        this.fields.update(fields =>
            fields.map(field => (field.key === 'organization' ? { ...field, props: { ...field.props, disabled } } : field))
        );
    }

    private async loadProjects(organization: unknown) {
        const seq = ++this.projectSeq;
        await new Promise(resolve => setTimeout(resolve, 300));
        if (seq !== this.projectSeq) {
            return;
        }
        this.patchProjectOptions(typeof organization === 'string' ? (PROJECTS[organization] ?? []) : []);
    }

    private patchProjectOptions(options: ThySelectOptionModel[]) {
        this.fields.update(fields =>
            fields.map(field =>
                field.key === 'project' && field.kind === 'select' ? { ...field, props: { ...field.props, options } } : field
            )
        );
    }
}
