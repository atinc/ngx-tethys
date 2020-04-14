import { ThyFormModule } from './../module';
import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyFormDirective } from '../form.directive';
import { FormTestModule, TestBedFormDirectiveComponent } from './module';
import { ThyLayoutModule } from '../../layout/layout.module';

@NgModule({
    imports: [ThyFormModule, FormTestModule, ThyLayoutModule],
    declarations: [],
    exports: []
})
export class FormDirectiveTestModule {}

describe('form directive', () => {
    let fixture: ComponentFixture<TestBedFormDirectiveComponent>;
    let basicTestComponent: TestBedFormDirectiveComponent;
    let debugElement: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormDirectiveTestModule],
            providers: []
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestBedFormDirectiveComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(ThyFormDirective));
    });

    it('should has correct class when thyLayout is none', () => {
        basicTestComponent.thyLayout = 'horizontal';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('thy-form-horizontal')).toBe(true);
    });

    it('should has correct class when thyLayout is global vertical', () => {
        basicTestComponent.thyLayout = 'vertical';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('thy-form-vertical')).toBe(true);
    });

    it('should has correct class when thyLayout is horizontal', () => {
        basicTestComponent.thyLayout = 'horizontal';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('thy-form-horizontal')).toBe(true);
    });

    it('should has correct class when thyLayout is vertical', () => {
        basicTestComponent.thyLayout = 'vertical';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('thy-form-vertical')).toBe(true);
    });

    it('should has correct class when thyLayout is inline', () => {
        basicTestComponent.thyLayout = 'inline';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('thy-form-inline')).toBe(true);
    });
});
