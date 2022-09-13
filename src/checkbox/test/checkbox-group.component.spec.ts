import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyCheckboxGroupComponent } from '../checkbox-group.component';
import { ThyCheckboxModule } from '../module';

@Component({
    selector: 'thy-checkout-group-test',
    template: `
        <thy-checkbox-group
            [(ngModel)]="model"
            [thyInline]="inlineStatus"
            [thyLabelTextKey]="labelTextKey"
            name="group"
        ></thy-checkbox-group>
    `
})
class CheckboxGroupTestComponent {
    public inlineStatus = true;

    public labelTextKey = 'name';

    public model = [
        { name: 'item1', key: 'option1', checked: true },
        { name: 'item2', key: 'option2', checked: true },
        { name: 'item3', key: 'option3', checked: false },
        { name: 'item4', key: 'option4', disabled: true, checked: false },
        { name: 'item5', key: 'option5', checked: true }
    ];
}

describe('checkbox-group component', () => {
    let fixture: ComponentFixture<CheckboxGroupTestComponent>;
    let checkboxGroupTestComponent: CheckboxGroupTestComponent;
    let CheckboxGroupComponent: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyCheckboxModule, FormsModule],
            declarations: [CheckboxGroupTestComponent],
            providers: []
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxGroupTestComponent);
        checkboxGroupTestComponent = fixture.debugElement.componentInstance;
        CheckboxGroupComponent = fixture.debugElement.query(By.directive(ThyCheckboxGroupComponent));
    });

    it('should create', () => {
        expect(checkboxGroupTestComponent).toBeTruthy();
        expect(CheckboxGroupComponent.nativeElement).toBeTruthy();
    });

    it('should have correct group list', fakeAsync(() => {
        fixture.detectChanges();
        tick(3000);
        fixture.detectChanges();
        expect(CheckboxGroupComponent.nativeElement.children.length).toEqual(fixture.componentInstance.model.length);
    }));

    it('should select when click', fakeAsync(() => {
        fixture.detectChanges();
        tick(3000);
        fixture.detectChanges();
        expect(fixture.componentInstance.model[2].checked).toBe(false);
        CheckboxGroupComponent.nativeElement.children[2].click();
        fixture.detectChanges();
        expect(fixture.componentInstance.model[2].checked).toBe(true);
        expect(CheckboxGroupComponent.nativeElement.children[2].classList.contains('form-check-checked')).toBeTruthy();
    }));

    it('should disabled when checkbox group item disabled is true', fakeAsync(() => {
        fixture.detectChanges();
        tick(3000);
        fixture.detectChanges();
        expect(CheckboxGroupComponent.nativeElement.children[3].children[0].attributes.disabled).toBeTruthy();
        fixture.componentInstance.model[3].disabled = false;
        fixture.detectChanges();
        expect(CheckboxGroupComponent.nativeElement.children[3].children[0].attributes.disabled).toBeFalsy();
    }));

    it('should show correct key when labelTextKey is changed', fakeAsync(() => {
        fixture.detectChanges();
        tick(3000);
        fixture.detectChanges();
        expect(CheckboxGroupComponent.nativeElement.children[3].children[1].innerText).toEqual(fixture.componentInstance.model[3].name);

        fixture.componentInstance.labelTextKey = 'key';
        fixture.detectChanges();
        expect(CheckboxGroupComponent.nativeElement.children[3].children[1].innerText).toEqual(fixture.componentInstance.model[3].key);
    }));
});
