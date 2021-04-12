import { ThyEnterKeyMode } from './../form.directive';
import { ThyFormModule } from './../module';
import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, flush } from '@angular/core/testing';
import { ThyFormDirective } from '../form.directive';
import { ThyLayoutModule } from 'ngx-tethys/layout';
import { FormsModule } from '@angular/forms';
import { ThyFormValidatorConfig, THY_FORM_CONFIG } from '../form.class';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyInputModule } from 'ngx-tethys/input';
import { createFakeEvent, dispatchEvent, dispatchFakeEvent, dispatchKeyboardEvent } from 'ngx-tethys/testing';
import { ThyFormSubmitDirective } from '../form-submit.directive';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { keycodes } from 'ngx-tethys/util';

@Component({
    selector: 'app-test-basic-form',
    template: `
        <form thyForm [thyLayout]="thyLayout"></form>
    `
})
export class TestFormBasicDirectiveComponent {
    thyLayout = '';
}

@Component({
    selector: 'app-test-form-full',
    template: `
        <form
            thyForm
            name="demoForm"
            [thyFormValidatorConfig]="validateConfig"
            [thyEnterKeyMode]="enterKeyMode"
            class="myForm"
            #demoForm="thyForm"
        >
            <thy-form-group thyLabelRequired>
                <input thyInput name="username" [(ngModel)]="model.name" required placeholder="please input description" />
            </thy-form-group>
            <thy-form-group thyLabelRequired>
                <textarea
                    thyInput
                    name="description"
                    required
                    [(ngModel)]="model.description"
                    placeholder="please input description"
                ></textarea>
            </thy-form-group>
            <thy-form-group-footer>
                <button [thyButton]="'primary'" thyLoadingText="确定" thyFormSubmit (thyFormSubmit)="submit()">
                    登录
                </button>
            </thy-form-group-footer>
        </form>
    `
})
export class TestFormFullComponent {
    model = {
        name: '',
        description: 'default'
    };

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

describe('form basic directive', () => {
    let fixture: ComponentFixture<TestFormBasicDirectiveComponent>;
    let basicTestComponent: TestFormBasicDirectiveComponent;
    let debugElement: DebugElement;
    let formElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestFormBasicDirectiveComponent],
            imports: [ThyFormModule, FormsModule, ThyLayoutModule],
            providers: []
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
            providers: []
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
        expect(formDirective['ngForm'].controls).toBeTruthy();
        const nameControl = formDirective['ngForm'].controls['username'];
        expect(nameControl).toBeTruthy();
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

    it('should get invalid messages when name is empty', fakeAsync(() => {
        dispatchFakeEvent(formSubmitDebugElement.nativeElement, 'click');
        assertElementInvalidError('username', `user name is required`);
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
