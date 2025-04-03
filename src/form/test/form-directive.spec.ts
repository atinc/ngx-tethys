import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyLayoutModule } from 'ngx-tethys/layout';
import { ThySelectModule } from 'ngx-tethys/select';
import { dispatchFakeEvent, dispatchKeyboardEvent } from 'ngx-tethys/testing';
import { keycodes } from 'ngx-tethys/util';

import { CommonModule } from '@angular/common';
import { Component, DebugElement, inject } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ThyFormSubmitDirective } from '../form-submit.directive';
import { THY_FORM_CONFIG, ThyFormValidatorConfig } from '../form.class';
import { ThyEnterKeyMode, ThyFormDirective } from '../form.directive';
import { ThyFormModule } from '../module';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'app-test-basic-form',
    template: ` <form thyForm [thyLayout]="thyLayout"></form> `
})
export class TestFormBasicDirectiveComponent {
    thyLayout = '';
}

@Component({
    selector: 'app-test-form-full',
    template: `
        @if (loadingDone) {
            <form
                thyForm
                name="demoForm"
                [thyFormValidatorConfig]="validateConfig"
                [thyEnterKeyMode]="enterKeyMode"
                class="myForm"
                #demoForm="thyForm">
                <thy-form-group thyLabelRequired>
                    <input thyInput name="username" [(ngModel)]="model.name" required placeholder="please input description" />
                </thy-form-group>
                <thy-form-group thyLabelRequired>
                    <textarea
                        thyInput
                        name="description"
                        required
                        [(ngModel)]="model.description"
                        placeholder="please input description"></textarea>
                </thy-form-group>
                <thy-form-group thyLabelRequired>
                    <input
                        thyInput
                        name="age"
                        type="number"
                        [(ngModel)]="model.age"
                        max="10"
                        min="0"
                        required
                        placeholder="please input age" />
                </thy-form-group>
                <thy-form-group-footer>
                    <button [thyButton]="'primary'" thyLoadingText="确定" thyFormSubmit (thyFormSubmit)="submit()">登录</button>
                </thy-form-group-footer>
            </form>
        }
    `
})
export class TestFormFullComponent {
    model = {
        name: '',
        description: 'default',
        age: 5
    };

    loadingDone = true;

    enterKeyMode: ThyEnterKeyMode;

    validateConfig: ThyFormValidatorConfig = {
        validationMessages: {
            username: {
                required: 'user name is required'
            }
        }
    };

    submit() {}
}

@Component({
    selector: 'app-test-reactive',
    template: `
        @if (loadingDone) {
            <form
                thyForm
                name="demoForm"
                #demoForm="thyForm"
                thyLayout="horizontal"
                [thyFormValidatorConfig]="validateConfig"
                [formGroup]="formGroup">
                <thy-form-group thyLabelText="age" thyLayout="horizontal" thyLabelRequired>
                    <input
                        thyInput
                        type="number"
                        name="age"
                        formControlName="age"
                        max="10"
                        min="0"
                        required
                        placeholder="please input age" />
                </thy-form-group>
                <thy-form-group thyLabelText="CustomerSelect">
                    <thy-select
                        thyPlaceHolder="请选择"
                        formControlName="customersSelect"
                        name="customersSelect"
                        [thyShowSearch]="true"
                        [thyAllowClear]="true">
                        @for (option of listOfOption; track option.value) {
                            <thy-option [thyValue]="option.value" [thyLabelText]="option.text"> </thy-option>
                        }
                    </thy-select>
                </thy-form-group>
                <thy-form-group thyLabelText="Textarea">
                    <textarea name="textarea" formControlName="textarea" class="form-control" rows="3"></textarea>
                </thy-form-group>
                <thy-form-group>
                    <ng-template #content>
                        <textarea name="username" formControlName="username" class="form-control" rows="3"></textarea>
                    </ng-template>
                </thy-form-group>
                <thy-form-group-footer>
                    <button [thyButton]="'primary'" (thyFormSubmit)="submit()"></button>
                    <button [thyButton]="'link-secondary'">Cancel</button>
                </thy-form-group-footer>
            </form>
        }
    `
})
export class TestFormReactiveComponent {
    private formBuilder = inject(FormBuilder);

    formGroup = this.formBuilder.group({
        age: [0],
        username: ['', [Validators.required]],
        customersSelect: [''],
        textarea: ['']
    });

    loadingDone = true;

    listOfOption = [
        { value: 'option1', text: '选项一' },
        { value: 'option2', text: '选项二' }
    ];

    validateConfig: ThyFormValidatorConfig = {
        validationMessages: {
            username: {
                required: 'user name is required'
            }
        }
    };

    submit() {}
}

describe('form basic directive', () => {
    let fixture: ComponentFixture<TestFormBasicDirectiveComponent>;
    let basicTestComponent: TestFormBasicDirectiveComponent;
    let debugElement: DebugElement;
    let formElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestFormBasicDirectiveComponent],
            imports: [ThyFormModule, FormsModule, ThyLayoutModule],
            providers: [provideHttpClient()]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestFormBasicDirectiveComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(ThyFormDirective));
        formElement = debugElement.nativeElement;
    });

    it('should get correct class', () => {
        fixture.detectChanges();
        expect(formElement.classList.contains('thy-form')).toBe(true);
        expect(formElement.classList.contains('thy-form-horizontal')).toBe(true);
    });

    it('should get correct class when layout is horizontal, vertical or inline', () => {
        ['horizontal', 'vertical', 'inline'].forEach(layout => {
            basicTestComponent.thyLayout = layout;
            fixture.detectChanges();
            expect(formElement.classList.contains('thy-form')).toBe(true);
            expect(formElement.classList.contains(`thy-form-${layout}`)).toBe(
                true,
                `layout is ${layout}, classList is ${formElement.classList}`
            );
        });
    });
});

describe('form directive global config', () => {
    let fixture: ComponentFixture<TestFormBasicDirectiveComponent>;
    let basicTestComponent: TestFormBasicDirectiveComponent;
    let debugElement: DebugElement;
    let formElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyFormModule, FormsModule, ThyLayoutModule],
            declarations: [TestFormBasicDirectiveComponent],
            providers: [
                provideHttpClient(),
                {
                    provide: THY_FORM_CONFIG,
                    useValue: {
                        layout: 'vertical'
                    }
                }
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestFormBasicDirectiveComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(ThyFormDirective));
        formElement = debugElement.nativeElement;
    });

    it('should get correct class for global layout is vertical', () => {
        fixture.detectChanges();
        expect(formElement.classList.contains('thy-form')).toBe(true);
        expect(formElement.classList.contains('thy-form-vertical')).toBe(true);
    });

    it('should get correct class when layout is horizontal, vertical or inline', () => {
        ['horizontal', 'vertical', 'inline'].forEach(layout => {
            basicTestComponent.thyLayout = layout;
            fixture.detectChanges();
            expect(formElement.classList.contains('thy-form')).toBe(true);
            expect(formElement.classList.contains(`thy-form-${layout}`)).toBe(true);
        });
    });
});

describe('form validate', () => {
    let fixture: ComponentFixture<TestFormFullComponent>;
    let testComponent: TestFormFullComponent;
    let formDebugElement: DebugElement;
    let formDirective: ThyFormDirective;
    let formElement: HTMLElement;
    let formSubmitDebugElement: DebugElement;

    function focusTextarea() {
        const descriptionElement: HTMLInputElement = formElement.querySelector('[name=description]');
        descriptionElement.focus();
    }

    function getUserNameInput(): HTMLInputElement {
        return formElement.querySelector('[name=username]');
    }

    function assertElementInvalidError(elementName: string, message: string = `user name is required`) {
        const input = formElement.querySelector(`[name=${elementName}`);
        let invalidFeedbackElement = input.parentElement.querySelector('.invalid-feedback');
        expect(invalidFeedbackElement).toBeTruthy();
        expect(invalidFeedbackElement.textContent).toContain(message);
    }

    function assertFormValid() {
        const invalidFeedbackElement = formElement.querySelector('.invalid-feedback');
        expect(invalidFeedbackElement).toBeFalsy();
        expect(formDirective.validator.errors).toEqual([]);
        expect(formDirective['ngForm'].errors).toBeFalsy();
        expect(formDirective['ngForm'].invalid).toEqual(false);
        expect(formDirective['ngForm'].valid).toEqual(true);
    }

    function assertFormDefaultState() {
        const invalidFeedbackElement = formElement.querySelector('.invalid-feedback');
        expect(invalidFeedbackElement).toBeFalsy();
        expect(formDirective.validator.errors).toEqual([]);
        expect(formDirective['ngForm'].errors).toEqual(null);
        expect(formDirective['ngForm'].invalid).toEqual(true);
        expect(formDirective['ngForm'].valid).toEqual(false);
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestFormFullComponent],
            imports: [CommonModule, FormsModule, ThyFormModule, ThyLayoutModule, ThyButtonModule, ThyInputModule],
            providers: [provideHttpClient()]
        });

        TestBed.compileComponents();
    });

    beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(TestFormFullComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        tick();
        formDebugElement = fixture.debugElement.query(By.directive(ThyFormDirective));
        formDirective = formDebugElement.injector.get(ThyFormDirective);
        formElement = formDebugElement.nativeElement;
        formSubmitDebugElement = fixture.debugElement.query(By.directive(ThyFormSubmitDirective));
    }));

    it('should create controls success', fakeAsync(() => {
        expect(formDirective.validator.validations).toEqual({});
        const controls = (formDirective['ngForm'] as NgForm).controls;
        expect(controls).toBeTruthy();
        const nameControl = controls['username'];
        expect(nameControl).toBeTruthy();
    }));

    it('should create validations success when validateOn was blur', fakeAsync(async () => {
        testComponent.loadingDone = false;
        testComponent.validateConfig.validateOn = 'blur';
        fixture.detectChanges();
        testComponent.loadingDone = true;
        fixture.detectChanges();
        let input;

        testComponent.model.age = -1;
        fixture.detectChanges();
        tick();
        formElement = fixture.debugElement.query(By.directive(ThyFormDirective)).nativeElement;
        input = formElement.querySelector('[name=age]');
        dispatchFakeEvent(input, 'blur');
        assertElementInvalidError('age', `该选项输入值不能小于0`);

        testComponent.model.age = 1;
        fixture.detectChanges();
        tick();
        formElement = fixture.debugElement.query(By.directive(ThyFormDirective)).nativeElement;
        input = formElement.querySelector('[name=age]');
        dispatchFakeEvent(input, 'blur');
        assertFormValid();

        testComponent.model.age = 11;
        fixture.detectChanges();
        tick();
        formElement = fixture.debugElement.query(By.directive(ThyFormDirective)).nativeElement;
        input = formElement.querySelector('[name=age]');
        dispatchFakeEvent(input, 'blur');
        assertElementInvalidError('age', `该选项输入值不能大于10`);
    }));

    it('should create validations success when validateOn was change', fakeAsync(async () => {
        testComponent.loadingDone = false;
        testComponent.validateConfig.validateOn = 'change';
        fixture.detectChanges();
        testComponent.loadingDone = true;
        fixture.detectChanges();
        let input;

        testComponent.model.age = -1;
        fixture.detectChanges();
        tick(100);
        fixture.detectChanges();
        formElement = fixture.debugElement.query(By.directive(ThyFormDirective)).nativeElement;
        input = formElement.querySelector('[name=age]');
        fixture.detectChanges();
        assertElementInvalidError('age', `该选项输入值不能小于0`);

        testComponent.model.age = 11;
        fixture.detectChanges();
        tick(100);
        fixture.detectChanges();
        formElement = fixture.debugElement.query(By.directive(ThyFormDirective)).nativeElement;
        input = formElement.querySelector('[name=age]');
        fixture.detectChanges();
        assertElementInvalidError('age', `该选项输入值不能大于10`);

        testComponent.model.age = 1;
        fixture.detectChanges();
        tick(100);
        fixture.detectChanges();
        formElement = fixture.debugElement.query(By.directive(ThyFormDirective)).nativeElement;
        input = formElement.querySelector('[name=age]');
        fixture.detectChanges();
        assertFormValid();
    }));

    it('should submit success when click submit button', fakeAsync(() => {
        testComponent.model.name = 'content';
        fixture.detectChanges();
        tick();
        const formSubmitSpy = spyOn(testComponent, 'submit');
        expect(formSubmitDebugElement).toBeTruthy();
        expect(formSubmitSpy).not.toHaveBeenCalled();
        dispatchFakeEvent(formSubmitDebugElement.nativeElement, 'click');
        expect(formSubmitSpy).toHaveBeenCalled();
    }));

    it('should focus error element when click submit button', fakeAsync(() => {
        testComponent.model.name = '';
        fixture.detectChanges();
        tick();
        dispatchFakeEvent(formSubmitDebugElement.nativeElement, 'click');
        const input = formElement.querySelector(`[name=username]`);
        const active = document.activeElement;
        expect(input).toBe(active);
    }));

    it('should get invalid messages when name is empty', fakeAsync(() => {
        dispatchFakeEvent(formSubmitDebugElement.nativeElement, 'click');
        assertElementInvalidError('username', `user name is required`);
    }));

    it('should get correct invalid message for min=0 when age=-1', fakeAsync(() => {
        testComponent.model.age = -1;
        fixture.detectChanges();
        tick();
        dispatchFakeEvent(formSubmitDebugElement.nativeElement, 'click');
        assertElementInvalidError('age', `该选项输入值不能小于0`);
    }));

    it('should get correct invalid message for max=10 when age=-1', fakeAsync(() => {
        testComponent.model.age = 11;
        fixture.detectChanges();
        tick();
        dispatchFakeEvent(formSubmitDebugElement.nativeElement, 'click');
        assertElementInvalidError('age', `该选项输入值不能大于10`);
    }));

    it('should clear error validations after input value', fakeAsync(() => {
        dispatchFakeEvent(formSubmitDebugElement.nativeElement, 'click');
        assertElementInvalidError('username', `user name is required`);
        testComponent.model.name = 'content';
        fixture.detectChanges();
        tick();
        assertFormValid();
    }));

    it('should reset success after validate is error', fakeAsync(() => {
        dispatchFakeEvent(formSubmitDebugElement.nativeElement, 'click');
        assertElementInvalidError('username', `user name is required`);
        formDirective.validator.reset();
        assertFormDefaultState();
    }));

    it('should manual set element error message success', fakeAsync(() => {
        assertFormDefaultState();
        testComponent.model.name = 'content';
        fixture.detectChanges();
        tick();
        assertFormValid();

        const message = 'the name is exist';
        formDirective.validator.setElementErrorMessage('username', message);
        assertElementInvalidError('username', message);
    }));

    describe('validator-service', () => {
        it('should add error success', fakeAsync(() => {
            expect(formDirective.validator.errors).toEqual([]);
            formDirective.validator.addError('this is new error message');
            expect(formDirective.validator.errors).toEqual(['this is new error message']);
        }));

        it('should use global default error message', fakeAsync(() => {
            testComponent.model.description = '';
            fixture.detectChanges();
            tick();
            formDirective.submit(null);
            assertElementInvalidError('description', '该选项不能为空');
        }));
    });

    describe('enter keydown', () => {
        beforeEach(fakeAsync(() => {
            testComponent.model.name = 'content';
            fixture.detectChanges();
            tick();
        }));

        it('should submit success when keydown is enter', fakeAsync(() => {
            const formSubmitSpy = spyOn(testComponent, 'submit');
            expect(formSubmitSpy).not.toHaveBeenCalled();
            dispatchKeyboardEvent(formElement, 'keydown', keycodes.ENTER);
            expect(formSubmitSpy).toHaveBeenCalled();
        }));

        it('should submit fail when keydown is a', fakeAsync(() => {
            const formSubmitSpy = spyOn(testComponent, 'submit');
            expect(formSubmitSpy).not.toHaveBeenCalled();
            dispatchKeyboardEvent(formElement, 'keydown', keycodes.A);
            expect(formSubmitSpy).not.toHaveBeenCalled();
        }));

        it('should submit fail when keydown is enter and mode is submit', fakeAsync(() => {
            testComponent.enterKeyMode = ThyEnterKeyMode.submit;
            const formSubmitSpy = spyOn(testComponent, 'submit');
            expect(formSubmitSpy).not.toHaveBeenCalled();
            dispatchKeyboardEvent(formElement, 'keydown', keycodes.ENTER);
            expect(formSubmitSpy).toHaveBeenCalled();
        }));

        it('should submit fail when keydown is enter and mode is forbidSubmit', fakeAsync(() => {
            testComponent.enterKeyMode = ThyEnterKeyMode.forbidSubmit;
            fixture.detectChanges();
            const formSubmitSpy = spyOn(testComponent, 'submit');
            expect(formSubmitSpy).not.toHaveBeenCalled();
            dispatchKeyboardEvent(formElement, 'keydown', keycodes.ENTER);
            expect(formSubmitSpy).not.toHaveBeenCalled();
        }));

        it('should submit fail when keydown is enter and current input is TEXTAREA', fakeAsync(() => {
            const formSubmitSpy = spyOn(testComponent, 'submit');
            focusTextarea();
            expect(formSubmitSpy).not.toHaveBeenCalled();
            dispatchKeyboardEvent(formElement, 'keydown', keycodes.ENTER);
            expect(formSubmitSpy).not.toHaveBeenCalled();
        }));

        it('should submit success for mode is alwaysSubmit when keydown is enter and current input is TEXTAREA', fakeAsync(() => {
            testComponent.enterKeyMode = ThyEnterKeyMode.alwaysSubmit;
            fixture.detectChanges();
            const formSubmitSpy = spyOn(testComponent, 'submit');
            focusTextarea();
            expect(formSubmitSpy).not.toHaveBeenCalled();
            dispatchKeyboardEvent(formElement, 'keydown', keycodes.ENTER);
            expect(formSubmitSpy).toHaveBeenCalled();
        }));

        it('should submit success when keydown is ctrl + enter and current input is TEXTAREA', fakeAsync(() => {
            const formSubmitSpy = spyOn(testComponent, 'submit');
            focusTextarea();
            expect(formSubmitSpy).not.toHaveBeenCalled();
            dispatchKeyboardEvent(formElement, 'keydown', keycodes.ENTER, '', { control: true });
            expect(formSubmitSpy).toHaveBeenCalled();
        }));

        it('should submit success when keydown is meta + enter and current input is TEXTAREA', fakeAsync(() => {
            const formSubmitSpy = spyOn(testComponent, 'submit');
            focusTextarea();
            expect(formSubmitSpy).not.toHaveBeenCalled();
            dispatchKeyboardEvent(formElement, 'keydown', keycodes.ENTER, '', { meta: true });
            expect(formSubmitSpy).toHaveBeenCalled();
        }));
    });
});

describe('reactive form validate', () => {
    let fixture: ComponentFixture<TestFormReactiveComponent>;
    let testComponent: TestFormReactiveComponent;
    let formDebugElement: DebugElement;
    let formDirective: ThyFormDirective;
    let formElement: HTMLElement;
    let formSubmitDebugElement: DebugElement;

    function assertElementInvalidError(elementName: string, message: string = `user name is required`) {
        const input = formElement.querySelector(`[name=${elementName}`);
        let invalidFeedbackElement = input.parentElement.querySelector('.invalid-feedback');
        expect(invalidFeedbackElement).toBeTruthy();
        expect(invalidFeedbackElement.textContent).toContain(message);
    }

    function assertFormValid() {
        const invalidFeedbackElement = formElement.querySelector('.invalid-feedback');
        expect(invalidFeedbackElement).toBeFalsy();
        expect(formDirective.validator.errors).toEqual([]);
        expect(formDirective['ngForm'].errors).toBeFalsy();
        expect(formDirective['ngForm'].invalid).toEqual(false);
        expect(formDirective['ngForm'].valid).toEqual(true);
    }

    function assertFormDefaultState() {
        const invalidFeedbackElement = formElement.querySelector('.invalid-feedback');
        expect(invalidFeedbackElement).toBeFalsy();
        expect(formDirective.validator.errors).toEqual([]);
        expect(formDirective['ngForm'].errors).toEqual(null);
        expect(formDirective['ngForm'].invalid).toEqual(true);
        expect(formDirective['ngForm'].valid).toEqual(false);
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestFormReactiveComponent],
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                ThyFormModule,
                ThyLayoutModule,
                ThyButtonModule,
                ThyInputModule,
                ThySelectModule
            ],
            providers: [provideHttpClient()]
        });

        TestBed.compileComponents();
    });

    beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(TestFormReactiveComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        tick(500);
        formDebugElement = fixture.debugElement.query(By.directive(ThyFormDirective));
        formDirective = formDebugElement.injector.get(ThyFormDirective);
        formElement = formDebugElement.nativeElement;
        formSubmitDebugElement = fixture.debugElement.query(By.directive(ThyFormSubmitDirective));
    }));

    it('should create controls success', fakeAsync(() => {
        formDirective = formDebugElement.injector.get(ThyFormDirective);
        expect(formDirective.validator.validations).toEqual({});
        const controls = fixture.componentInstance.formGroup.controls;
        expect(controls).toBeTruthy();
        expect(formDirective.controls.length).toEqual(4);
        const ageControl = (fixture.componentInstance.formGroup as FormGroup).getRawValue().age;
        expect(ageControl).toEqual(0);
    }));

    it('should create validations success when validateOn was blur', fakeAsync(async () => {
        testComponent.loadingDone = false;
        testComponent.validateConfig.validateOn = 'blur';
        fixture.detectChanges();
        testComponent.loadingDone = true;
        fixture.detectChanges();
        let input;

        testComponent.formGroup.patchValue({ age: -1, username: '1' });
        fixture.detectChanges();
        tick();
        formElement = fixture.debugElement.query(By.directive(ThyFormDirective)).nativeElement;
        input = formElement.querySelector('[name=age]');
        dispatchFakeEvent(input, 'blur');
        assertElementInvalidError('age', `该选项输入值不能小于0`);

        testComponent.formGroup.patchValue({ age: 1 });
        fixture.detectChanges();
        tick(100);
        formElement = fixture.debugElement.query(By.directive(ThyFormDirective)).nativeElement;
        input = formElement.querySelector('[name=age]');
        dispatchFakeEvent(input, 'blur');
        assertFormValid();

        testComponent.formGroup.patchValue({ age: 11 });
        fixture.detectChanges();
        tick();
        formElement = fixture.debugElement.query(By.directive(ThyFormDirective)).nativeElement;
        input = formElement.querySelector('[name=age]');
        dispatchFakeEvent(input, 'blur');
        assertElementInvalidError('age', `该选项输入值不能大于10`);
    }));

    it('should create validations success when validateOn was change', fakeAsync(async () => {
        testComponent.loadingDone = false;
        testComponent.validateConfig.validateOn = 'change';

        fixture.detectChanges();
        testComponent.loadingDone = true;
        fixture.detectChanges();
        let input;

        testComponent.formGroup.patchValue({ age: -1, username: '1' });
        tick(100);
        fixture.detectChanges();
        formElement = fixture.debugElement.query(By.directive(ThyFormDirective)).nativeElement;
        input = formElement.querySelector('[name=age]');
        fixture.detectChanges();
        assertElementInvalidError('age', `该选项输入值不能小于0`);
        fixture.detectChanges();

        testComponent.formGroup.patchValue({ age: 11 });
        tick(100);
        fixture.detectChanges();
        formElement = fixture.debugElement.query(By.directive(ThyFormDirective)).nativeElement;
        input = formElement.querySelector('[name=age]');
        fixture.detectChanges();
        assertElementInvalidError('age', `该选项输入值不能大于10`);
        fixture.detectChanges();

        testComponent.formGroup.patchValue({ age: 1 });
        tick(100);
        fixture.detectChanges();
        formElement = fixture.debugElement.query(By.directive(ThyFormDirective)).nativeElement;
        input = formElement.querySelector('[name=age]');
        fixture.detectChanges();
        assertFormValid();
    }));

    it('should submit success when click submit button', fakeAsync(() => {
        testComponent.formGroup.patchValue({ username: '111' });
        fixture.detectChanges();
        tick();
        const formSubmitSpy = spyOn(testComponent, 'submit');
        expect(formSubmitDebugElement).toBeTruthy();
        expect(formSubmitSpy).not.toHaveBeenCalled();
        dispatchFakeEvent(formSubmitDebugElement.nativeElement, 'click');
        expect(formSubmitSpy).toHaveBeenCalled();
    }));

    it('should get invalid messages when name is empty', fakeAsync(() => {
        dispatchFakeEvent(formSubmitDebugElement.nativeElement, 'click');
        assertElementInvalidError('username', `user name is required`);
    }));

    it('should clear error validations after input value', fakeAsync(() => {
        dispatchFakeEvent(formSubmitDebugElement.nativeElement, 'click');
        assertElementInvalidError('username', `user name is required`);

        fixture.detectChanges();
        testComponent.formGroup.patchValue({ username: 'test' });
        fixture.detectChanges();
        tick(100);
        fixture.detectChanges();

        assertFormValid();
    }));

    it('should reset success after validate is error', fakeAsync(() => {
        dispatchFakeEvent(formSubmitDebugElement.nativeElement, 'click');
        assertElementInvalidError('username', `user name is required`);
        formDirective.validator.reset();
        assertFormDefaultState();
    }));

    it('should manual set element error message success', fakeAsync(() => {
        assertFormDefaultState();
        testComponent.formGroup.patchValue({ username: '1' });
        fixture.detectChanges();
        tick();
        assertFormValid();

        const message = 'the name is exist';
        formDirective.validator.setElementErrorMessage('username', message);
        assertElementInvalidError('username', message);
    }));
});

@Component({
    selector: 'app-test-form-full',
    template: `
        <form thyForm name="demoForm" #demoForm="thyForm">
            <thy-form-group>
                <input thyInput name="username" placeholder="please input description" />
            </thy-form-group>
            <thy-form-group-footer>
                <button [thyButton]="'primary'" thyLoadingText="确定">登录</button>
            </thy-form-group-footer>
        </form>
    `
})
export class TestNoFormSubmitComponent {}

describe(`enter keydown`, () => {
    let fixture: ComponentFixture<TestNoFormSubmitComponent>;
    let testComponent: TestNoFormSubmitComponent;
    let formDebugElement: DebugElement;
    let formDirective: ThyFormDirective;
    let formElement: HTMLElement;
    let formSubmitDebugElement: DebugElement;
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestNoFormSubmitComponent],
            imports: [CommonModule, FormsModule, ThyFormModule, ThyLayoutModule, ThyButtonModule, ThyInputModule],
            providers: [provideHttpClient()]
        });

        TestBed.compileComponents();
        fixture = TestBed.createComponent(TestNoFormSubmitComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        tick();
        formDebugElement = fixture.debugElement.query(By.directive(ThyFormDirective));
        formDirective = formDebugElement.injector.get(ThyFormDirective);
        formElement = formDebugElement.nativeElement;
        formSubmitDebugElement = fixture.debugElement.query(By.directive(ThyFormSubmitDirective));
    }));

    it(`enter keydown, expect not throw error`, fakeAsync(() => {
        const usernameElement: HTMLInputElement = formElement.querySelector('[name=username]');
        usernameElement.focus();
        const directiveSubmitSpy = spyOn(formDirective, 'submit');
        dispatchKeyboardEvent(formElement, 'keydown', keycodes.ENTER);
        fixture.detectChanges();
        expect(formDirective.onSubmitSuccess).toBeUndefined();
        expect(directiveSubmitSpy).toHaveBeenCalled();
    }));
});
