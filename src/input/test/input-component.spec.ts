import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyInput, ThyInputDirective } from 'ngx-tethys/input';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'test-bed',
    template: `
        <thy-input
            [thyType]="thyType"
            thyLabelText="姓名"
            [thySize]="thySize"
            [thyAutofocus]="true"
            [readonly]="readonly"
            name="username"
            [(ngModel)]="value"
            placeholder="请输入您的姓名"
            (focus)="onFocus()"
            (blur)="onBlur()"
            [disabled]="disabled">
            <ng-template #prepend>前置模板</ng-template>
        </thy-input>
        <thy-input class="input2">
            <ng-template #prepend>前置模板</ng-template>
            <ng-template #append>后置模板</ng-template>
        </thy-input>
        <thy-input class="password" [(ngModel)]="passwordValue" thyType="password"> </thy-input>
    `,
    imports: [ThyInput, FormsModule]
})
class TestBedComponent {
    thySize = ``;
    thyType = 'text';
    readonly = false;
    passwordValue = '12345';
    checkFocus = false;
    checkBlur = false;
    disabled = false;
    onFocus() {
        this.checkFocus = true;
    }

    onBlur() {
        this.checkBlur = true;
    }
}

describe('input component', () => {
    let fixture!: ComponentFixture<TestBedComponent>;
    let basicTestComponent!: TestBedComponent;
    let debugElement!: DebugElement;
    let debugContainerElement!: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient()]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestBedComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(ThyInputDirective));
        debugContainerElement = fixture.debugElement.query(By.directive(ThyInput));
    });

    it('thySize empty string', () => {
        basicTestComponent.thySize = '';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('form-control-xs')).toBe(false);
        expect(debugElement.nativeElement.classList.contains('form-control-sm')).toBe(false);
        expect(debugElement.nativeElement.classList.contains('form-control-md')).toBe(false);
        expect(debugElement.nativeElement.classList.contains('form-control-lg')).toBe(false);
    });

    it('thySize xs', () => {
        basicTestComponent.thySize = 'xs';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('form-control-xs')).toBe(true);
    });

    it('thySize sm', () => {
        basicTestComponent.thySize = 'sm';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('form-control-sm')).toBe(true);
    });

    it('thySize md', () => {
        basicTestComponent.thySize = 'md';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('form-control-md')).toBe(true);
    });

    it('thySize lg', () => {
        basicTestComponent.thySize = 'lg';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('form-control-lg')).toBe(true);
    });

    it('placeholder', () => {
        fixture.detectChanges();
        expect(debugElement.nativeElement.placeholder).toBe('请输入您的姓名');
    });

    it('prepend template', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.input2')).nativeElement.innerText.includes('前置模板')).toBeTruthy();
    });

    it('append template', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.input2')).nativeElement.innerText.includes('后置模板')).toBe(true);
    });

    it('thyType', () => {
        basicTestComponent.thyType = 'number';
        fixture.detectChanges();
        expect(debugElement.nativeElement.type).toBe('number');
        basicTestComponent.thyType = 'text';
        fixture.detectChanges();
    });

    it('thyLabelText', () => {
        fixture.detectChanges();
        expect(debugContainerElement.nativeElement.innerText.includes('姓名')).toBeTruthy();
    });

    it('readonly', () => {
        basicTestComponent.readonly = true;
        fixture.detectChanges();
        expect(debugElement.nativeElement.readOnly).toBe(true);
    });

    it('disabled', fakeAsync(() => {
        basicTestComponent.disabled = true;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(debugContainerElement.attributes.class.includes('disabled')).toBe(true);
    }));

    it('password input', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const passwordInput = fixture.debugElement.query(By.css('.password'));
        const passwordAppend = passwordInput.nativeElement.querySelector('.input-password-icon');
        expect(passwordAppend.children[0].classList.contains('thy-icon-eye')).toBeTruthy();

        passwordAppend.click();
        fixture.detectChanges();
        expect(passwordAppend.children[0].classList.contains('thy-icon-eye-invisible')).toBeTruthy();

        passwordAppend.click();
        fixture.detectChanges();
        expect(passwordAppend.children[0].classList.contains('thy-icon-eye')).toBeTruthy();
    }));

    it('focus and blur ', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        const debugInputInstance = fixture.debugElement.query(By.directive(ThyInput)).componentInstance;

        debugInputInstance.onInputFocus();
        fixture.detectChanges();
        expect(basicTestComponent.checkFocus).toBe(true);

        debugInputInstance.onInputBlur();
        fixture.detectChanges();
        expect(basicTestComponent.checkBlur).toBe(true);
    }));
});
