import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyRadioModule, ThyRadio, ThyRadioGroup } from 'ngx-tethys/radio';

@Component({
    selector: 'thy-radio-test',
    template: ` <label thyRadio [thyLabelText]="labelText" [thyDisabled]="isDisabled"></label> `,
    imports: [ThyRadioModule, FormsModule]
})
class RadioTestComponent {
    labelText = '单选选项';
    isDisabled: boolean = false;
}

describe('radio component', () => {
    let fixture: ComponentFixture<RadioTestComponent>;
    let testRadioComponent: RadioTestComponent;
    let radioDebugComponent: DebugElement;
    let radioElement: HTMLElement;
    let labelNode: any;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioTestComponent);
        testRadioComponent = fixture.debugElement.componentInstance;
        radioDebugComponent = fixture.debugElement.query(By.directive(ThyRadio));
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
        testRadioComponent.labelText = null;
        fixture.detectChanges();
        expect(labelNode.classList.contains('form-check-no-label-text')).toBeTruthy();
        testRadioComponent.isDisabled = true;
        fixture.detectChanges();
        expect(labelNode.tabIndex).toBe(-1);
    });

    it('should has default tabindex', () => {
        expect(labelNode.tabIndex).toBe(0);
    });
});

@Component({
    selector: 'thy-radio-group-test',
    template: `
        <thy-radio-group #radioGroup [(ngModel)]="checkedValue" [thySize]="size" [thyDisabled]="disabled">
            <label thyRadio thyLabelText="选项一" [thyValue]="1" [thyInline]="inlineStatus"></label>
            <label thyRadioButton thyLabelText="选项二" [thyValue]="2" [thyInline]="inlineStatus"></label>
            <label thyRadio thyLabelText="选项三" [thyValue]="3" [thyInline]="inlineStatus"></label>
        </thy-radio-group>
        <p class="mt-2">选中的选项值： {{ checkedValue }}</p>
    `,
    imports: [ThyRadioModule, FormsModule]
})
class RadioGroupTestComponent {
    @ViewChild('radioGroup', { static: true }) radioGroup: ThyRadioGroup;
    checkedValue = 1;
    inlineStatus = false;
    size: string;
    disabled = false;
}

describe('thy-radio-group component', () => {
    let groupFixture: ComponentFixture<RadioGroupTestComponent>;
    let groupComponent: RadioGroupTestComponent;
    let radioGroupDebugComponent: DebugElement;
    let labelComponent: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({}).compileComponents();
    });

    beforeEach(() => {
        groupFixture = TestBed.createComponent(RadioGroupTestComponent);
        groupComponent = groupFixture.componentInstance;
        radioGroupDebugComponent = groupFixture.debugElement.query(By.directive(ThyRadioGroup));
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

    it('should set thySize success', fakeAsync(() => {
        const buttonGroupSizeMap = {
            sm: ['btn-group-sm'],
            lg: ['btn-group-lg']
        };
        const radioGroupElement = radioGroupDebugComponent.nativeElement as HTMLElement;

        ['sm', 'md', 'lg'].forEach(size => {
            groupComponent.size = size;
            groupFixture.detectChanges();
            if (size === 'md') {
                expect(radioGroupElement.classList.contains(`${buttonGroupSizeMap[size]}`)).toBeFalsy();
            } else {
                expect(radioGroupElement.classList.contains(`${buttonGroupSizeMap[size]}`)).toBeTruthy();
            }
        });
    }));

    it('should update disable status success', fakeAsync(() => {
        groupComponent.disabled = true;
        groupComponent.checkedValue = 1;
        groupFixture.detectChanges();
        tick();
        groupFixture.detectChanges();
        expect(groupComponent.checkedValue).toBe(1);
        labelComponent[2].click();
        groupFixture.detectChanges();
        flush();
        groupFixture.detectChanges();
        expect(labelComponent[2].classList).not.toContain('form-check-checked');
        expect(groupComponent.checkedValue).toBe(1);
    }));

    it('should thyRadioButton disable status success', fakeAsync(() => {
        groupComponent.disabled = true;
        groupComponent.checkedValue = 1;
        groupFixture.detectChanges();
        tick();
        groupFixture.detectChanges();
        expect(groupComponent.checkedValue).toBe(1);
        labelComponent[1].click();
        groupFixture.detectChanges();
        flush();
        groupFixture.detectChanges();
        expect(labelComponent[1].classList).not.toContain('form-check-checked');
        expect(groupComponent.checkedValue).toBe(1);
    }));
});
