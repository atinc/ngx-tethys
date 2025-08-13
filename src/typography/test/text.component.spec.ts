import { Component, DebugElement } from '@angular/core';
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { isBgColor, isThemeColor, ThyBgColor, ThyTextColor, ThyThemeColor } from 'ngx-tethys/core';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyBackgroundColorDirective, ThyTypographyModule } from 'ngx-tethys/typography';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'thy-text-basic-test',
    template: `
        <span id="themeColor" [thyTextColor]="color">{{ color }}</span>
        <thy-text id="customColor" thyTextColor="#c9584e">This is a text</thy-text>
        <span id="icon" thyText thyIcon="version">This is a Text</span>
    `,
    imports: [ThyTypographyModule, ThyIconModule]
})
export class ThyTextBasicTestComponent {
    color: ThyThemeColor | ThyTextColor | string = '';

    constructor() {}
}

@Component({
    selector: 'thy-text-background-test',
    template: ` <span id="themeWithCustomBg" [thyBgColor]="bgColor" thyTextColor="white">This is a text</span> `,
    imports: [ThyTypographyModule, ThyIconModule]
})
export class ThyTextBackgroundTestComponent {
    bgColor: ThyThemeColor | ThyBgColor | string = 'primary';

    constructor() {}
}

describe('thy-text', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient()]
        }).compileComponents();
    }));

    describe('basic', () => {
        let fixture: ComponentFixture<ThyTextBasicTestComponent> | undefined = undefined;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyTextBasicTestComponent);
            fixture.detectChanges();
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

    describe('bg-color', () => {
        let fixture: ComponentFixture<ThyTextBackgroundTestComponent> | undefined = undefined;
        let bgColorTestComponent: ThyTextBackgroundTestComponent | undefined = undefined;
        let textDebugElement: DebugElement | undefined = undefined;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyTextBackgroundTestComponent);
            fixture.detectChanges();
            bgColorTestComponent = fixture.debugElement.componentInstance;
            textDebugElement = fixture.debugElement.query(By.directive(ThyBackgroundColorDirective));
        });

        it(`should create tag with theme background colors and custom background colors`, () => {
            const textElement = textDebugElement.nativeElement;
            const themeBgColors = [
                'primary',
                'success',
                'info',
                'danger',
                'warning',
                'dark',
                'secondary',
                'light',
                'lighter',
                'bright',
                'content',
                '#ffffff',
                '#e62828',
                'rgb(201, 88, 78)',
                'white',
                'transparent'
            ];
            const color2Rgb = {
                '#ffffff': `rgb(255, 255, 255)`,
                '#e62828': `rgb(230, 40, 40)`,
                'rgb(201, 88, 78)': 'rgb(201, 88, 78)'
            };
            themeBgColors.forEach(bgColor => {
                bgColorTestComponent.bgColor = bgColor;
                fixture.detectChanges();
                if (isThemeColor(bgColor) || isBgColor(bgColor)) {
                    expect(textElement.classList).toContain(`bg-${bgColor}`);
                } else {
                    expect(textElement.style.backgroundColor === color2Rgb[bgColor]).toBe(true);
                }
                expect(textElement.classList).toContain(`text-white`);
            });
        });
    });
});
