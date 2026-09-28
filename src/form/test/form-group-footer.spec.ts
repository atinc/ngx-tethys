import {
    ThyFormModule,
    ThyFormGroupFooter,
    ThyFormDirective,
    THY_FORM_CONFIG,
    ThyFormLayout
} from 'ngx-tethys/form';
import { Component, DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { bypassSanitizeProvider, injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { provideHttpClient, withXhr } from '@angular/common/http';

@Component({
    selector: 'thy-test-form-group-footer-basic',
    template: `
        <thy-form-group-footer [thyAlign]="align">
            <button></button>
        </thy-form-group-footer>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyFormGroupFooter]
})
export class FormGroupFooterComponent {
    align = '';
}

describe('form-group-footer', () => {
    let fixture!: ComponentFixture<FormGroupFooterComponent>;
    let formGroupFooterComponent!: FormGroupFooterComponent;
    let debugElement!: DebugElement;
    let thyFormDirective: {
        isHorizontal: boolean;
    };

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
            thyFormDirective = TestBed.inject(ThyFormDirective);
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
            thyFormDirective = TestBed.inject(ThyFormDirective);
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

@Component({
    selector: 'thy-test-form-group-footer-layout-sync',
    template: `
        <form thyForm name="footerLayoutForm" [thyLayout]="layout">
            <thy-form-group-footer></thy-form-group-footer>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyFormModule, FormsModule]
})
export class FormGroupFooterLayoutSyncComponent {
    layout: ThyFormLayout = 'horizontal';
}

describe('form-group-footer layout sync', () => {
    let fixture!: ComponentFixture<FormGroupFooterLayoutSyncComponent>;
    let testComponent!: FormGroupFooterLayoutSyncComponent;
    let footerHost!: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyFormModule],
            providers: [bypassSanitizeProvider, provideHttpClient(withXhr())]
        }).compileComponents();

        injectDefaultSvgIconSet();
        fixture = TestBed.createComponent(FormGroupFooterLayoutSyncComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        footerHost = fixture.debugElement.query(By.directive(ThyFormGroupFooter)).nativeElement as HTMLElement;
    });

    function footerInner(): HTMLElement {
        return footerHost.querySelector('.form-group-footer') as HTMLElement;
    }

    it('should apply horizontal footer offset when thyLayout is horizontal', () => {
        expect(footerHost.classList.contains('row')).toBe(true);
        expect(footerInner().classList.contains('offset-sm-2')).toBe(true);
        expect(footerInner().classList.contains('col-sm-10')).toBe(true);
    });

    it('should update footer classes when thyLayout changes from horizontal to vertical', () => {
        testComponent.layout = 'vertical';
        fixture.detectChanges();

        expect(footerHost.classList.contains('row')).toBe(false);
        expect(footerInner().classList.contains('offset-sm-2')).toBe(false);
        expect(footerInner().classList.contains('col-sm-10')).toBe(false);
    });

    it('should update footer classes when thyLayout changes from vertical back to horizontal', () => {
        testComponent.layout = 'vertical';
        fixture.detectChanges();
        testComponent.layout = 'horizontal';
        fixture.detectChanges();

        expect(footerHost.classList.contains('row')).toBe(true);
        expect(footerInner().classList.contains('offset-sm-2')).toBe(true);
    });
});
