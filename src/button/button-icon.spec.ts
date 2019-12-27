import { Component, Sanitizer, SecurityContext, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { UpdateHostClassService } from '../shared';
import { ThyButtonModule } from './button.module';
import { ThyIconRegistry, ThyIconComponent } from '../icon';
import { By } from '@angular/platform-browser';
import { ThyButtonComponent } from './button.component';
import { ThyButtonIconComponent } from './button-icon.component';
import { injectDefaultSvgIconSet, bypassSanitizeProvider } from '../core/testing';
import { truncate } from 'fs';

@Component({
    selector: 'app-basic-button-icon',
    template: `
        <button [thyButtonIcon]="icon" [thyColor]="color"></button>
    `
})
class BasicButtonIconComponent {
    icon = 'inbox';
    color = '#5DCFFF';
}

describe(`button-icon`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyButtonModule],
            declarations: [BasicButtonIconComponent],
            providers: [UpdateHostClassService, bypassSanitizeProvider]
        }).compileComponents();

        injectDefaultSvgIconSet();
    });

    let fixture: ComponentFixture<BasicButtonIconComponent>;
    let thyButtonDebugElement: DebugElement;
    let thyButtonElement: HTMLElement;

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicButtonIconComponent);
        fixture.detectChanges();
        thyButtonDebugElement = fixture.debugElement.query(By.directive(ThyButtonIconComponent));
        thyButtonElement = thyButtonDebugElement.nativeElement;
    });

    it(`should get correct classes`, () => {
        expect(thyButtonDebugElement).toBeTruthy();
        expect(thyButtonElement).toBeTruthy();
        expect(thyButtonElement.classList.contains(`btn`)).toBeTruthy();
        expect(thyButtonElement.classList.contains(`btn-icon`)).toBeTruthy();

        const iconDebugElement = thyButtonDebugElement.query(By.directive(ThyIconComponent));
        expect(iconDebugElement).toBeTruthy();
        expect(iconDebugElement.nativeElement).toBeTruthy();
        expect(iconDebugElement.nativeElement.classList.contains(`thy-icon`)).toBeTruthy();
        expect(iconDebugElement.nativeElement.classList.contains(`thy-icon-inbox`)).toBeTruthy();
    });

    it(`should have style color`, () => {
        const iconDebugElement = thyButtonDebugElement.query(By.directive(ThyIconComponent));
        expect(iconDebugElement).toBeTruthy();
        expect(iconDebugElement.nativeElement.style.color === 'rgb(93, 207, 255)').toBe(true);
        expect(iconDebugElement.nativeElement.style.borderColor === 'rgb(93, 207, 255)').toBe(true);

        fixture.componentInstance.color = '';
        fixture.detectChanges();
        expect(iconDebugElement.nativeElement.style.color === '').toBe(true);
        expect(iconDebugElement.nativeElement.style.borderColor === '').toBe(true);
    });

    it(`should get correct classes when use wtf icon`, () => {
        fixture.componentInstance.icon = 'wtf-inbox';
        fixture.detectChanges();
        expect(thyButtonDebugElement).toBeTruthy();
        expect(thyButtonElement).toBeTruthy();

        const wtfIconElement = thyButtonElement.querySelector('.wtf');
        expect(wtfIconElement).toBeTruthy();
        expect(wtfIconElement.classList.contains(`wtf-inbox`)).toBeTruthy();

        const iconDebugElement = thyButtonDebugElement.query(By.directive(ThyIconComponent));
        expect(iconDebugElement).toBeFalsy();
    });
});
