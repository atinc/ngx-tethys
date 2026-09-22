import { provideHttpClient } from '@angular/common/http';
import { Component, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ThyButton } from 'ngx-tethys/button';
import {
    ThyDynamicForm,
    ThyDynamicFormFieldConfig,
    ThyDynamicFormSubmitEvent,
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

    fields: ThyDynamicFormFieldConfig[] = [];

    value: ThyDynamicFormValue | undefined;

    size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

    valueChanges: ThyDynamicFormValue[] = [];

    fieldValueChanges: { key: string; value: unknown }[] = [];

    submits: ThyDynamicFormSubmitEvent[] = [];

    onValueChange(value: ThyDynamicFormValue) {
        this.valueChanges.push(value);
    }

    onFieldValueChange(event: { key: string; value: unknown }) {
        this.fieldValueChanges.push(event);
    }

    onSubmit(event: ThyDynamicFormSubmitEvent) {
        this.submits.push(event);
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

    function setFields(fields: ThyDynamicFormFieldConfig[]) {
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

    it('should show required error after submit and still emit thySubmit', () => {
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

        expect(testComponent.submits).toEqual([{ value: { name: '' }, valid: false }]);
        expect(formElement.textContent).toContain('请填写名称');
        expect(formElement.querySelector('input')?.classList.contains('is-invalid')).toBe(true);
        expect(formElement.querySelector('.invalid-feedback')?.textContent).toBe('请填写名称');
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

    it('should not use validator payload when loader has a message', () => {
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
    });

    it('should apply a custom function validator', () => {
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
    });

    it('should show custom validator payload when the validator returns a Promise', () => {
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
    });

    it('should disable a field when disabled is true', () => {
        setFields([
            { key: 'role', kind: 'select', props: { options: [{ value: 'dev', label: '开发' }] } },
            { key: 'title', kind: 'input', disabled: true }
        ]);
        setValue({ role: 'dev', title: '工程师' });
        const titleInput = formElement.querySelector('input');
        expect(titleInput).toBeTruthy();
        expect(titleInput?.disabled).toBe(true);
    });

    it('should keep the same input element when fields is a deep-equal clone', () => {
        const fields: ThyDynamicFormFieldConfig[] = [{ key: 'name', kind: 'input', props: { label: '名称' } }];
        setFields(fields);
        const input = formElement.querySelector('input');
        expect(input).toBeTruthy();
        setFields(JSON.parse(JSON.stringify(fields)));
        expect(formElement.querySelector('input')).toBe(input);
    });

    it('should keep a selected value after fields clone and echoed value', () => {
        const fields: ThyDynamicFormFieldConfig[] = [
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

    it('should render field col on thy-col using a 12-column grid', () => {
        setFields([
            { key: 'email', kind: 'input', col: 6, props: { label: '邮箱' } },
            { key: 'age', kind: 'input', col: 6, props: { label: '年龄' } },
            { key: 'bio', kind: 'textarea', props: { label: '简介' } }
        ]);
        expect(formElement.querySelectorAll('.thy-col-12').length).toBe(2);
        expect(formElement.querySelectorAll('.thy-col-24').length).toBe(1);
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
