import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyRadioModule } from '../module';
import { ThyRadioComponent } from '../radio.component';
import { ThyRadioGroupComponent } from '../group/radio-group.component';

@Component({
    selector: 'thy-radio-test',
    template: `
        <label thyRadio [thyLabelText]="isRadio" [thyDisabled]="isDisabled"></label>
    `
})
class RadioTestComponent {
    isRadio: '单选选项';
    isDisabled: false;
}

describe('radio component', () => {
    let fixture: ComponentFixture<RadioTestComponent>;
    let testRadioComponent: RadioTestComponent;
    let radioDebugComponent: DebugElement;
    let radioElement;
    let labelNode;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyRadioModule, FormsModule],
            declarations: [RadioTestComponent],
            providers: []
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioTestComponent);
        testRadioComponent = fixture.debugElement.componentInstance;
        radioDebugComponent = fixture.debugElement.query(By.directive(ThyRadioComponent));
        radioElement = radioDebugComponent.nativeElement;
        labelNode = radioElement.children[0];
    });

    it('should create', () => {
        expect(testRadioComponent).toBeTruthy();
        expect(radioElement).toBeTruthy();
    });

    it('should select when click', () => {
        labelNode.click();
        fixture.detectChanges();
        expect(fixture.nativeElement.children[0].children[0].checked).toBe(true);
    });

    it('should have correct class when it‘s isDisabled has changed', () => {
        labelNode.isDisabled = true;
        fixture.detectChanges();
        expect(labelNode.classList.contains('form-check-no-label-text')).toBeTruthy();
    });
});

@Component({
    selector: 'thy-radio-group-test',
    template: `
        <thy-radio-group [(ngModel)]="checkedValue">
            <label thyRadio thyLabelText="选项一" [thyValue]="1" [thyInline]="inlineStatus"></label>
            <label thyRadioButton thyLabelText="选项二" [thyValue]="2" [thyInline]="inlineStatus"></label>
            <label thyRadio thyLabelText="选项三" [thyValue]="3" [thyInline]="inlineStatus"></label>
        </thy-radio-group>
        <p class="mt-2">选中的选项值： {{ checkedValue }}</p>
    `
})
class RadioGroupTestComponent {
    checkedValue = 1;
    inlineStatus = false;
}

describe('thy-radio-group component', () => {
    let groupFixture: ComponentFixture<RadioGroupTestComponent>;
    let groupComponent: RadioGroupTestComponent;
    let radioGroupDebugComponent: DebugElement;
    let labelComponent: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyRadioModule, FormsModule],
            declarations: [RadioGroupTestComponent],
            providers: []
        }).compileComponents();
    });
    beforeEach(() => {
        groupFixture = TestBed.createComponent(RadioGroupTestComponent);
        groupComponent = groupFixture.componentInstance;
        radioGroupDebugComponent = groupFixture.debugElement.query(By.directive(ThyRadioGroupComponent));
        labelComponent = radioGroupDebugComponent.nativeElement.children;
        groupFixture.detectChanges();
    });

    it('should create thy-radio-group component', () => {
        expect(groupFixture).toBeTruthy();
        expect(groupComponent).toBeTruthy();
        expect(labelComponent).toBeTruthy();
        groupFixture.detectChanges();
    });

    it(`should has class thyRadioButton to thy-radio-group`, fakeAsync(() => {
        groupFixture.detectChanges();
        tick(500);
        groupFixture.detectChanges();
        expect(labelComponent[1].classList.contains('btn')).toBeTruthy();
    }));

    it(`should change select value`, fakeAsync(() => {
        groupComponent.checkedValue = 2;
        groupFixture.detectChanges();
        tick(500);
        groupFixture.detectChanges();
        expect(labelComponent[1].classList.contains('form-check-checked')).toBeTruthy();
    }));

    it(`should  has class Toggle inline to thy-radio-group`, fakeAsync(() => {
        groupComponent.inlineStatus = true;
        groupComponent.checkedValue = 3;
        groupFixture.detectChanges();
        tick(500);
        groupFixture.detectChanges();
        expect(labelComponent[2].classList.contains('form-check-checked')).toBeTruthy();
        [1, 2, 3].forEach((element: number, index: number) => {
            expect(labelComponent[index].classList.contains('form-check-inline')).toBeTruthy();
        });
    }));
});
