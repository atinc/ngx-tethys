import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import {
    ThyDynamicForm,
    ThyDynamicFormStatus,
    ThyFormFieldConfig,
    ThyFormFieldValueChange,
    ThyDynamicFormValue,
    ThyFormGroupFooter
} from 'ngx-tethys/form';
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
    value = signal<ThyDynamicFormValue>({});

    lastSubmit = signal<ThyDynamicFormValue | null>(null);

    status = signal<ThyDynamicFormStatus>({
        valid: false,
        invalid: false,
        pending: false,
        submitting: false
    });

    readonly statusText = computed(() => {
        const status = this.status();
        if (status.submitting) {
            return 'SUBMITTING';
        }
        if (status.pending) {
            return 'PENDING';
        }
        return status.invalid ? 'INVALID' : 'VALID';
    });

    readonly statusColor = computed(() => {
        switch (this.statusText()) {
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

    readonly fields = signal<ThyFormFieldConfig[]>([
        {
            key: 'username',
            kind: 'input',
            debounce: 'blur',
            defaultValue: 'Ada',
            errorMessages: {
                required: 'Please type username',
                reserved: 'admin is reserved'
            },
            validators: [({ value }) => (value === 'admin' ? { kind: 'reserved' } : null)],
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
            kind: 'number',
            col: 6,
            props: {
                label: 'Age',
                placeholder: 'Please type number larger than 10',
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
                placeholder: 'Please select organization',
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

    onValueChange(value: ThyDynamicFormValue) {
        console.log('valueChange：', value);
    }

    onFieldValueChange(event: ThyFormFieldValueChange) {
        console.log('fieldValueChange：', event);
        if (event.key === 'role') {
            this.patchOrganizationDisabled(event.value === 'developer');
            return;
        }
        if (event.key !== 'organization') {
            return;
        }
        this.value.update(current => ({ ...current, project: null }));
        this.patchProjectOptions([]);
        void this.loadProjects(event.value);
    }

    onSubmit(value: ThyDynamicFormValue) {
        console.log('submit：', value);
        this.lastSubmit.set(value);
    }

    onStatusChange(status: ThyDynamicFormStatus) {
        console.log('statusChange：', status);
        this.status.set(status);
    }

    private patchOrganizationDisabled(disabled: boolean) {
        this.fields.update(fields =>
            fields.map(field => (field.key === 'organization' ? { ...field, props: { ...field.props, disabled: disabled } } : field))
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
