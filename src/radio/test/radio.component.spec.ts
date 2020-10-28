import { Component, DebugElement, ViewChild, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyRadioModule } from '../module';
import { ThyRadioComponent } from '../radio.component';
import { ThyRadioGroupComponent } from '../group/radio-group.component';

// @Component({
//     selector: 'thy-radio-test',
//     template: `
//         <label thyRadio [thyLabelText]="isRadio" [thyDisabled]="isDisabled"></label>
//     `
// })
// class RadioTestComponent {
//     isRadio: '单选选项';
//     isDisabled: false;
// }

// describe('radio component', () => {
//     let fixture: ComponentFixture<RadioTestComponent>;
//     let testRadioComponent: RadioTestComponent;
//     let radioDebugComponent: DebugElement;
//     let radioElement;
//     let labelNode;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [ThyRadioModule, FormsModule],
//             declarations: [RadioTestComponent],
//             providers: []
//         });
//         TestBed.compileComponents();
//     });

//     beforeEach(() => {
//         fixture = TestBed.createComponent(RadioTestComponent);
//         testRadioComponent = fixture.debugElement.componentInstance;
//         radioDebugComponent = fixture.debugElement.query(By.directive(ThyRadioComponent));
//         radioElement = radioDebugComponent.nativeElement;
//         labelNode = radioElement.children[0];
//     });

//     it('should create', () => {
//         expect(testRadioComponent).toBeTruthy();
//         expect(radioElement).toBeTruthy();
//     });

//     it('should select when click', () => {
//         labelNode.click();
//         fixture.detectChanges();
//         expect(fixture.nativeElement.children[0].children[0].checked).toBe(true);
//     });

//     it('should have correct class when it‘s isDisabled has changed', () => {
//         labelNode.isDisabled = true;
//         fixture.detectChanges();
//         expect(labelNode.classList.contains('form-check-no-label-text')).toBeTruthy();
//     });
// });

@Component({
    selector: 'thy-radio-group-test',
    template: `
        <thy-radio-group [(ngModel)]="checkedValue">
            <label thyRadio thyLabelText="选项一" [thyValue]="1"></label>
            <label thyRadio thyLabelText="选项二" [thyValue]="2"></label>
            <label thyRadio thyLabelText="选项三" [thyValue]="3"></label>
        </thy-radio-group>
    `
})
class RadioGroupTestComponent {
    checkedValue = 1;
}

describe('thy-radio-group', () => {
    let groupFixture: ComponentFixture<RadioGroupTestComponent>;
    let groupComponent: RadioGroupTestComponent;
    let radioGroupDebugComponent: DebugElement;
    let labelComponent: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyRadioModule, FormsModule],
            declarations: [RadioGroupTestComponent],
            providers: []
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        groupFixture = TestBed.createComponent(RadioGroupTestComponent);
        groupComponent = groupFixture.debugElement.componentInstance;
        radioGroupDebugComponent = groupFixture.debugElement.query(By.directive(ThyRadioGroupComponent));
        labelComponent = radioGroupDebugComponent.nativeElement.children;
        groupFixture.detectChanges();
        groupFixture.detectChanges();
    });

    it('should create thy-radio-group', () => {
        // groupFixture.detectChanges();
        // console.log('前:::', groupFixture);
        // console.log('ffefefe:::', radioGroupDebugComponent);
        expect(groupComponent).toBeTruthy();
        expect(radioGroupDebugComponent.componentInstance).toBeTruthy();
    });

    // it('should show class checked', () => {
    //     groupComponent.checkedValue = 2;
    //     console.log('ffefefe:::', radioGroupDebugComponent);
    //     groupFixture.detectChanges();
    //     [1, 2, 3].forEach((item: number, index: number) => {
    //         groupComponent.checkedValue = item;
    //         groupFixture.detectChanges();

    //         expect(groupFixture.nativeElement.children[index].classList.contains('form-check-checked')).toBeTruthy();
    //     });
    //     expect(groupFixture.nativeElement.children[1].classList.contains('form-check-checked')).toBeTruthy();
    // });
});
