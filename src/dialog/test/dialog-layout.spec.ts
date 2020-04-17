import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyDialogModule } from '../dialog.module';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DialogHeaderComponent } from '../header/dialog-header.component';
import { bypassSanitizeProvider, injectDefaultSvgIconSet } from '../../core/testing/thy-icon';
import { DialogFooterComponent } from '../footer/dialog-footer.component';
import { THY_DIALOG_LAYOUT_CONFIG } from '../dialog.config';

@Component({
    selector: 'dialog-basic',
    template: `
        <thy-dialog-header [thySize]="size" thyTitle="I am dialog header"></thy-dialog-header>
        <thy-dialog-footer [thyShowBorderTop]="showBorderTop" [thyAlign]="align">
            <div class="btn-pair"></div>
            <ng-template #description>
                <span>这是描述</span>
            </ng-template>
        </thy-dialog-footer>
    `
})
class DialogBasicComponent {
    size: 'lg' | 'md';

    showBorderTop: boolean;

    align = '';
}

describe('dialog-layout', () => {
    describe('dialog-header', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThyDialogModule],
                declarations: [DialogBasicComponent],
                providers: [bypassSanitizeProvider]
            });
            TestBed.compileComponents();

            injectDefaultSvgIconSet();
        });

        let dialogBasicFixture: ComponentFixture<DialogBasicComponent>;
        let dialogHeaderDebugElement: DebugElement;
        let dialogHeaderElement: HTMLElement;

        beforeEach(() => {
            dialogBasicFixture = TestBed.createComponent(DialogBasicComponent);
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
        let dialogBasicFixture: ComponentFixture<DialogBasicComponent>;
        let dialogFooterDebugElement: DebugElement;
        let dialogFooterElement: HTMLElement;
        describe('without global dialog layout config', () => {
            beforeEach(() => {
                TestBed.configureTestingModule({
                    imports: [ThyDialogModule],
                    declarations: [DialogBasicComponent],
                    providers: [bypassSanitizeProvider]
                });
                TestBed.compileComponents();

                injectDefaultSvgIconSet();
            });

            beforeEach(() => {
                dialogBasicFixture = TestBed.createComponent(DialogBasicComponent);
                dialogFooterDebugElement = dialogBasicFixture.debugElement.query(By.directive(DialogFooterComponent));
                dialogFooterElement = dialogFooterDebugElement.nativeElement;
            });

            it('should create dialog footer', () => {
                dialogBasicFixture.detectChanges();
                expect(dialogFooterDebugElement).toBeTruthy();
            });

            it('should get correct class', () => {
                dialogBasicFixture.detectChanges();
                expect(dialogFooterElement.classList.contains('dialog-footer')).toBeTruthy();
                expect(dialogFooterElement.classList.contains('dialog-footer-border-top')).toBeFalsy();
            });

            it('should get correct class when thyShowBorderTop is true', () => {
                dialogBasicFixture.componentInstance.showBorderTop = true;
                dialogBasicFixture.detectChanges();
                expect(dialogFooterElement.classList.contains('dialog-footer-border-top')).toBeTruthy();
            });

            it('should get correct class when thyShowBorderTop is false', () => {
                dialogBasicFixture.componentInstance.showBorderTop = false;
                dialogBasicFixture.detectChanges();
                expect(dialogFooterElement.classList.contains('dialog-footer-border-top')).toBeFalsy();
            });

            it('should get description when has description template', () => {
                dialogBasicFixture.detectChanges();
                expect(dialogFooterDebugElement.query(By.css('.dialog-footer-actions'))).toBeDefined();
            });

            it('should get correct class when thyAlign is none', () => {
                dialogBasicFixture.componentInstance.align = '';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterElement.classList.contains('dialog-footer-actions-align-left')).toBeTruthy();
            });

            it('should get correct class when thyAlign is left', () => {
                dialogBasicFixture.componentInstance.align = 'left';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterElement.classList.contains('dialog-footer-actions-align-left')).toBeTruthy();
            });

            it('should get correct class when thyAlign is center', () => {
                dialogBasicFixture.componentInstance.align = 'center';
                dialogBasicFixture.detectChanges();
                expect(
                    dialogFooterDebugElement.nativeElement.classList.contains('dialog-footer-actions-align-center')
                ).toBeTruthy();
            });

            it('should get correct class when thyAlign is right', () => {
                dialogBasicFixture.componentInstance.align = 'right';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterElement.classList.contains('dialog-footer-actions-align-right')).toBeTruthy();
            });
        });
        describe('with global dialog layout config', () => {
            beforeEach(() => {
                TestBed.configureTestingModule({
                    imports: [ThyDialogModule],
                    declarations: [DialogBasicComponent],
                    providers: [
                        bypassSanitizeProvider,
                        {
                            provide: THY_DIALOG_LAYOUT_CONFIG,
                            useValue: {
                                footerAlign: 'right'
                            }
                        }
                    ]
                });
                TestBed.compileComponents();

                injectDefaultSvgIconSet();
            });

            beforeEach(() => {
                dialogBasicFixture = TestBed.createComponent(DialogBasicComponent);
                dialogFooterDebugElement = dialogBasicFixture.debugElement.query(By.directive(DialogFooterComponent));
                dialogFooterElement = dialogFooterDebugElement.nativeElement;
            });

            it('should get correct class when thyAlign is none', () => {
                dialogBasicFixture.componentInstance.align = '';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterElement.classList.contains('dialog-footer-actions-align-right')).toBeTruthy();
            });

            it('should get correct class when thyAlign is left', () => {
                dialogBasicFixture.componentInstance.align = 'left';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterElement.classList.contains('dialog-footer-actions-align-left')).toBeTruthy();
            });

            it('should get correct class when thyAlign is center', () => {
                dialogBasicFixture.componentInstance.align = 'center';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterElement.classList.contains('dialog-footer-actions-align-center')).toBeTruthy();
            });

            it('should get correct class when thyAlign is right', () => {
                dialogBasicFixture.componentInstance.align = 'right';
                dialogBasicFixture.detectChanges();
                expect(dialogFooterElement.classList.contains('dialog-footer-actions-align-right')).toBeTruthy();
            });
        });
    });
});
