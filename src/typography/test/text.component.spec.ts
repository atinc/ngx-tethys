import { Component } from '@angular/core';
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyTextColor, ThyThemeColor } from 'ngx-tethys/core';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTypographyModule } from '../module';

@Component({
    selector: 'thy-text-basic-test',
    template: `
        <span id="default" thyText>default text</span>
        <span id="themeColor" thyText [thyColor]="color">{{ color }}</span>
        <thy-text id="customColor" thyColor="#c9584e">This is a text</thy-text>
        <span id="icon" thyText thyIcon="version">This is a Text</span>
    `
})
export class ThyTextBasicTestComponent {
    color: ThyThemeColor | ThyTextColor | string = '';

    constructor() {}
}

describe('thy-text', () => {
    let fixture: ComponentFixture<ThyTextBasicTestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ThyTextBasicTestComponent],
                imports: [ThyTypographyModule, ThyIconModule]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTextBasicTestComponent);
        fixture.detectChanges();
    });

    it('should create text without color', () => {
        const textDebugElement = fixture.debugElement.query(By.css('#default'));
        expect(textDebugElement).toBeTruthy();
        const textElement: HTMLElement = textDebugElement.nativeElement;
        expect(textElement.classList.contains('thy-text')).toBeTruthy();
        expect(textElement.classList.length).toEqual(1);
        expect(textElement.textContent).toContain('default text');
    });

    it('should create tag with theme colors', () => {
        const textDebugElement = fixture.debugElement.query(By.css('#themeColor'));
        const textElement: HTMLElement = textDebugElement.nativeElement;
        const themeColors = [
            'primary',
            'success',
            'info',
            'warning',
            'danger',
            'default',
            'light',
            'secondary',
            'muted',
            'desc',
            'placeholder'
        ];
        themeColors.forEach(color => {
            fixture.componentInstance.color = color;
            fixture.detectChanges();
            expect(textElement.classList.contains(`text-${color}`)).toBeTruthy();
        });
    });

    it('should set color with custom color value', () => {
        const textDebugElement = fixture.debugElement.query(By.css('#customColor'));
        const textElement: HTMLElement = textDebugElement.nativeElement;
        expect(textElement.style.color === 'rgb(201, 88, 78)').toBe(true);
    });

    it('should show icon with thy-icon', () => {
        const textDebugElement = fixture.debugElement.query(By.css('#icon'));
        const textElement: HTMLElement = textDebugElement.nativeElement;
        const iconElement = textElement.children[0];
        expect(iconElement).toBeTruthy();
        expect(iconElement.classList.contains('thy-icon-version')).toBe(true);
    });
});
