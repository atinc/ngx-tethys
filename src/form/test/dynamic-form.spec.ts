import { provideHttpClient } from '@angular/common/http';
import { Component, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { ValidationError } from '@angular/forms/signals';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ThyButton } from 'ngx-tethys/button';
import {
    ThyDynamicForm,
    ThyDynamicFormStatus,
    ThyFormFieldConfig,
    ThyDynamicFormValue,
    ThyFormModule,
    ThyFormValidatorLoader
} from 'ngx-tethys/form';
import { ThySelect } from 'ngx-tethys/select';
import { bypassSanitizeProvider, dispatchFakeEvent, injectDefaultSvgIconSet } from 'ngx-tethys/testing';

@Component({
    selector: 'thy-test-dynamic-form',
    template: `
        <thy-dynamic-form
            [thyFields]="fields"
            [(thyValue)]="value"
            [thySize]="size"
            (thyValueChange)="onValueChange($event)"
            (thyFieldValueChange)="onFieldValueChange($event)"
            (thyStatusChange)="onStatusChange($event)"
            (thySubmit)="onSubmit($event)">
            <button id="submit" type="submit" [thyButton]="'primary'">Save</button>
            <button id="reset" type="reset">Reset</button>
        </thy-dynamic-form>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDynamicForm, ThyButton]
})
class TestDynamicFormComponent {
    readonly dynamicForm = viewChild.required(ThyDynamicForm);

    fields: ThyFormFieldConfig[] = [];

    value: ThyDynamicFormValue = {};

    size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

    valueChanges: ThyDynamicFormValue[] = [];

    fieldValueChanges: { key: string; value: unknown }[] = [];

    submits: ThyDynamicFormValue[] = [];

    statusChanges: ThyDynamicFormStatus[] = [];

    onValueChange(value: ThyDynamicFormValue) {
        this.valueChanges.push(value);
    }

    onFieldValueChange(event: { key: string; value: unknown }) {
        this.fieldValueChanges.push(event);
    }

    onSubmit(value: ThyDynamicFormValue) {
        this.submits.push(value);
    }

    onStatusChange(status: ThyDynamicFormStatus) {
        this.statusChanges.push(status);
    }
}

describe('dynamic-form', () => {
    let fixture: ComponentFixture<TestDynamicFormComponent>;
    let testComponent: TestDynamicFormComponent;
    let formElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyFormModule],
            providers: [bypassSanitizeProvider, provideHttpClient(), provideNoopAnimations()]
        }).compileComponents();
        injectDefaultSvgIconSet();
    }));

    function setFields(fields: ThyFormFieldConfig[]) {
        fixture = TestBed.createComponent(TestDynamicFormComponent);
        testComponent = fixture.componentInstance;
        testComponent.fields = fields;
        fixture.detectChanges();
        formElement = fixture.debugElement.query(By.css('form')).nativeElement;
    }

    function setValue(value: ThyDynamicFormValue) {
        testComponent.value = value;
        fixture.detectChanges();
    }

    it('should apply defaultValue when value is not set', () => {
        setFields([{ key: 'name', kind: 'input', defaultValue: 'Ada' }]);
        expect(formElement.querySelector('input')?.value).toBe('Ada');
        expect(testComponent.value).toEqual({ name: 'Ada' });
        expect(testComponent.valueChanges.at(-1)).toEqual({ name: 'Ada' });
    });

    it('should not emit thyValueChange when value is written', () => {
        setFields([{ key: 'name', kind: 'input', defaultValue: 'Ada' }]);
        testComponent.valueChanges.length = 0;
        setValue({ name: 'Lin' });
        expect(testComponent.valueChanges.length).toBe(0);
        expect(formElement.querySelector('input')?.value).toBe('Lin');
    });

    it('should emit field and model changes when Signal Forms updates the model', () => {
        setFields([{ key: 'name', kind: 'input' }]);
        testComponent.valueChanges.length = 0;
        testComponent.fieldValueChanges.length = 0;

        testComponent.dynamicForm().getField('name')().value.set('Ada');
        fixture.detectChanges();

        expect(testComponent.value).toEqual({ name: 'Ada' });
        expect(testComponent.valueChanges).toEqual([{ name: 'Ada' }]);
        expect(testComponent.fieldValueChanges).toEqual([{ key: 'name', value: 'Ada' }]);
    });

    it('should keep a value update made from thyFieldValueChange', fakeAsync(() => {
        setFields([
            { key: 'organization', kind: 'select' },
            { key: 'project', kind: 'select' }
        ]);
        tick();
        testComponent.dynamicForm().getField('project')().value.set('project-a1');
        fixture.detectChanges();

        testComponent.onFieldValueChange = event => {
            testComponent.fieldValueChanges.push(event);
            if (event.key === 'organization') {
                testComponent.value = { ...testComponent.value, project: null };
            }
        };

        testComponent.dynamicForm().getField('organization')().value.set('organization-b');
        fixture.detectChanges();

        expect(testComponent.value).toEqual({ organization: 'organization-b', project: null });
        expect(testComponent.dynamicForm().fieldTree().value()).toEqual({ organization: 'organization-b', project: null });
    }));

    it('should not emit changes when the model input is updated externally', () => {
        setFields([{ key: 'name', kind: 'input' }]);
        testComponent.valueChanges.length = 0;
        testComponent.fieldValueChanges.length = 0;

        setValue({ name: 'Lin' });

        expect(testComponent.valueChanges).toEqual([]);
        expect(testComponent.fieldValueChanges).toEqual([]);
        expect(formElement.querySelector('input')?.value).toBe('Lin');
    });

    it('should preserve an explicit null default value', () => {
        setFields([{ key: 'organization', kind: 'select', defaultValue: null }]);
        expect(testComponent.dynamicForm().fieldTree().value()).toEqual({ organization: null });

        testComponent.dynamicForm().getField('organization')().value.set('organization-a');
        testComponent.dynamicForm().reset();
        fixture.detectChanges();

        expect(testComponent.dynamicForm().fieldTree().value()).toEqual({ organization: null });
    });

    it('should emit Signal Forms status snapshots only when status changes', fakeAsync(() => {
        setFields([{ key: 'name', kind: 'input', props: { required: true } }]);
        tick();
        fixture.detectChanges();

        expect(testComponent.statusChanges.at(-1)).toEqual({
            valid: false,
            invalid: true,
            pending: false,
            submitting: false
        });

        const statusChangeCount = testComponent.statusChanges.length;
        setValue({ name: '' });
        tick();
        expect(testComponent.statusChanges.length).toBe(statusChangeCount);

        setValue({ name: 'Ada' });
        tick();
        expect(testComponent.statusChanges.at(-1)).toEqual({
            valid: true,
            invalid: false,
            pending: false,
            submitting: false
        });
    }));

    it('should reject duplicate field keys before building the form', () => {
        expect(() =>
            setFields([
                { key: 'name', kind: 'input' },
                { key: 'name', kind: 'textarea' }
            ])
        ).toThrowError('Duplicate dynamic form field key: "name"');
    });

    it('should show required error after submit and not emit thySubmit', () => {
        setFields([
            {
                key: 'name',
                kind: 'input',
                errorMessages: { required: '请填写名称' },
                props: { label: '名称', required: true }
            }
        ]);
        setValue({ name: '' });

        fixture.debugElement.query(By.css('#submit')).nativeElement.click();
        fixture.detectChanges();

        expect(testComponent.submits).toEqual([]);
        expect(formElement.textContent).toContain('请填写名称');
        expect(formElement.querySelector('input')?.classList.contains('is-invalid')).toBe(true);
        expect(formElement.querySelector('.invalid-feedback')?.textContent).toBe('请填写名称');
    });

    it('should emit form value from thySubmit when valid', () => {
        setFields([{ key: 'name', kind: 'input', props: { required: true } }]);
        setValue({ name: 'Ada' });

        fixture.debugElement.query(By.css('#submit')).nativeElement.click();
        fixture.detectChanges();

        expect(testComponent.submits).toEqual([{ name: 'Ada' }]);
    });

    it('should use ThyFormValidatorLoader message when errorMessages is absent', () => {
        setFields([{ key: 'name', kind: 'input', props: { required: true } }]);
        setValue({ name: '' });
        fixture.debugElement.query(By.css('#submit')).nativeElement.click();
        fixture.detectChanges();
        const loader = TestBed.inject(ThyFormValidatorLoader);
        const message = formElement.querySelector('.invalid-feedback')?.textContent?.trim();
        expect(message).toBe(loader.getErrorMessage('name', 'required'));
        expect(formElement.querySelector('input')?.classList.contains('is-invalid')).toBe(true);
    });

    it('should interpolate loader minlength message', () => {
        setFields([{ key: 'name', kind: 'input', props: { minlength: 2 } }]);
        const input = formElement.querySelector('input')!;
        input.value = 'a';
        dispatchFakeEvent(input, 'input');
        dispatchFakeEvent(input, 'blur');
        fixture.detectChanges();
        const loader = TestBed.inject(ThyFormValidatorLoader);
        const message = formElement.querySelector('.invalid-feedback')?.textContent?.trim();
        expect(message).toBe(loader.getErrorMessage('name', 'minlength').replace('{minlength}', '2'));
    });

    it('should not use validator payload when loader has a message', fakeAsync(() => {
        setFields([
            {
                key: 'name',
                kind: 'input',
                validators: [ctx => (ctx.value ? null : { kind: 'required', message: 'from validator' })]
            }
        ]);
        setValue({ name: '' });
        fixture.debugElement.query(By.css('#submit')).nativeElement.click();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const loader = TestBed.inject(ThyFormValidatorLoader);
        expect(formElement.querySelector('.invalid-feedback')?.textContent?.trim()).toBe(loader.getErrorMessage('name', 'required'));
    }));

    it('should apply a custom function validator', fakeAsync(() => {
        setFields([
            {
                key: 'code',
                kind: 'input',
                validators: [
                    ctx => {
                        const value = String(ctx.value ?? '');
                        if (!value) {
                            return null;
                        }
                        return value === 'ok' ? null : { kind: 'codeIsOk', message: '必须输入 ok' };
                    }
                ]
            }
        ]);
        const input = formElement.querySelector('input')!;
        input.value = 'no';
        dispatchFakeEvent(input, 'input');
        dispatchFakeEvent(input, 'blur');
        fixture.detectChanges();
        tick();
        fixture.debugElement.query(By.css('#submit')).nativeElement.click();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(formElement.textContent).toContain('必须输入 ok');
        expect(formElement.querySelector('input')?.classList.contains('is-invalid')).toBe(true);
    }));

    it('should provide formValue and preserve all synchronous validator errors', fakeAsync(() => {
        setFields([
            { key: 'password', kind: 'input' },
            {
                key: 'confirmation',
                kind: 'input',
                validators: [
                    ({ value, formValue }) => (value === formValue['password'] ? null : { kind: 'passwordMismatch' }),
                    () => [{ kind: 'firstCustomError' }, { kind: 'secondCustomError' }]
                ]
            }
        ]);
        setValue({ password: 'secret', confirmation: 'different' });
        tick();

        expect(
            testComponent
                .dynamicForm()
                .getField('confirmation')()
                .errors()
                .map(error => error.kind)
        ).toEqual(['passwordMismatch', 'firstCustomError', 'secondCustomError']);
    }));

    it('should show custom validator payload when the validator returns a Promise', fakeAsync(() => {
        setFields([
            {
                key: 'code',
                kind: 'input',
                asyncValidators: [
                    ctx => {
                        const value = String(ctx.value ?? '');
                        if (!value) {
                            return Promise.resolve(null);
                        }
                        return Promise.resolve(value === 'ok' ? null : { kind: 'codeIsOk', message: '必须输入 ok' });
                    }
                ]
            }
        ]);
        const input = formElement.querySelector('input')!;
        input.value = 'no';
        dispatchFakeEvent(input, 'input');
        dispatchFakeEvent(input, 'blur');
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(formElement.textContent).toContain('必须输入 ok');
        expect(formElement.querySelector('input')?.classList.contains('is-invalid')).toBe(true);
    }));

    it('should aggregate asynchronous validator errors and preserve rejected validators', fakeAsync(() => {
        setFields([
            {
                key: 'code',
                kind: 'input',
                asyncValidators: [
                    ({ value, formValue }) =>
                        Promise.resolve(
                            value === formValue['expectedCode'] ? null : [{ kind: 'firstAsyncError' }, { kind: 'secondAsyncError' }]
                        ),
                    () => Promise.reject(new Error('validation failed'))
                ]
            },
            { key: 'expectedCode', kind: 'input' }
        ]);
        setValue({ code: 'wrong', expectedCode: 'ok' });
        tick();
        flushMicrotasks();
        fixture.detectChanges();

        const errors = testComponent.dynamicForm().getField('code')().errors();
        expect(errors.map(error => error.kind)).toEqual(['firstAsyncError', 'secondAsyncError', 'asyncValidation']);
        expect(errors[2].message).toBe('validation failed');
    }));

    it('should expose pending while an async validator is running', fakeAsync(() => {
        let resolveValidation: ((errors: ValidationError | ValidationError[] | null) => void) | undefined;
        setFields([
            {
                key: 'code',
                kind: 'input',
                props: { required: true },
                asyncValidators: [
                    () =>
                        new Promise(resolve => {
                            resolveValidation = resolve;
                        })
                ]
            }
        ]);
        testComponent.statusChanges.length = 0;
        const input = formElement.querySelector('input')!;
        input.value = 'reserved';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(testComponent.dynamicForm().status().pending).toBe(true);
        expect(testComponent.statusChanges.some(status => status.pending)).toBe(true);

        resolveValidation?.({ kind: 'unavailable', message: '该值已被占用' });
        flushMicrotasks();
        fixture.detectChanges();

        expect(testComponent.dynamicForm().status().pending).toBe(false);
        expect(testComponent.dynamicForm().status().invalid).toBe(true);
    }));

    it('should update select disabled state when fields change', fakeAsync(() => {
        const options = [{ value: 'organization-a', label: 'Organization A' }];
        setFields([
            {
                key: 'organization',
                kind: 'select',
                props: { disabled: true, options }
            }
        ]);
        tick();
        fixture.detectChanges();

        expect(testComponent.dynamicForm().getField('organization')().disabled()).toBe(true);
        const updatedSelect = formElement.querySelector('thy-select')!;
        expect(updatedSelect.querySelector('.form-control-custom')?.classList.contains('disabled')).toBe(true);

        testComponent.fields = [{ key: 'organization', kind: 'select', props: { options } }];
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(testComponent.dynamicForm().getField('organization')().disabled()).toBe(false);
        expect(updatedSelect.querySelector('.form-control-custom')?.classList.contains('disabled')).toBe(false);
    }));

    it('should update select options from fields without rebuilding the form or changing its value', () => {
        setFields([{ key: 'project', kind: 'select', props: { options: [] } }]);
        const fieldTree = testComponent.dynamicForm().fieldTree;
        const projectField = testComponent.dynamicForm().getField('project');
        const select = fixture.debugElement.query(By.directive(ThySelect)).componentInstance as ThySelect;
        testComponent.valueChanges.length = 0;

        testComponent.fields = [
            {
                key: 'project',
                kind: 'select',
                props: { options: [{ value: 'project-a', label: 'Project A' }] }
            }
        ];
        fixture.detectChanges();

        expect(select.thyOptions()).toEqual([{ value: 'project-a', label: 'Project A' }]);
        expect(testComponent.dynamicForm().fieldTree).toBe(fieldTree);
        expect(testComponent.dynamicForm().getField('project')).toBe(projectField);
        expect(testComponent.value).toEqual({ project: null });
        expect(testComponent.valueChanges).toEqual([]);
    });

    it('should disable a field when disabled is true', () => {
        setFields([
            { key: 'role', kind: 'select', props: { options: [{ value: 'dev', label: '开发' }] } },
            { key: 'title', kind: 'input', props: { disabled: true } }
        ]);
        setValue({ role: 'dev', title: '工程师' });
        const titleInput = formElement.querySelector<HTMLInputElement>('#title');
        expect(testComponent.dynamicForm().getField('title')().disabled()).toBe(true);
        expect(titleInput).toBeTruthy();
        expect(titleInput?.disabled).toBe(true);
    });

    it('should update field behavior without rebuilding the form', fakeAsync(() => {
        setFields([{ key: 'name', kind: 'input', props: { label: '名称' } }]);
        const fieldTree = testComponent.dynamicForm().fieldTree;
        const nameField = testComponent.dynamicForm().getField('name');

        testComponent.fields = [{ key: 'name', kind: 'input', props: { label: '名称', required: true, disabled: true, readonly: true } }];
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(testComponent.dynamicForm().fieldTree).toBe(fieldTree);
        expect(testComponent.dynamicForm().getField('name')).toBe(nameField);
        expect(nameField().required()).toBe(true);
        expect(nameField().disabled()).toBe(true);
        expect(nameField().readonly()).toBe(true);
        const input = formElement.querySelector('input')!;
        expect(input.required).toBe(true);
        expect(input.disabled).toBe(true);
        expect(input.readOnly).toBe(true);

        testComponent.fields = [{ key: 'name', kind: 'input', props: { label: '名称' } }];
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(nameField().required()).toBe(false);
        expect(nameField().disabled()).toBe(false);
        expect(nameField().readonly()).toBe(false);
        expect(input.required).toBe(false);
        expect(input.disabled).toBe(false);
        expect(input.readOnly).toBe(false);
    }));

    it('should replace the whole form value', () => {
        setFields([
            { key: 'role', kind: 'select', props: { options: [{ value: 'dev', label: '开发' }] } },
            { key: 'title', kind: 'input' }
        ]);
        setValue({ role: 'dev', title: '初级' });
        setValue({ role: null, title: '工程师' });
        expect(testComponent.dynamicForm().getField('role')().value()).toBeNull();
        expect(testComponent.dynamicForm().getField('title')().value()).toBe('工程师');
    });

    it('should not overwrite an in-progress value with an echoed value', () => {
        setFields([{ key: 'name', kind: 'input' }]);
        const input = formElement.querySelector('input')!;
        input.value = 'Ada';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        setValue({ name: 'Ada' });
        expect(input.value).toBe('Ada');
        expect(formElement.querySelector('input')).toBe(input);
    });

    it('should update the model immediately when debounce is not set', () => {
        setFields([{ key: 'name', kind: 'input' }]);
        const input = formElement.querySelector('input')!;
        input.value = 'Ada';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        expect(testComponent.dynamicForm().getField('name')().value()).toBe('Ada');
    });

    it('should update the model after a numeric debounce', fakeAsync(() => {
        setFields([{ key: 'name', kind: 'input', debounce: 300 }]);
        const input = formElement.querySelector('input')!;
        input.value = 'Ada';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        expect(testComponent.dynamicForm().getField('name')().value()).toBe('');

        tick(300);
        fixture.detectChanges();
        expect(testComponent.dynamicForm().getField('name')().value()).toBe('Ada');
    }));

    it('should update and show errors after blur when debounce is blur', () => {
        setFields([{ key: 'name', kind: 'input', debounce: 'blur', props: { required: true, minlength: 2 } }]);
        const input = formElement.querySelector('input')!;
        input.value = 'a';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        expect(testComponent.dynamicForm().getField('name')().value()).toBe('');
        expect(formElement.querySelector('.invalid-feedback')).toBeFalsy();

        dispatchFakeEvent(input, 'blur');
        fixture.detectChanges();
        expect(testComponent.dynamicForm().getField('name')().value()).toBe('a');
        expect(formElement.querySelector('.invalid-feedback')).toBeTruthy();
    });

    it('should apply form size to input and textarea', () => {
        setFields([
            { key: 'name', kind: 'input' },
            { key: 'bio', kind: 'textarea' }
        ]);
        testComponent.size = 'sm';
        fixture.detectChanges();
        expect(formElement.querySelector('input')?.classList.contains('form-control-sm')).toBe(true);
        expect(formElement.querySelector('textarea')?.classList.contains('form-control-sm')).toBe(true);
    });

    it('should reset values to defaultValue or empty and clear displayed errors', () => {
        setFields([
            { key: 'name', kind: 'input', defaultValue: 'Ada', props: { required: true } },
            {
                key: 'title',
                kind: 'input',
                errorMessages: { required: '请填写职称' },
                props: { required: true }
            },
            { key: 'bio', kind: 'textarea' },
            { key: 'role', kind: 'select', props: { options: [{ value: 'dev', label: '开发' }] } },
            {
                key: 'tags',
                kind: 'select',
                defaultValue: ['a'],
                props: { multiple: true, options: [{ value: 'a', label: 'A' }] }
            }
        ]);
        setValue({ name: 'Lin', title: '工程师', bio: 'hi', role: 'dev', tags: ['a'] });
        testComponent.dynamicForm().getField('title')().value.set('');
        fixture.detectChanges();
        fixture.debugElement.query(By.css('#submit')).nativeElement.click();
        fixture.detectChanges();
        expect(formElement.querySelector('.invalid-feedback')?.textContent).toContain('请填写职称');

        testComponent.valueChanges.length = 0;
        testComponent.dynamicForm().reset();
        fixture.detectChanges();

        const form = testComponent.dynamicForm().fieldTree;
        expect(form().value()).toEqual({ name: 'Ada', title: '', bio: '', role: null, tags: ['a'] });
        expect(testComponent.dynamicForm().getField('title')().dirty()).toBe(false);
        expect(testComponent.dynamicForm().getField('title')().touched()).toBe(false);
        expect(formElement.querySelector('.invalid-feedback')).toBeFalsy();
        expect(formElement.querySelector('.is-invalid')).toBeFalsy();
        expect((formElement.querySelector('#name') as HTMLInputElement).value).toBe('Ada');
        expect((formElement.querySelector('#title') as HTMLInputElement).value).toBe('');
        expect(testComponent.valueChanges.at(-1)).toEqual({ name: 'Ada', title: '', bio: '', role: null, tags: ['a'] });
    });

    it('should reset to defaultValue when a reset button is clicked', () => {
        setFields([
            { key: 'name', kind: 'input', defaultValue: 'Ada', props: { required: true } },
            {
                key: 'title',
                kind: 'input',
                errorMessages: { required: '请填写职称' },
                props: { required: true }
            }
        ]);
        setValue({ name: 'Lin', title: '' });
        fixture.debugElement.query(By.css('#submit')).nativeElement.click();
        fixture.detectChanges();
        expect(formElement.querySelector('.invalid-feedback')).toBeTruthy();

        testComponent.valueChanges.length = 0;
        fixture.debugElement.query(By.css('#reset')).nativeElement.click();
        fixture.detectChanges();

        expect(testComponent.dynamicForm().fieldTree().value()).toEqual({ name: 'Ada', title: '' });
        expect(testComponent.dynamicForm().getField('title')().dirty()).toBe(false);
        expect(formElement.querySelector('.invalid-feedback')).toBeFalsy();
        expect((formElement.querySelector('#name') as HTMLInputElement).value).toBe('Ada');
        expect(testComponent.valueChanges.at(-1)).toEqual({ name: 'Ada', title: '' });
    });

    it('should clear change errors and keep a disabled field disabled after reset', () => {
        setFields([
            { key: 'name', kind: 'input', props: { required: true, minlength: 2 } },
            { key: 'title', kind: 'input', defaultValue: '初级', props: { disabled: true } }
        ]);
        const input = formElement.querySelector('#name') as HTMLInputElement;
        input.value = 'a';
        dispatchFakeEvent(input, 'input');
        dispatchFakeEvent(input, 'blur');
        fixture.detectChanges();
        expect(formElement.querySelector('.invalid-feedback')).toBeTruthy();

        testComponent.dynamicForm().getField('title')().value.set('工程师');
        testComponent.dynamicForm().reset();
        fixture.detectChanges();

        const form = testComponent.dynamicForm().fieldTree;
        expect(testComponent.dynamicForm().getField('name')().value()).toBe('');
        expect(testComponent.dynamicForm().getField('name')().dirty()).toBe(false);
        expect(testComponent.dynamicForm().getField('title')().value()).toBe('初级');
        expect(testComponent.dynamicForm().getField('title')().disabled()).toBe(true);
        expect(formElement.querySelector('.invalid-feedback')).toBeFalsy();
        expect(formElement.querySelector('.is-invalid')).toBeFalsy();
    });

    it('should render field col on thy-col using a 12-column grid', () => {
        setFields([
            { key: 'email', kind: 'input', col: 6, props: { label: '邮箱' } },
            { key: 'age', kind: 'input', col: 6, props: { label: '年龄' } },
            { key: 'bio', kind: 'textarea', props: { label: '简介' } }
        ]);
        expect(formElement.querySelectorAll('thy-form-group.thy-col-12').length).toBe(2);
        expect(formElement.querySelectorAll('thy-form-group.thy-col-24').length).toBe(1);
        formElement.querySelectorAll('thy-form-group').forEach(group => {
            expect(group.classList.contains('row')).toBe(false);
        });
        expect(formElement.querySelector('.col-sm-2')).toBeNull();
        expect(formElement.querySelector('.offset-sm-2')).toBeNull();
    });
});

describe('dynamic-form standalone', () => {
    it('should resolve ThyFormValidatorLoader from the component when ThyFormModule is not imported', fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [bypassSanitizeProvider, provideHttpClient(), provideNoopAnimations()]
        }).compileComponents();
        injectDefaultSvgIconSet();
        const fixture = TestBed.createComponent(TestDynamicFormComponent);
        fixture.componentInstance.fields = [{ key: 'name', kind: 'input', props: { required: true } }];
        fixture.componentInstance.value = { name: '' };
        fixture.detectChanges();
        tick();
        fixture.debugElement.query(By.css('#submit')).nativeElement.click();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.invalid-feedback')?.textContent).toBeTruthy();
    }));
});
