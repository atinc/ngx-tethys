import { ThyFormModule, ThyFormGroupFooter, ThyFormDirective, THY_FORM_CONFIG } from 'ngx-tethys/form';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'thy-test-form-group-footer-basic',
    template: `
        <thy-form-group-footer [thyAlign]="align">
            <button></button>
        </thy-form-group-footer>
    `,
    imports: [ThyFormGroupFooter]
})
export class FormGroupFooterComponent {
    align = '';
}

describe('form-group-footer', () => {
    let fixture: ComponentFixture<FormGroupFooterComponent> | undefined = undefined;
    let formGroupFooterComponent: FormGroupFooterComponent | undefined = undefined;
    let debugElement: DebugElement | undefined = undefined;
    let thyFormDirective:
        | {
              isHorizontal: boolean;
          }
        | undefined = undefined;

    describe('without global config', () => {
        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyFormModule],
                providers: [
                    {
                        provide: ThyFormDirective,
                        useValue: {
                            isHorizontal: true
                        }
                    }
                ]
            });

            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormGroupFooterComponent);
            formGroupFooterComponent = fixture.debugElement.componentInstance;
            debugElement = fixture.debugElement.query(By.directive(ThyFormGroupFooter));
            thyFormDirective = TestBed.get(ThyFormDirective);
        });
        it('should has correct class when form.isHorizontal = false', () => {
            fixture.detectChanges();
            expect(debugElement.nativeElement.classList.contains('row')).toBeTruthy();
            const containerElement = debugElement.query(By.css('.form-group-footer'));
            expect(containerElement.nativeElement.classList.contains('offset-sm-2')).toBeTruthy();
        });

        it('should has correct class when thyAlign is none', () => {
            fixture.detectChanges();
            const containerElement = debugElement.query(By.css('.form-group-footer'));
            expect(containerElement.nativeElement.classList.contains('form-group-footer-align-left')).toBeTruthy();
        });

        it('should has correct class when thyAlign is left', () => {
            formGroupFooterComponent.align = 'left';
            fixture.detectChanges();
            const containerElement = debugElement.query(By.css('.form-group-footer'));
            expect(containerElement.nativeElement.classList.contains('form-group-footer-align-left')).toBeTruthy();
        });

        it('should has correct class when thyAlign is right', () => {
            formGroupFooterComponent.align = 'right';
            fixture.detectChanges();
            const containerElement = debugElement.query(By.css('.form-group-footer'));
            expect(containerElement.nativeElement.classList.contains('form-group-footer-align-right')).toBeTruthy();
        });

        it('should has correct class when thyAlign is center', () => {
            formGroupFooterComponent.align = 'center';
            fixture.detectChanges();
            const containerElement = debugElement.query(By.css('.form-group-footer'));
            expect(containerElement.nativeElement.classList.contains('form-group-footer-align-center')).toBeTruthy();
        });
    });

    describe('has global config', () => {
        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThyFormModule],
                providers: [
                    {
                        provide: ThyFormDirective,
                        useValue: {
                            isHorizontal: false
                        }
                    },
                    {
                        provide: THY_FORM_CONFIG,
                        useValue: { footerAlign: 'right' }
                    }
                ]
            });

            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormGroupFooterComponent);
            formGroupFooterComponent = fixture.debugElement.componentInstance;
            debugElement = fixture.debugElement.query(By.directive(ThyFormGroupFooter));
            thyFormDirective = TestBed.get(ThyFormDirective);
        });

        it('should has correct class when form.isHorizontal = false', () => {
            thyFormDirective = { isHorizontal: false };
            fixture.detectChanges();
            expect(debugElement.nativeElement.classList.contains('row')).toBeFalsy();
            const containerElement = debugElement.query(By.css('.form-group-footer'));
            expect(containerElement.nativeElement.classList.contains('offset-sm-2')).toBeFalsy();
        });

        it('should has correct class when thyAlign is none', () => {
            fixture.detectChanges();
            const containerElement = debugElement.query(By.css('.form-group-footer'));
            expect(containerElement.nativeElement.classList.contains('form-group-footer-align-right')).toBeTruthy();
        });

        it('should has correct class when thyAlign is left', () => {
            formGroupFooterComponent.align = 'left';
            fixture.detectChanges();
            const containerElement = debugElement.query(By.css('.form-group-footer'));
            expect(containerElement.nativeElement.classList.contains('form-group-footer-align-left')).toBeTruthy();
        });

        it('should has correct class when thyAlign is right', () => {
            formGroupFooterComponent.align = 'right';
            fixture.detectChanges();
            const containerElement = debugElement.query(By.css('.form-group-footer'));
            expect(containerElement.nativeElement.classList.contains('form-group-footer-align-right')).toBeTruthy();
        });

        it('should has correct class when thyAlign is center', () => {
            formGroupFooterComponent.align = 'center';
            fixture.detectChanges();
            const containerElement = debugElement.query(By.css('.form-group-footer'));
            expect(containerElement.nativeElement.classList.contains('form-group-footer-align-center')).toBeTruthy();
        });
    });
});
