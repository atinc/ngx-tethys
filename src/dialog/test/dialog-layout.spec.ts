import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { bypassSanitizeProvider, injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { THY_DIALOG_LAYOUT_CONFIG, ThyDialogFooter, ThyDialogHeader, ThyDialogModule } from 'ngx-tethys/dialog';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'thy-test-dialog-header-basic',
    template: ` <thy-dialog-header [thyDivided]="divided" [thySize]="size" thyTitle="I am dialog header"></thy-dialog-header> `,
    imports: [ThyDialogModule]
})
class DialogHeaderBasicComponent {
    size: 'lg' | 'md';

    divided = false;
}

@Component({
    selector: 'thy-test-dialog-footer-basic',
    template: `
        <thy-dialog-footer class="new" [thyAlign]="align" [thyDivided]="divided">
            <div class="btn-pair"></div>
            <ng-template #description>
                <span>这是描述</span>
            </ng-template>
        </thy-dialog-footer>
        <thy-dialog-footer class="showBorder" [thyDivided]="showBorderTop"> </thy-dialog-footer>
        <thy-dialog-footer class="noConfig"></thy-dialog-footer>
    `,
    imports: [ThyDialogFooter]
})
class DialogFooterBasicTestComponent {
    showBorderTop: boolean;

    align = '';

    divided: boolean;
}

@Component({
    selector: 'thy-test-dialog-header-basic',
    template: ` <thy-dialog-header thyTitleTranslationKey="Translation Key Title"></thy-dialog-header> `,
    imports: [ThyDialogModule]
})
class DialogHeaderTitleTranslationComponent {}

describe('dialog-layout', () => {
    describe('dialog-header', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [bypassSanitizeProvider, provideHttpClient()]
            });
            TestBed.compileComponents();

            injectDefaultSvgIconSet();
        });

        let dialogBasicFixture: ComponentFixture<DialogHeaderBasicComponent>;
        let dialogHeaderDebugElement: DebugElement;
        let dialogHeaderElement: HTMLElement;

        beforeEach(() => {
            dialogBasicFixture = TestBed.createComponent(DialogHeaderBasicComponent);
            dialogBasicFixture.detectChanges();
            dialogHeaderDebugElement = dialogBasicFixture.debugElement.query(By.directive(ThyDialogHeader));
            dialogHeaderElement = dialogHeaderDebugElement.nativeElement;
        });

        it('should create dialog header', () => {
            expect(dialogHeaderDebugElement).toBeTruthy();
        });

        it('should get correct class', () => {
            expect(dialogHeaderElement.classList.contains('dialog-header')).toBeTruthy(); // dialog-header 样式即将废弃
            expect(dialogHeaderElement.classList.contains('thy-dialog-header')).toBeTruthy();
        });

        it('should set header divided', () => {
            expect(dialogHeaderElement.classList.contains('thy-dialog-header-divided')).toBeFalsy();
            dialogBasicFixture.componentInstance.divided = true;
            dialogBasicFixture.detectChanges();
            expect(dialogHeaderElement.classList.contains('thy-dialog-header-divided')).toBeTruthy();
        });

        it('should get correct title', () => {
            expect(dialogHeaderElement.textContent.includes('I am dialog header')).toBeTruthy();
        });

        it('should get correct class when size is lg', () => {
            dialogBasicFixture.componentInstance.size = 'lg';
            dialogBasicFixture.detectChanges();
            expect(dialogHeaderElement.classList.contains('thy-dialog-header-lg')).toBeTruthy();
        });
    });

    describe('dialog-header-title-translation', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [bypassSanitizeProvider, provideHttpClient()]
            });
            TestBed.compileComponents();

            injectDefaultSvgIconSet();
        });

        let dialogBasicFixture: ComponentFixture<DialogHeaderTitleTranslationComponent>;
        let dialogHeaderDebugElement: DebugElement;
        let dialogHeaderElement: HTMLElement;

        beforeEach(() => {
            dialogBasicFixture = TestBed.createComponent(DialogHeaderTitleTranslationComponent);
            dialogBasicFixture.detectChanges();
            dialogHeaderDebugElement = dialogBasicFixture.debugElement.query(By.directive(ThyDialogHeader));
            dialogHeaderElement = dialogHeaderDebugElement.nativeElement;
        });

        it('should show thyTitle when header only set thyTitleTranslationKey', () => {
            expect(dialogHeaderElement.innerHTML.includes('Translation Key Title')).toBeTruthy();
        });
    });

    describe('dialog-footer', () => {
        let dialogBasicFixture: ComponentFixture<DialogFooterBasicTestComponent>;
        let dialogFooterNewDebugElement: DebugElement;
        let dialogFooterBorderDebugElement: DebugElement;
        let dialogFooterNoConfigDebugElement: DebugElement;

        describe('without global dialog layout config', () => {
            beforeEach(() => {
                TestBed.configureTestingModule({
                    imports: [ThyDialogModule],
                    providers: [bypassSanitizeProvider, provideHttpClient()]
                });
                TestBed.compileComponents();

                injectDefaultSvgIconSet();
            });

            beforeEach(() => {
                dialogBasicFixture = TestBed.createComponent(DialogFooterBasicTestComponent);
                dialogFooterNewDebugElement = dialogBasicFixture.debugElement.query(By.css('.new'));
                dialogFooterBorderDebugElement = dialogBasicFixture.debugElement.query(By.css('.showBorder'));
                dialogFooterNoConfigDebugElement = dialogBasicFixture.debugElement.query(By.css('.noConfig'));
            });

            it('should create dialog footer', () => {
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNewDebugElement).toBeTruthy();
            });

            it('should get correct class', () => {
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNewDebugElement.nativeElement.classList.contains('dialog-footer')).toBeTruthy();
                expect(dialogFooterNewDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeFalsy();
            });

            it('should get correct class when thyDivided is none', () => {
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNoConfigDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeFalsy();
            });

            it('should get correct class when thyDivided is true', () => {
                dialogBasicFixture.componentInstance.showBorderTop = true;
                dialogBasicFixture.detectChanges();
                expect(dialogFooterBorderDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeTruthy();
            });

            it('should get correct class when thyDivided is false', () => {
                dialogBasicFixture.componentInstance.showBorderTop = false;
                dialogBasicFixture.detectChanges();
                expect(dialogFooterBorderDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeFalsy();
            });

            it('should get description when has description template', () => {
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNewDebugElement.query(By.css('.dialog-footer-actions'))).toBeDefined();
            });

            it('should get correct class when thyAlign is none', () => {
                dialogBasicFixture.componentInstance.align = '';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNewDebugElement.nativeElement.classList.contains('dialog-footer-actions-align-left')).toBeTruthy();
            });

            it('should get correct class when thyAlign is left', () => {
                dialogBasicFixture.componentInstance.align = 'left';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNewDebugElement.nativeElement.classList.contains('dialog-footer-actions-align-left')).toBeTruthy();
            });

            it('should get correct class when thyAlign is center', () => {
                dialogBasicFixture.componentInstance.align = 'center';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNewDebugElement.nativeElement.classList.contains('dialog-footer-actions-align-center')).toBeTruthy();
            });

            it('should get correct class when thyAlign is right', () => {
                dialogBasicFixture.componentInstance.align = 'right';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNewDebugElement.nativeElement.classList.contains('dialog-footer-actions-align-right')).toBeTruthy();
            });

            it('should get correct class when thyDivided is none', () => {
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNoConfigDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeFalsy();
            });

            it('should get correct class when thyDivided is true', () => {
                dialogBasicFixture.componentInstance.divided = true;
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNewDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeTruthy();
            });

            it('should get correct class when thyDivided is false', () => {
                dialogBasicFixture.componentInstance.divided = false;
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNewDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeFalsy();
            });
        });
        describe('with global dialog layout config', () => {
            beforeEach(() => {
                TestBed.configureTestingModule({
                    imports: [ThyDialogModule],
                    providers: [
                        bypassSanitizeProvider,
                        provideHttpClient(),
                        {
                            provide: THY_DIALOG_LAYOUT_CONFIG,
                            useValue: {
                                footerAlign: 'right',
                                footerDivided: true
                            }
                        }
                    ]
                });
                TestBed.compileComponents();

                injectDefaultSvgIconSet();
            });

            beforeEach(() => {
                dialogBasicFixture = TestBed.createComponent(DialogFooterBasicTestComponent);
                dialogFooterNewDebugElement = dialogBasicFixture.debugElement.query(By.css('.new'));
                dialogFooterBorderDebugElement = dialogBasicFixture.debugElement.query(By.css('.showBorder'));
                dialogFooterNoConfigDebugElement = dialogBasicFixture.debugElement.query(By.css('.noConfig'));
            });

            it('should get correct class when thyAlign is none', () => {
                dialogBasicFixture.componentInstance.align = '';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNoConfigDebugElement.nativeElement.classList.contains('dialog-footer-actions-align-right')).toBeTruthy();
            });

            it('should get correct class when thyAlign is left', () => {
                dialogBasicFixture.componentInstance.align = 'left';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNewDebugElement.nativeElement.classList.contains('dialog-footer-actions-align-left')).toBeTruthy();
            });

            it('should get correct class when thyAlign is center', () => {
                dialogBasicFixture.componentInstance.align = 'center';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNewDebugElement.nativeElement.classList.contains('dialog-footer-actions-align-center')).toBeTruthy();
            });

            it('should get correct class when thyAlign is right', () => {
                dialogBasicFixture.componentInstance.align = 'right';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNewDebugElement.nativeElement.classList.contains('dialog-footer-actions-align-right')).toBeTruthy();
            });

            it('should get correct class when thyDivided is none', () => {
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNoConfigDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeTruthy();
            });

            it('should get correct class when thyDivided is true', () => {
                dialogBasicFixture.componentInstance.divided = true;
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNewDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeTruthy();
            });

            it('should get correct class when thyDivided is false', () => {
                dialogBasicFixture.componentInstance.divided = false;
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNewDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeFalsy();
            });

            it('should get correct class when thyDivided is none', () => {
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNoConfigDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeTruthy();
            });

            it('should get correct class when thyDivided is true', () => {
                dialogBasicFixture.componentInstance.showBorderTop = true;
                dialogBasicFixture.detectChanges();
                expect(dialogFooterBorderDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeTruthy();
            });

            it('should get correct class when thyDivided is false', () => {
                dialogBasicFixture.componentInstance.showBorderTop = false;
                dialogBasicFixture.detectChanges();
                expect(dialogFooterBorderDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeFalsy();
            });
        });
    });
});
