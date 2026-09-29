import { provideHttpClient } from '@angular/common/http';
import { Component, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ThyButton } from 'ngx-tethys/button';
import {
    ThyDynamicForm,
    ThyFormFieldConfig,
    ThyDynamicFormValue,
    ThyFormModule,
    ThyFormValidatorLoader
} from 'ngx-tethys/form';
import { bypassSanitizeProvider, dispatchFakeEvent, injectDefaultSvgIconSet } from 'ngx-tethys/testing';

@Component({
    selector: 'thy-test-dynamic-form',
    template: `
        <thy-dynamic-form
            [thyFields]="fields"
            [thyValue]="value"
            [thySize]="size"
            (thyValueChange)="onValueChange($event)"
            (thyFieldValueChange)="onFieldValueChange($event)"
            (thySubmit)="onSubmit($event)">
            <button id="submit" type="submit" [thyButton]="'primary'">Save</button>
        </thy-dynamic-form>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDynamicForm, ThyButton]
})
class TestDynamicFormComponent {
    readonly dynamicForm = viewChild.required(ThyDynamicForm);

    fields: ThyFormFieldConfig[] = [];

    value: ThyDynamicFormValue | undefined;

    size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

    valueChanges: ThyDynamicFormValue[] = [];

    fieldValueChanges: { key: string; value: unknown }[] = [];

    submits: ThyDynamicFormValue[] = [];

    onValueChange(value: ThyDynamicFormValue) {
        this.valueChanges.push(value);
    }

    onFieldValueChange(event: { key: string; value: unknown }) {
        this.fieldValueChanges.push(event);
    }

    onSubmit(value: ThyDynamicFormValue) {
        this.submits.push(value);
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
        fixture = TestBed.createComponent(TestDynamicFormComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        formElement = fixture.debugElement.query(By.css('form')).nativeElement;
        tick();
    }));

    function setFields(fields: ThyFormFieldConfig[]) {
        testComponent.fields = fields;
        fixture.detectChanges();
    }

    function setValue(value: ThyDynamicFormValue) {
        testComponent.value = value;
        fixture.detectChanges();
    }

    it('should apply defaultValue when value is not set', () => {
        setFields([{ key: 'name', kind: 'input', defaultValue: 'Ada' }]);
        expect(formElement.querySelector('input')?.value).toBe('Ada');
    });

    it('should not emit thyValueChange when value is written', () => {
        setFields([{ key: 'name', kind: 'input', defaultValue: 'Ada' }]);
        setValue({ name: 'Lin' });
        expect(testComponent.valueChanges.length).toBe(0);
        expect(formElement.querySelector('input')?.value).toBe('Lin');
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
        setValue({});

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
        setValue({});
        fixture.debugElement.query(By.css('#submit')).nativeElement.click();
        fixture.detectChanges();
        const loader = TestBed.inject(ThyFormValidatorLoader);
        const message = formElement.querySelector('.invalid-feedback')?.textContent?.trim();
        expect(message).toBe(loader.getErrorMessage('name', 'required'));
        expect(formElement.querySelector('input')?.classList.contains('is-invalid')).toBe(true);
    });

    it('should interpolate loader minlength message', () => {
        setFields([{ key: 'name', kind: 'input', updateOn: 'change', props: { minlength: 2 } }]);
        const input = formElement.querySelector('input')!;
        input.value = 'a';
        dispatchFakeEvent(input, 'input');
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
                validators: [ctx => (ctx.value ? null : { required: 'from validator' })]
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
                        return value === 'ok' ? null : { codeIsOk: '必须输入 ok' };
                    }
                ]
            }
        ]);
        const input = formElement.querySelector('input')!;
        input.value = 'no';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        tick();
        fixture.debugElement.query(By.css('#submit')).nativeElement.click();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(formElement.textContent).toContain('必须输入 ok');
        expect(formElement.querySelector('input')?.classList.contains('is-invalid')).toBe(true);
    }));

    it('should show custom validator payload when the validator returns a Promise', fakeAsync(() => {
        setFields([
            {
                key: 'code',
                kind: 'input',
                updateOn: 'change',
                validators: [
                    ctx => {
                        const value = String(ctx.value ?? '');
                        if (!value) {
                            return Promise.resolve(null);
                        }
                        return Promise.resolve(value === 'ok' ? null : { codeIsOk: '必须输入 ok' });
                    }
                ]
            }
        ]);
        const input = formElement.querySelector('input')!;
        input.value = 'no';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(formElement.textContent).toContain('必须输入 ok');
        expect(formElement.querySelector('input')?.classList.contains('is-invalid')).toBe(true);
    }));

    it('should disable a select when disabled changes to true', () => {
        setFields([
            {
                key: 'organization',
                kind: 'select',
                props: { options: [{ value: 'organization-a', label: 'Organization A' }] }
            }
        ]);
        const select = formElement.querySelector('thy-select')!;
        expect(select.querySelector('.form-control-custom.disabled')).toBeFalsy();

        setFields([
            {
                key: 'organization',
                kind: 'select',
                props: { disabled: true, options: [{ value: 'organization-a', label: 'Organization A' }] }
            }
        ]);

        expect(testComponent.dynamicForm().formGroup.get('organization')?.disabled).toBe(true);
        expect(select.querySelector('.form-control-custom')?.classList.contains('disabled')).toBe(true);
    });

    it('should disable a field when disabled is true', () => {
        setFields([
            { key: 'role', kind: 'select', props: { options: [{ value: 'dev', label: '开发' }] } },
            { key: 'title', kind: 'input', props: { disabled: true } }
        ]);
        setValue({ role: 'dev', title: '工程师' });
        const titleInput = formElement.querySelector<HTMLInputElement>('input[name="title"]');
        expect(testComponent.dynamicForm().formGroup.get('title')?.disabled).toBe(true);
        expect(titleInput).toBeTruthy();
        expect(titleInput?.disabled).toBe(true);
    });

    it('should reuse the form control when fields is a deep-equal clone', () => {
        const fields: ThyFormFieldConfig[] = [{ key: 'name', kind: 'input', props: { label: '名称' } }];
        setFields(fields);
        const control = testComponent.dynamicForm().formGroup.get('name');
        const input = formElement.querySelector('input');
        setFields(JSON.parse(JSON.stringify(fields)));
        expect(testComponent.dynamicForm().formGroup.get('name')).toBe(control);
        expect(formElement.querySelector('input')).toBe(input);
    });

    it('should keep a selected value after fields clone and echoed value', () => {
        const fields: ThyFormFieldConfig[] = [
            {
                key: 'role',
                kind: 'select',
                props: {
                    label: '角色',
                    options: [
                        { value: 'dev', label: '开发' },
                        { value: 'pm', label: '产品' }
                    ]
                }
            },
            {
                key: 'projectId',
                kind: 'select',
                props: { label: '项目', options: [] }
            }
        ];
        setFields(fields);
        const role = testComponent.dynamicForm().formGroup.get('role');
        role.setValue('dev');
        fixture.detectChanges();
        expect(testComponent.valueChanges[testComponent.valueChanges.length - 1]).toEqual({ role: 'dev', projectId: null });

        setFields(
            fields.map(field =>
                field.key === 'projectId' && field.kind === 'select'
                    ? { ...field, props: { ...field.props, options: [{ value: 'p1', label: '项目 1' }] } }
                    : field
            )
        );
        setValue({ role: 'dev', projectId: null });
        expect(testComponent.dynamicForm().formGroup.get('role').value).toBe('dev');
    });

    it('should replace the whole form value instead of merging missing keys', () => {
        setFields([
            { key: 'role', kind: 'select', props: { options: [{ value: 'dev', label: '开发' }] } },
            { key: 'title', kind: 'input' }
        ]);
        setValue({ role: 'dev', title: '初级' });
        setValue({ title: '工程师' });
        expect(testComponent.dynamicForm().formGroup.get('role').value).toBeNull();
        expect(testComponent.dynamicForm().formGroup.get('title').value).toBe('工程师');
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

    it('should wait for submit when field updateOn is submit', () => {
        setFields([{ key: 'name', kind: 'input', updateOn: 'submit', props: { required: true, minlength: 2 } }]);
        const input = formElement.querySelector('input')!;
        input.value = 'a';
        dispatchFakeEvent(input, 'input');
        dispatchFakeEvent(input, 'blur');
        fixture.detectChanges();
        expect(formElement.textContent).not.toContain('至少');

        fixture.debugElement.query(By.css('#submit')).nativeElement.click();
        fixture.detectChanges();
        expect(formElement.querySelector('.invalid-feedback')).toBeTruthy();
    });

    it('should show error on change when updateOn is change', () => {
        setFields([{ key: 'name', kind: 'input', updateOn: 'change', props: { required: true, minlength: 2 } }]);
        setValue({ name: '' });
        expect(formElement.querySelector('.invalid-feedback')).toBeFalsy();

        const input = formElement.querySelector('input')!;
        input.value = 'a';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        expect(formElement.querySelector('.invalid-feedback')).toBeTruthy();
    });

    it('should wait for blur when updateOn is blur', () => {
        setFields([{ key: 'name', kind: 'input', updateOn: 'blur', props: { required: true, minlength: 2 } }]);
        const input = formElement.querySelector('input')!;
        input.value = 'a';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        expect(formElement.querySelector('.invalid-feedback')).toBeFalsy();

        dispatchFakeEvent(input, 'blur');
        fixture.detectChanges();
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
        testComponent.dynamicForm().formGroup.get('title')!.setValue('');
        fixture.detectChanges();
        fixture.debugElement.query(By.css('#submit')).nativeElement.click();
        fixture.detectChanges();
        expect(formElement.querySelector('.invalid-feedback')?.textContent).toContain('请填写职称');

        testComponent.valueChanges.length = 0;
        testComponent.dynamicForm().reset();
        fixture.detectChanges();

        const form = testComponent.dynamicForm().formGroup;
        expect(form.getRawValue()).toEqual({ name: 'Ada', title: '', bio: '', role: null, tags: ['a'] });
        expect(form.get('title')?.pristine).toBe(true);
        expect(form.get('title')?.untouched).toBe(true);
        expect(formElement.querySelector('.invalid-feedback')).toBeFalsy();
        expect(formElement.querySelector('.is-invalid')).toBeFalsy();
        expect((formElement.querySelector('input[name="name"]') as HTMLInputElement).value).toBe('Ada');
        expect((formElement.querySelector('input[name="title"]') as HTMLInputElement).value).toBe('');
        expect(testComponent.valueChanges.at(-1)).toEqual({ name: 'Ada', title: '', bio: '', role: null, tags: ['a'] });
    });

    it('should clear change errors and keep a disabled field disabled after reset', () => {
        setFields([
            { key: 'name', kind: 'input', updateOn: 'change', props: { required: true, minlength: 2 } },
            { key: 'title', kind: 'input', defaultValue: '初级', props: { disabled: true } }
        ]);
        const input = formElement.querySelector('input[name="name"]') as HTMLInputElement;
        input.value = 'a';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        expect(formElement.querySelector('.invalid-feedback')).toBeTruthy();

        testComponent.dynamicForm().formGroup.get('title')!.setValue('工程师');
        testComponent.dynamicForm().reset();
        fixture.detectChanges();

        const form = testComponent.dynamicForm().formGroup;
        expect(form.get('name')?.value).toBe('');
        expect(form.get('name')?.dirty).toBe(false);
        expect(form.get('title')?.value).toBe('初级');
        expect(form.get('title')?.disabled).toBe(true);
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
        fixture.componentInstance.value = {};
        fixture.detectChanges();
        tick();
        fixture.debugElement.query(By.css('#submit')).nativeElement.click();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.invalid-feedback')?.textContent).toBeTruthy();
    }));
});
