import { ThyInputComponent } from './../input.component';
import { ThyInputModule } from './../module';
import { ThyInputDirective } from './../input.directive';
import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'test-bed',
    template: `
        <thy-input
            [thyType]="thyType"
            thyLabelText="姓名"
            [thySize]="thySize"
            [thyAutocomplete]="thyAutocomplete"
            [thyAutofocus]="true"
            [readonly]="readonly"
            name="username"
            [(ngModel)]="value"
            placeholder="请输入您的姓名"
            (focus)="onFocus()"
            (blur)="onBlur()"
        ></thy-input>
        <thy-input class="input2">
            <ng-template #prepend>前置模版</ng-template>
            <ng-template #append>后置模版</ng-template>
        </thy-input>
    `
})
class TestBedComponent {
    thySize = ``;
    thyType = 'text';
    thyAutocomplete;
    readonly;
    checkFocus = false;
    checkBlur = false;

    onFocus() {
        this.checkFocus = true;
    }

    onBlur() {
        this.checkBlur = true;
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, ThyInputModule],
    declarations: [TestBedComponent],
    exports: []
})
export class InputComponentTestModule {}

describe('input component', () => {
    let fixture: ComponentFixture<TestBedComponent>;
    let basicTestComponent: TestBedComponent;
    let debugElement: DebugElement;
    let debugContainerElement: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [InputComponentTestModule],
            providers: []
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestBedComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(ThyInputDirective));
        debugContainerElement = fixture.debugElement.query(By.directive(ThyInputComponent));
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

    it('thyAutocomplete', () => {
        basicTestComponent.thyAutocomplete = true;
        fixture.detectChanges();
        expect(debugElement.nativeElement.autocomplete).toBe('on');
    });

    it('placeholder', () => {
        fixture.detectChanges();
        expect(debugElement.nativeElement.placeholder).toBe('请输入您的姓名');
    });

    it('prepend template', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.input2')).nativeElement.innerText.includes('前置模版')).toBeTruthy();
    });

    it('append template', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.input2')).nativeElement.innerText.includes('后置模版')).toBe(true);
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
});
