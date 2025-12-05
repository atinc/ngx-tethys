import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    COMPONENT_CLASS_NAME,
    DEFAULT_COLOR_NAME,
    DEFAULT_SHAPE_NAME,
    DEFAULT_SIZE_NAME,
    DEFAULT_THEME_NAME,
    ThyColorType,
    ThyDot,
    ThyShapeType,
    ThySizeType,
    ThyThemeType
} from 'ngx-tethys/dot';

describe('ThyDot', () => {
    let fixture!: ComponentFixture<ThyDemoDotComponent>;
    let basicTestComponent!: ThyDemoDotComponent;
    let dotComponent!: DebugElement;

    const colors = ['primary', 'info', 'danger', 'warning', 'success'];
    const sizes = ['xs', 'sm', 'md', 'lg', 'xlg'];
    const shapes = ['square', 'circle'];
    const themes = ['outline', 'fill'];

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({});

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoDotComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        dotComponent = fixture.debugElement.query(By.directive(ThyDot));
    });

    const getRandomAttributes = <T extends string>(list: string[]): T => {
        const index = Math.floor(Math.random() * list.length);
        return list[index] as T;
    };

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    it('should have default class when all attribute is none', () => {
        fixture.detectChanges();
        expect(dotComponent.nativeElement.classList.contains(COMPONENT_CLASS_NAME)).toBe(true);
        expect(dotComponent.nativeElement.classList.contains(`dot-color-${DEFAULT_COLOR_NAME}`)).toBe(true);
        expect(dotComponent.nativeElement.classList.contains(`dot-size-${DEFAULT_SIZE_NAME}`)).toBe(true);
        expect(dotComponent.nativeElement.classList.contains(`dot-shape-${DEFAULT_SHAPE_NAME}`)).toBe(true);
        expect(dotComponent.nativeElement.classList.contains(`dot-theme-${DEFAULT_THEME_NAME}`)).toBe(true);
    });

    it('should have correct class', () => {
        const randomColor = getRandomAttributes<ThyColorType>(colors);
        const randomSize = getRandomAttributes<ThySizeType>(sizes);
        const randomShape = getRandomAttributes<ThyShapeType>(shapes);
        const randomTheme = getRandomAttributes<ThyThemeType>(themes);
        basicTestComponent.thyColor = randomColor;
        basicTestComponent.thyShape = randomShape;
        basicTestComponent.thySize = randomSize;
        basicTestComponent.thyTheme = randomTheme;
        fixture.detectChanges();
        expect(dotComponent.nativeElement.classList.contains(COMPONENT_CLASS_NAME)).toBe(true);
        expect(dotComponent.nativeElement.classList.contains(`dot-color-${randomColor}`)).toBe(true);
        expect(dotComponent.nativeElement.classList.contains(`dot-size-${randomSize}`)).toBe(true);
        expect(dotComponent.nativeElement.classList.contains(`dot-shape-${randomShape}`)).toBe(true);
        expect(dotComponent.nativeElement.classList.contains(`dot-theme-${randomTheme}`)).toBe(true);
    });
    it('should have color style when use custom color', () => {
        const randomColor = getRandomColor();
        basicTestComponent.thyColor = randomColor;
        fixture.detectChanges();
        expect(dotComponent.nativeElement.classList.contains(COMPONENT_CLASS_NAME)).toBe(true);
        expect(dotComponent.nativeElement.style.borderColor).toBeDefined();
    });
});

@Component({
    selector: 'thy-demo-dot-basic',
    template: ` <span thy-dot [thyColor]="thyColor" [thySize]="thySize" [thyTheme]="thyTheme" [thyShape]="thyShape"></span> `,
    imports: [ThyDot]
})
class ThyDemoDotComponent {
    thyColor!: ThyColorType;
    thySize!: ThySizeType;
    thyTheme!: ThyThemeType;
    thyShape!: ThyShapeType;
    remove() {
        console.log('remove success');
    }
}
