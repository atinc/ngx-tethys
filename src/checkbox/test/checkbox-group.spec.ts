import { Component, DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyCheckboxGroup, ThyCheckboxOption, ThyCheckboxModule } from 'ngx-tethys/checkbox';

@Component({
    selector: 'thy-checkbox-group-test',
    template: `
        <thy-checkbox-group
            [(ngModel)]="values"
            [thyOptions]="options"
            [thyDisabled]="disabled"
            [thyInline]="inline"></thy-checkbox-group>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCheckboxModule, FormsModule]
})
class CheckboxGroupTestComponent {
    values: Array<string | number | boolean> = ['dog'];
    disabled = false;
    inline = false;
    options: ThyCheckboxOption[] = [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
        { label: 'Rabbit', value: 'rabbit', disabled: true }
    ];
}

describe('checkbox-group component', () => {
    let fixture!: ComponentFixture<CheckboxGroupTestComponent>;
    let testComponent!: CheckboxGroupTestComponent;
    let groupDebugElement!: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxGroupTestComponent);
        testComponent = fixture.debugElement.componentInstance;
        groupDebugElement = fixture.debugElement.query(By.directive(ThyCheckboxGroup));
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(testComponent).toBeTruthy();
        expect(groupDebugElement.nativeElement.classList.contains('thy-checkbox-group')).toBeTruthy();
        expect(groupDebugElement.nativeElement.querySelectorAll('.thy-checkbox').length).toBe(3);
    });

    it('should check option from ngModel value', fakeAsync(() => {
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        const inputs = groupDebugElement.nativeElement.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        expect(inputs[0].checked).toBe(true);
        expect(inputs[1].checked).toBe(false);
        expect(inputs[2].checked).toBe(false);
    }));

    it('should update ngModel when click option', fakeAsync(() => {
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const checkboxes = groupDebugElement.nativeElement.querySelectorAll('.thy-checkbox') as NodeListOf<HTMLElement>;
        checkboxes[1].click();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        expect(testComponent.values).toEqual(['dog', 'cat']);
    }));

    it('should uncheck option when click checked option', fakeAsync(() => {
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const checkboxes = groupDebugElement.nativeElement.querySelectorAll('.thy-checkbox') as NodeListOf<HTMLElement>;
        checkboxes[0].click();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        expect(testComponent.values).toEqual([]);
    }));

    it('should not toggle disabled option', fakeAsync(() => {
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const inputs = groupDebugElement.nativeElement.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        expect(inputs[2].disabled).toBe(true);

        const checkboxes = groupDebugElement.nativeElement.querySelectorAll('.thy-checkbox') as NodeListOf<HTMLElement>;
        checkboxes[2].click();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        expect(testComponent.values).toEqual(['dog']);
    }));

    it('should disable all options when thyDisabled is true', fakeAsync(() => {
        fixture.detectChanges();
        testComponent.disabled = true;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const inputs = groupDebugElement.nativeElement.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        expect(Array.from(inputs).every(input => input.disabled)).toBe(true);

        const checkboxes = groupDebugElement.nativeElement.querySelectorAll('.thy-checkbox') as NodeListOf<HTMLElement>;
        checkboxes[1].click();
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
        expect(testComponent.values).toEqual(['dog']);
    }));

    it('should add inline class when thyInline is true', fakeAsync(() => {
        fixture.detectChanges();
        testComponent.inline = true;
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const checkboxes = groupDebugElement.nativeElement.querySelectorAll('.thy-checkbox');
        expect(Array.from(checkboxes).every((item: Element) => item.classList.contains('form-check-inline'))).toBe(true);
    }));

    it('should treat empty value as unchecked', fakeAsync(() => {
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        testComponent.values = [];
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();

        const groupComponent = groupDebugElement.componentInstance as ThyCheckboxGroup;
        expect(groupComponent.isChecked('dog')).toBe(false);
        const inputs = groupDebugElement.nativeElement.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        expect(inputs[0].checked).toBe(false);
    }));
});
