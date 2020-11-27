import { Component, DebugElement } from '@angular/core';
import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { ThyPropertyOperationModule } from '../module';
import { By } from '@angular/platform-browser';
import { ThyPropertyOperationComponent } from '../property-operation.component';
import { ThyButtonIconComponent } from '../../button';
import { injectDefaultSvgIconSet, bypassSanitizeProvider, defaultSvgHtml } from '../../core/testing';

//#region test component

@Component({
    template: `
        <thy-property-operation
            [thyIcon]="thyIcon"
            [thyLabelText]="thyLabelText"
            [thyType]="thyType"
            [thyValue]="thyValue"
            [ngClass]="{ active: active }"
            [thyDisabled]="disabled"
            [thyActive]="active"
            [thyLabelHasValue]="thyLabelHasValue"
            [thyShowClose]="thyShowClose"
            (thyOnRemove)="thyOnRemove()"
            (thyClick)="thyOnclick()"
        >
        </thy-property-operation>
    `
})
class PropertyOperationBasicComponent {
    thyIcon = 'calendar-check';

    thyLabelText = '截止时间';

    thyShowClose = true;

    disabled = false;

    active = false;

    thyValue = '2012-12-21';

    thyType = 'danger';

    thyLabelHasValue = true;

    thyOnRemove() {
        this.thyValue = null;
    }

    thyOnclick() {
        this.thyValue = 'hello world!';
    }
}

//#endregion

describe('ThyPropertyOperation', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyPropertyOperationModule],
            declarations: [PropertyOperationBasicComponent],
            providers: [bypassSanitizeProvider]
        }).compileComponents();

        injectDefaultSvgIconSet();
    });

    describe('test begin', () => {
        let fixture: ComponentFixture<PropertyOperationBasicComponent>;
        let componentInstance: PropertyOperationBasicComponent;
        let propertyOperationDebugElement: DebugElement;
        let propertyOperationElement: HTMLElement;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(PropertyOperationBasicComponent);
            componentInstance = fixture.debugElement.componentInstance;
            propertyOperationDebugElement = fixture.debugElement.query(By.directive(ThyPropertyOperationComponent));
            propertyOperationElement = propertyOperationDebugElement.nativeElement;
            fixture.detectChanges();
        }));

        it('should get correct class', () => {
            expect(propertyOperationDebugElement).toBeTruthy();
            expect(propertyOperationElement).toBeTruthy();
            expect(propertyOperationElement.classList.contains(`thy-property-operation`)).toBeTruthy();
            const operationIconElement = propertyOperationElement.querySelector(`.thy-operation-icon`);
            const operationContentElement = propertyOperationElement.querySelector(`.thy-operation-content`);
            expect(operationIconElement).toBeTruthy();
            expect(operationContentElement).toBeTruthy();

            const btnIcon = fixture.debugElement.query(By.directive(ThyButtonIconComponent));
            expect(btnIcon).toBeTruthy();
            expect(btnIcon.nativeElement.classList.contains(`btn`)).toBeTruthy();
            expect(btnIcon.nativeElement.classList.contains(`btn-icon`)).toBeTruthy();
            expect(btnIcon.nativeElement.classList.contains(`btn-icon-circle`)).toBeTruthy();
        });

        it('should active property operation', () => {
            componentInstance.active = true;
            fixture.detectChanges();
            expect(propertyOperationElement.classList.contains(`active`)).toBeTruthy();

            componentInstance.active = false;
            fixture.detectChanges();
            expect(propertyOperationElement.classList.contains(`active`)).not.toBeTruthy();
        });

        it('should get correct value', () => {
            expect(fixture.nativeElement.innerText).toContain(componentInstance.thyValue);
        });

        it('should get correct icon', () => {
            // expect(fixture.nativeElement.querySelector(`.${componentInstance.thyIcon}`)).toBeTruthy();
        });

        it('should get correct label text', () => {
            expect(fixture.nativeElement.innerText).toContain(componentInstance.thyLabelText);
        });

        it('should get close button link', () => {
            expect(fixture.nativeElement.querySelector('.close-link')).toBeTruthy();
        });

        it('should get danger class when input type danger', () => {
            expect(fixture.nativeElement.querySelector('.thy-property-operation-danger')).toBeTruthy();
        });

        it('should clear value on click remove', () => {
            fixture.nativeElement.querySelector('.close-link').click();
            expect(componentInstance.thyValue).toBeNull();
        });

        it('should click property operation', () => {
            propertyOperationElement.click();
            expect(componentInstance.thyValue).toBe('hello world!');
        });

        it('should disable property operation', () => {
            componentInstance.disabled = true;
            fixture.detectChanges();
            propertyOperationElement.click();
            expect(fixture.nativeElement.querySelector('.close-link')).toBeNull();
            expect(propertyOperationElement.classList.contains('thy-property-operation-disabled')).toBeTruthy();
        });
    });
});
