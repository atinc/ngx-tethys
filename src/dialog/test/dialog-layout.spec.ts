import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyDialogModule } from '../dialog.module';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DialogHeaderComponent } from '../header/dialog-header.component';
import { bypassSanitizeProvider, injectDefaultSvgIconSet } from '../../core/testing/thy-icon';

@Component({
    selector: 'dialog-header-basic',
    template: `
        <thy-dialog-header [thySize]="size" thyTitle="I am dialog header"></thy-dialog-header>
    `
})
class DialogHeaderBasicComponent {
    size: 'lg' | 'md';
}

describe('dialog-layout', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyDialogModule],
            declarations: [DialogHeaderBasicComponent],
            providers: [bypassSanitizeProvider]
        });
        TestBed.compileComponents();

        injectDefaultSvgIconSet();
    });

    describe('dialog-header', () => {
        let dialogHeaderBasicFixture: ComponentFixture<DialogHeaderBasicComponent>;
        let dialogHeaderDebugElement: DebugElement;
        let dialogHeaderElement: HTMLElement;

        beforeEach(() => {
            dialogHeaderBasicFixture = TestBed.createComponent(DialogHeaderBasicComponent);
            dialogHeaderBasicFixture.detectChanges();
            dialogHeaderDebugElement = dialogHeaderBasicFixture.debugElement.query(By.directive(DialogHeaderComponent));
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
            dialogHeaderBasicFixture.componentInstance.size = 'lg';
            dialogHeaderBasicFixture.detectChanges();
            expect(dialogHeaderElement.classList.contains('dialog-header-lg')).toBeTruthy();
        });
    });
});
