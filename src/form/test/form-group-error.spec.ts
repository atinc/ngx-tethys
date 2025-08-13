import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ThyFormDirective, ThyFormGroupError, ThyFormModule } from 'ngx-tethys/form';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'thy-test-form-group-error-basic',
    template: ` <thy-form-group-error [thyErrors]="errors" [thyShowFirst]="showFirst"> </thy-form-group-error> `,
    imports: [ThyFormModule, FormsModule]
})
export class TestFormGroupErrorBasicComponent {
    align = '';

    errors = ['first error', 'second error'];

    showFirst = true;
}

describe('form-group-error', () => {
    let fixture: ComponentFixture<TestFormGroupErrorBasicComponent> | undefined = undefined;
    let formGroupFooterComponent: TestFormGroupErrorBasicComponent | undefined = undefined;
    let debugElement: DebugElement | undefined = undefined;
    let thyFormDirective: {
        isHorizontal: boolean;
    };

    describe('isHorizontal', () => {
        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                providers: [
                    provideHttpClient(),
                    {
                        provide: ThyFormDirective,
                        useValue: {
                            isHorizontal: true,
                            validator: {
                                errors: ['parent error message']
                            }
                        }
                    }
                ]
            });

            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestFormGroupErrorBasicComponent);
            formGroupFooterComponent = fixture.debugElement.componentInstance;
            debugElement = fixture.debugElement.query(By.directive(ThyFormGroupError));
            thyFormDirective = TestBed.inject(ThyFormDirective);
        });

        it('should create form group error success', () => {
            fixture.detectChanges();
            const formGroupErrorElement: HTMLElement = debugElement.nativeElement;
            expect(formGroupErrorElement.classList.contains('row')).toBeTruthy();
            expect(formGroupErrorElement.classList.contains('form-group')).toBeTruthy();
            expect(formGroupErrorElement.children[0].classList.contains('col-sm-10')).toBe(true);
            expect(formGroupErrorElement.children[0].classList.contains('offset-sm-2')).toBe(true);
            expect(formGroupErrorElement.children[0].classList.contains('col-form-control')).toBe(true);
            expect(formGroupErrorElement.textContent).toEqual(`first error`);
        });

        it('should show parent errors', () => {
            fixture.componentInstance.errors = null;
            fixture.detectChanges();
            const formGroupErrorElement: HTMLElement = debugElement.nativeElement;
            expect(formGroupErrorElement.textContent).toEqual(`parent error message`);
        });

        it('should show all errors', () => {
            fixture.componentInstance.showFirst = false;
            fixture.detectChanges();
            const formGroupErrorElement: HTMLElement = debugElement.nativeElement;
            expect(formGroupErrorElement.textContent).toContain(`first error`);
            expect(formGroupErrorElement.textContent).toContain(`second error`);
        });
    });

    describe('vertical', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    provideHttpClient(),
                    {
                        provide: ThyFormDirective,
                        useValue: {
                            isHorizontal: false
                        }
                    }
                ]
            });

            TestBed.compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(TestFormGroupErrorBasicComponent);
            formGroupFooterComponent = fixture.debugElement.componentInstance;
            debugElement = fixture.debugElement.query(By.directive(ThyFormGroupError));
            thyFormDirective = TestBed.inject(ThyFormDirective);
        });

        it('should create form error success', () => {
            fixture.detectChanges();
            const formGroupErrorElement: HTMLElement = debugElement.nativeElement;
            expect(formGroupErrorElement.classList.contains('form-group')).toBeTruthy();
            expect(formGroupErrorElement.classList.contains('row')).toBeFalsy();
            expect(formGroupErrorElement.children[0].classList.contains('col-sm-10')).toBe(false);
            expect(formGroupErrorElement.children[0].classList.contains('offset-sm-2')).toBe(false);
            expect(formGroupErrorElement.children[0].classList.contains('col-form-control')).toBe(false);
            expect(formGroupErrorElement.textContent).toEqual(`first error`);
        });
    });
});
