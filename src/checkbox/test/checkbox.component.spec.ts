import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyCheckboxModule, ThyCheckbox } from 'ngx-tethys/checkbox';

@Component({
    selector: 'thy-radio-test',
    template: `
        <label
            thyCheckbox
            [thyIndeterminate]="model.indeterminate"
            [(ngModel)]="model.checkedAll"
            (ngModelChange)="selectAll()"
            thyLabelText="全选"></label>
        <label thyCheckbox thyLabelText="多选选项1" [(ngModel)]="model.checked1"></label>
        <label thyCheckbox [thyLabelText]="labelText" [(ngModel)]="model.checked2"></label>
        <label thyCheckbox thyLabelText="多选选项3" [thyDisabled]="isDisabled" [(ngModel)]="model.checked3"></label>
    `,
    imports: [ThyCheckboxModule, FormsModule]
})
class CheckboxTestComponent {
    labelText = '';
    isDisabled = false;
    model = {
        checked1: false,
        checked2: false,
        checked3: true,
        indeterminate: true,
        checkedAll: false
    };

    selectAll() {
        this.model.checked1 = this.model.checked2 = this.model.checked3 = this.model.checkedAll;
        this.model.indeterminate = false;
    }
}

describe('checkbox component', () => {
    let fixture!: ComponentFixture<CheckboxTestComponent>;
    let checkboxTestComponent!: CheckboxTestComponent;
    let checkboxComponent!: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxTestComponent);
        checkboxTestComponent = fixture.debugElement.componentInstance;
        checkboxComponent = fixture.debugElement.query(By.directive(ThyCheckbox));
    });

    it('should create', () => {
        expect(checkboxTestComponent).toBeTruthy();
        expect(checkboxComponent.nativeElement).toBeTruthy();
        expect(document.querySelector('.thy-checkbox')).toBeTruthy();
    });

    it('should select when click', fakeAsync(() => {
        fixture.detectChanges();
        expect(fixture.componentInstance.model.checked1).toBe(false);

        fixture.nativeElement.children[1].click();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(fixture.componentInstance.model.checked1).toBe(true);
    }));

    it('should have correct class when labelText has changed', fakeAsync(() => {
        fixture.detectChanges();
        expect(fixture.nativeElement.children[2].children[0].classList.contains('form-check-no-label-text')).toBeTruthy();

        fixture.componentInstance.labelText = '多选选项2';
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(fixture.nativeElement.children[2].children[0].classList.contains('form-check-no-label-text')).toBeFalsy();
        expect(fixture.nativeElement.children[3].children[0].getAttribute('tabindex')).toBe('0');
    }));

    it('should have correct class when isDisabled has changed', fakeAsync(() => {
        fixture.detectChanges();
        expect(fixture.nativeElement.children[3].children[0].attributes.disabled).toBeFalsy();

        fixture.componentInstance.isDisabled = true;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(fixture.nativeElement.children[3].children[0].attributes.disabled).toBeTruthy();
        expect(fixture.nativeElement.children[3].children[0].getAttribute('tabindex')).toBe('-1');
    }));

    it('should have disabled class when isDisabled is true', fakeAsync(() => {
        fixture.detectChanges();
        fixture.componentInstance.isDisabled = true;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(fixture.nativeElement.children[3].classList.contains('disabled')).toBeTruthy();
        expect(window.getComputedStyle(fixture.nativeElement.children[3].children[0], null).getPropertyValue('cursor')).toEqual('default');
    }));

    it('should have correct class when it‘s indeterminate is true', fakeAsync(() => {
        fixture.detectChanges();
        expect(fixture.nativeElement.children[0].children[0].classList.contains('form-check-indeterminate')).toBeTruthy();

        fixture.nativeElement.children[0].click();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(fixture.nativeElement.children[0].children[0].classList.contains('form-check-indeterminate')).toBeFalsy();
    }));
});
