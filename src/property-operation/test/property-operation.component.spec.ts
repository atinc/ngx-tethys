import { ApplicationRef, Component, DebugElement, ViewChild } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyPropertyOperationModule, ThyPropertyOperation } from 'ngx-tethys/property-operation';
import { By } from '@angular/platform-browser';
import { ThyButtonIcon } from 'ngx-tethys/button';
import { injectDefaultSvgIconSet, bypassSanitizeProvider } from 'ngx-tethys/testing';
import { provideHttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';

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
            (thyClick)="thyOnclick()">
        </thy-property-operation>
    `,
    imports: [ThyPropertyOperationModule, NgClass]
})
class PropertyOperationBasicComponent {
    @ViewChild(ThyPropertyOperation, { static: true }) component: ThyPropertyOperation;

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

describe('ThyPropertyOperation', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyPropertyOperationModule],
            providers: [bypassSanitizeProvider, provideHttpClient()]
        }).compileComponents();

        injectDefaultSvgIconSet();
    });

    describe('test begin', () => {
        let fixture: ComponentFixture<PropertyOperationBasicComponent> | undefined = undefined;
        let componentInstance: PropertyOperationBasicComponent | undefined = undefined;
        let propertyOperationDebugElement: DebugElement | undefined = undefined;
        let propertyOperationElement: HTMLElement | undefined = undefined;

        beforeEach(() => {
            fixture = TestBed.createComponent(PropertyOperationBasicComponent);
            componentInstance = fixture.debugElement.componentInstance;
            propertyOperationDebugElement = fixture.debugElement.query(By.directive(ThyPropertyOperation));
            propertyOperationElement = propertyOperationDebugElement.nativeElement;
            fixture.detectChanges();
        });

        it('should get correct class', () => {
            expect(propertyOperationDebugElement).toBeTruthy();
            expect(propertyOperationElement).toBeTruthy();
            expect(propertyOperationElement.classList.contains(`thy-property-operation`)).toBeTruthy();
            const operationIconElement = propertyOperationElement.querySelector(`.thy-operation-icon`);
            const operationContentElement = propertyOperationElement.querySelector(`.thy-operation-content`);
            expect(operationIconElement).toBeTruthy();
            expect(operationContentElement).toBeTruthy();

            const btnIcon = fixture.debugElement.query(By.directive(ThyButtonIcon));
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

        xit('should get correct icon', () => {
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

        describe('change detection behavior', () => {
            it('should not run change detection if the operation is disabled', () => {
                componentInstance.disabled = true;
                fixture.detectChanges();

                const appRef = TestBed.inject(ApplicationRef);
                spyOn(appRef, 'tick');

                propertyOperationElement.click();

                expect(appRef.tick).not.toHaveBeenCalled();
            });

            it('should not run change detection if there are no `thyClick` observers', () => {
                componentInstance.component.thyClick.observers = [];

                const appRef = TestBed.inject(ApplicationRef);
                spyOn(appRef, 'tick');

                propertyOperationElement.click();

                expect(appRef.tick).not.toHaveBeenCalled();

                componentInstance.component.thyClick.subscribe();
                propertyOperationElement.click();

                expect(appRef.tick).toHaveBeenCalled();
            });
        });
    });
});
