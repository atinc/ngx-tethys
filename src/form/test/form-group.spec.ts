import { ThyFormModule } from './../module';
import { ThyFormValidatorConfig } from '../form.class';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ThyButtonModule } from 'ngx-tethys/button';
import { bypassSanitizeProvider, injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { By } from '@angular/platform-browser';
import { ThyFormGroup } from '../form-group.component';
import { ThyTranslate } from 'ngx-tethys/core';
import { ThyFormGroupLabelDirective } from '../form-group-label.directive';

@Component({
    selector: 'thy-test-form-group-basic',
    template: `
        <form thyForm name="demoForm" [thyFormValidatorConfig]="validateConfig" class="myForm" #demoForm="thyForm">
            <thy-form-group thyLabelRequired thyLabelText="User Name">
                <input thyInput name="username" [(ngModel)]="model.name" required placeholder="Please type username" />
            </thy-form-group>
            <thy-form-group
                [thyLabelText]="labelText"
                [thyTipsMode]="tipsMode"
                thyTips="This is display tips"
                [thyLabelPaddingTopClear]="labelPaddingTopClear"
                [thyFeedbackIcon]="feedbackIcon"
                [thyRowFill]="rowFill">
                <input thyInput name="display_name" [(ngModel)]="model.display_name" placeholder="Please type display name" />
            </thy-form-group>
            <thy-form-group-footer>
                <button [thyButton]="'primary'" thyLoadingText="确定" (thyFormSubmit)="submit()">登录</button>
            </thy-form-group-footer>
        </form>
    `
})
export class TestFormWithGroupComponent {
    model = {
        name: '',
        display_name: ''
    };

    labelText = '';

    tipsMode = 'default';

    feedbackIcon = 'calendar';

    labelPaddingTopClear = false;

    rowFill = false;

    validateConfig: ThyFormValidatorConfig = {
        validationMessages: {
            username: {
                required: '用户名不能为空'
            }
        }
    };

    submit() {}
}

// form-group basic
describe('form-group basic', () => {
    let fixture: ComponentFixture<TestFormWithGroupComponent>;
    let testComponent: TestFormWithGroupComponent;

    let formGroupDebugElements: DebugElement[];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestFormWithGroupComponent],
            imports: [ThyFormModule, FormsModule, ThyButtonModule],
            providers: [bypassSanitizeProvider]
        }).compileComponents();
    }));

    beforeEach(() => {
        injectDefaultSvgIconSet();
        fixture = TestBed.createComponent(TestFormWithGroupComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        formGroupDebugElements = fixture.debugElement.queryAll(By.directive(ThyFormGroup));
    });

    function getFormGroup(index = 0) {
        expect(formGroupDebugElements[index]).toBeTruthy();
        return {
            debugElement: formGroupDebugElements[index],
            element: formGroupDebugElements[index].nativeElement as HTMLElement,
            component: formGroupDebugElements[index].componentInstance
        };
    }

    it('should create form group success', () => {
        expect(testComponent).toBeTruthy();
        expect(formGroupDebugElements).toBeTruthy();
        expect(formGroupDebugElements).toBeTruthy();
        const userNameFormGroup = getFormGroup();
        const displayNameFormGroup = getFormGroup(1);
        expect(userNameFormGroup.element.classList.contains(`form-group`)).toBe(true);
        expect(userNameFormGroup.element.classList.contains(`row`)).toBe(true);
        expect(displayNameFormGroup.element.classList.contains(`form-group`)).toBe(true);
        expect(displayNameFormGroup.element.classList.contains(`row`)).toBe(true);
    });

    it('should get correct form labels', () => {
        const userNameFormGroup = getFormGroup();
        const displayNameFormGroup = getFormGroup(1);
        const userNameLabelElement: HTMLElement = userNameFormGroup.element.querySelector('.form-label');
        expect(userNameLabelElement).toBeTruthy();
        expect(userNameLabelElement.classList.contains(`form-label`)).toBe(true);
        const labelTextSpan = userNameLabelElement.querySelector('span');
        expect(labelTextSpan.classList.contains(`label-required`)).toBe(true);
        expect(userNameLabelElement.textContent).toContain(`User Name`);

        const displayNameLabelElement: HTMLElement = displayNameFormGroup.element.querySelector('.form-label');
        expect(displayNameLabelElement).toBeTruthy();
        expect(displayNameLabelElement.classList.contains(`form-label`)).toBe(true);
        expect(displayNameLabelElement.textContent).toEqual('');
    });

    it('should get correct tips for form group', () => {
        const displayNameFormGroup = getFormGroup(1);
        const tipsElement: HTMLElement = displayNameFormGroup.element.querySelector('.form-text');
        expect(tipsElement).toBeTruthy();
        expect(tipsElement.classList.contains(`text-desc`)).toBe(true);
        expect(tipsElement.textContent).toContain(`This is display tips`);
    });

    it('should get correct tips icon', () => {
        fixture.detectChanges();
        testComponent.tipsMode = 'label';
        fixture.detectChanges();

        const displayNameFormGroup = getFormGroup(1);
        const tipsElement: HTMLElement = displayNameFormGroup.element.querySelector('.label-tips-icon');
        expect(tipsElement).toBeTruthy();

        const defaultTipsElement: HTMLElement = displayNameFormGroup.element.querySelector('.form-text');
        expect(defaultTipsElement).toBeFalsy();
    });

    it('should get correct feedback icon for form group', () => {
        const displayNameFormGroup = getFormGroup(1);
        const feedbackElement: HTMLElement = displayNameFormGroup.element.querySelector('.form-control-feedback');
        expect(feedbackElement).toBeTruthy();
        expect(feedbackElement.classList.contains(`thy-icon`)).toBe(true);
        expect(feedbackElement.classList.contains(`thy-icon-calendar`)).toBe(true);
    });

    it('should get correct feedback icon for "date"', () => {
        testComponent.feedbackIcon = 'date';
        fixture.detectChanges();
        const displayNameFormGroup = getFormGroup(1);
        const feedbackElement: HTMLElement = displayNameFormGroup.element.querySelector('.form-control-feedback');
        expect(feedbackElement).toBeTruthy();
        expect(feedbackElement.classList.contains(`wtf`)).toBe(true);
        expect(feedbackElement.classList.contains(`wtf-schedule-o`)).toBe(true);
    });

    it('should clear label padding top succuss', () => {
        testComponent.labelText = 'Display Name';
        testComponent.labelPaddingTopClear = true;
        fixture.detectChanges();
        const displayNameFormGroup = getFormGroup(1);
        const labelElement: HTMLElement = displayNameFormGroup.element.querySelector('.form-label');
        expect(labelElement).toBeTruthy();
        expect(labelElement.classList.contains('pt-0')).toBe(true);
    });

    it('should get correct class when row is fill', () => {
        testComponent.rowFill = true;
        fixture.detectChanges();
        const displayNameFormGroup = getFormGroup(1);
        expect(displayNameFormGroup.element.classList.contains('row-fill')).toBe(true);
    });
});

// form-group in layout vertical
@Component({
    selector: 'test-form-group-layout-vertical',
    template: `
        <form thyForm name="demoForm" thyLayout="vertical" class="myForm">
            <thy-form-group thyLabelRequired [thyLabelText]="labelText">
                <input thyInput name="username" [(ngModel)]="model.name" required placeholder="Please type username" />
            </thy-form-group>
            <thy-form-group-footer>
                <button [thyButton]="'primary'" thyLoadingText="确定" (thyFormSubmit)="submit()">登录</button>
            </thy-form-group-footer>
        </form>
    `
})
export class TestFormGroupVerticalComponent {
    model = {
        name: ''
    };

    labelText = '';

    submit() {}
}

describe('form-group in vertical', () => {
    let fixture: ComponentFixture<TestFormGroupVerticalComponent>;
    let testComponent: TestFormGroupVerticalComponent;

    let formGroupDebugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestFormGroupVerticalComponent],
            imports: [ThyFormModule, FormsModule, ThyButtonModule],
            providers: [bypassSanitizeProvider]
        }).compileComponents();

        injectDefaultSvgIconSet();
        fixture = TestBed.createComponent(TestFormGroupVerticalComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        formGroupDebugElement = fixture.debugElement.query(By.directive(ThyFormGroup));
    });

    it('should get correct form group for vertical', () => {
        expect(testComponent).toBeTruthy();
        expect(formGroupDebugElement).toBeTruthy();
        expect(formGroupDebugElement.componentInstance).toBeTruthy();

        expect(formGroupDebugElement.nativeElement.classList.contains(`form-group`)).toBe(true);
        expect(formGroupDebugElement.nativeElement.classList.contains(`row`)).toBe(false);
    });

    it('should hide label when thyLayout vertical and thyLabelText is empty', () => {
        const fomGroupElement: HTMLElement = formGroupDebugElement.nativeElement;
        const labelElement = fomGroupElement.querySelector(`.form-label`);
        expect(labelElement).toBeFalsy();
    });
});

// form-group for TranslateKey
@Component({
    selector: 'test-form-group-translate-key',
    template: `
        <form thyForm name="demoForm" class="myForm">
            <thy-form-group [thyLabelTextTranslateKey]="labelTextTranslateKey" thyTipsTranslateKey="common.USER_NAME_TIPS">
                <input thyInput name="username" placeholder="Please type username" />
            </thy-form-group>
        </form>
    `
})
export class TestFormGroupTranslateKeyComponent {
    model = {
        name: ''
    };

    labelTextTranslateKey = 'common.USER_NAME';

    submit() {}
}

describe('form-group for TranslateKey', () => {
    let fixture: ComponentFixture<TestFormGroupTranslateKeyComponent>;
    let testComponent: TestFormGroupTranslateKeyComponent;

    let formGroupDebugElement: DebugElement;

    const TRANSLATE_KEYS = {
        'common.USER_NAME': 'User Name',
        'common.USER_NAME_TIPS': 'User Name Tips'
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestFormGroupTranslateKeyComponent],
            imports: [ThyFormModule, FormsModule, ThyButtonModule],
            providers: [
                {
                    provide: ThyTranslate,
                    useValue: {
                        instant: (key: string) => {
                            return TRANSLATE_KEYS[key];
                        }
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestFormGroupTranslateKeyComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        formGroupDebugElement = fixture.debugElement.query(By.directive(ThyFormGroup));
    });

    it('should get correct label and tips', () => {
        expect(testComponent).toBeTruthy();
        expect(formGroupDebugElement).toBeTruthy();
        const labelElement: HTMLElement = formGroupDebugElement.nativeElement.querySelector('.form-label');
        const tipsElement: HTMLElement = formGroupDebugElement.nativeElement.querySelector('.form-text');
        expect(labelElement.textContent).toContain(TRANSLATE_KEYS['common.USER_NAME']);
        expect(tipsElement.textContent).toContain(TRANSLATE_KEYS['common.USER_NAME_TIPS']);
    });

    it('should clear label text when translateKey is empty', () => {
        testComponent.labelTextTranslateKey = '';
        fixture.detectChanges();
        expect(testComponent).toBeTruthy();
        expect(formGroupDebugElement).toBeTruthy();
        const labelElement: HTMLElement = formGroupDebugElement.nativeElement.querySelector('.form-label');
        expect(labelElement.textContent).toEqual('');
    });
});

// form-group-label
@Component({
    selector: 'test-form-group-label-basic',
    template: `
        <form thyForm name="demoForm" class="myForm">
            <label
                thyFormGroupLabel
                [thyLabelText]="labelText"
                [thyLabelTranslateKey]="translateKey"
                [thyLabelRequired]="labelRequired"></label>
        </form>
    `
})
export class TestFormGroupLabelBasicComponent {
    labelRequired = false;
    labelText = 'default value';
    translateKey = '';
}

describe('form-group for TranslateKey', () => {
    let fixture: ComponentFixture<TestFormGroupLabelBasicComponent>;
    let testComponent: TestFormGroupLabelBasicComponent;

    let formGroupLabelDebugElement: DebugElement;
    let formGroupLabelDirective: ThyFormGroupLabelDirective;

    const TRANSLATE_KEYS = {
        'common.USER_NAME': 'User Name'
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestFormGroupLabelBasicComponent],
            imports: [ThyFormModule, FormsModule, ThyButtonModule],
            providers: [
                {
                    provide: ThyTranslate,
                    useValue: {
                        instant: (key: string) => {
                            return TRANSLATE_KEYS[key];
                        }
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestFormGroupLabelBasicComponent);
        fixture.detectChanges();
        testComponent = fixture.componentInstance;
        formGroupLabelDebugElement = fixture.debugElement.query(By.directive(ThyFormGroupLabelDirective));
        formGroupLabelDirective = formGroupLabelDebugElement.injector.get(ThyFormGroupLabelDirective);
    });

    it('should create formGroupLabel success', () => {
        expect(formGroupLabelDebugElement).toBeTruthy();
        expect(formGroupLabelDebugElement.nativeElement.classList.contains('col-form-label')).toBeTruthy();
        expect(formGroupLabelDirective.labelText).toEqual('default value');
    });

    it('should get correct label text for translateKey', () => {
        expect(formGroupLabelDebugElement).toBeTruthy();
        testComponent.translateKey = 'common.USER_NAME';
        fixture.detectChanges();
        expect(formGroupLabelDirective.labelText).toEqual(TRANSLATE_KEYS[testComponent.translateKey]);
    });

    it('should get correct label required class', () => {
        expect(formGroupLabelDebugElement).toBeTruthy();
        testComponent.labelRequired = true;
        fixture.detectChanges();
        expect(formGroupLabelDebugElement.nativeElement.classList.contains('label-required')).toBeTruthy();
    });
});
