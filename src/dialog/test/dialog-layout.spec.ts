import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyDialogModule } from '../dialog.module';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DialogHeaderComponent } from '../header/dialog-header.component';
import { bypassSanitizeProvider, injectDefaultSvgIconSet } from 'ngx-tethys/testing/thy-icon';
import { DialogFooterComponent } from '../footer/dialog-footer.component';
import { THY_DIALOG_LAYOUT_CONFIG } from '../dialog.config';

@Component({
    selector: 'dialog-header-basic',
    template: `
        <thy-dialog-header [thySize]="size" thyTitle="I am dialog header"></thy-dialog-header>
    `
})
class DialogHeaderBasicComponent {
    size: 'lg' | 'md';
}

@Component({
    selector: 'dialog-footer-basic',
    template: `
        <thy-dialog-footer class="new" [thyAlign]="align" [thyDivided]="divided">
            <div class="btn-pair"></div>
            <ng-template #description>
                <span>这是描述</span>
            </ng-template>
        </thy-dialog-footer>
        <thy-dialog-footer class="showBorder" [thyShowBorderTop]="showBorderTop"> </thy-dialog-footer>
        <thy-dialog-footer class="noConfig"></thy-dialog-footer>
    `
})
class DialogFooterBasicComponent {
    showBorderTop: boolean;

    align = '';

    divided;
}

describe('dialog-layout', () => {
    describe('dialog-header', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThyDialogModule],
                declarations: [DialogHeaderBasicComponent],
                providers: [bypassSanitizeProvider]
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
            dialogHeaderDebugElement = dialogBasicFixture.debugElement.query(By.directive(DialogHeaderComponent));
            dialogHeaderElement = dialogHeaderDebugElement.nativeElement;
        });

        it('should create dialog header', () => {
            expect(dialogHeaderDebugElement).toBeTruthy();
        });

        it('should get correct class', () => {
            expect(dialogHeaderElement.classList.contains('dialog-header')).toBeTruthy();
        });

        it('should get correct title', () => {
            expect(dialogHeaderElement.textContent.includes('I am dialog header')).toBeTruthy();
        });

        it('should get correct class when size is lg', () => {
            dialogBasicFixture.componentInstance.size = 'lg';
            dialogBasicFixture.detectChanges();
            expect(dialogHeaderElement.classList.contains('dialog-header-lg')).toBeTruthy();
        });
    });

    describe('dialog-footer', () => {
        let dialogBasicFixture: ComponentFixture<DialogFooterBasicComponent>;
        let dialogFooterNewDebugElement: DebugElement;
        let dialogFooterBorderDebugElement: DebugElement;
        let dialogFooterNoConfigDebugElement: DebugElement;

        describe('without global dialog layout config', () => {
            beforeEach(() => {
                TestBed.configureTestingModule({
                    imports: [ThyDialogModule],
                    declarations: [DialogFooterBasicComponent],
                    providers: [bypassSanitizeProvider]
                });
                TestBed.compileComponents();

                injectDefaultSvgIconSet();
            });

            beforeEach(() => {
                dialogBasicFixture = TestBed.createComponent(DialogFooterBasicComponent);
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

            it('should get correct class when thyShowBorderTop is none', () => {
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNoConfigDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeFalsy();
            });

            it('should get correct class when thyShowBorderTop is true', () => {
                dialogBasicFixture.componentInstance.showBorderTop = true;
                dialogBasicFixture.detectChanges();
                expect(dialogFooterBorderDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeTruthy();
            });

            it('should get correct class when thyShowBorderTop is false', () => {
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
                    declarations: [DialogFooterBasicComponent],
                    providers: [
                        bypassSanitizeProvider,
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
                dialogBasicFixture = TestBed.createComponent(DialogFooterBasicComponent);
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

            it('should get correct class when thyShowBorderTop is none', () => {
                dialogBasicFixture.detectChanges();
                expect(dialogFooterNoConfigDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeTruthy();
            });

            it('should get correct class when thyShowBorderTop is true', () => {
                dialogBasicFixture.componentInstance.showBorderTop = true;
                dialogBasicFixture.detectChanges();
                expect(dialogFooterBorderDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeTruthy();
            });

            it('should get correct class when thyShowBorderTop is false', () => {
                dialogBasicFixture.componentInstance.showBorderTop = false;
                dialogBasicFixture.detectChanges();
                expect(dialogFooterBorderDebugElement.nativeElement.classList.contains('dialog-footer-border-top')).toBeFalsy();
            });
        });
    });
});
