import { Component, OnInit } from '@angular/core';
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyTagColor, ThyTagShape } from '../tag.component';
import { ThyTagModule } from '../tag.module';
import { ThyIconModule } from 'ngx-tethys/icon';
import { provideHttpClient } from '@angular/common/http';
@Component({
    selector: 'thy-tag-basic-test',
    template: `
        <thy-tag id="default">Default Tag</thy-tag>
        <thy-tag id="color" [thyColor]="color">Tag 1</thy-tag>
        <thy-tag id="theme" [thyTag]="color" [thyColor]="color" [thyTheme]="theme">Tag 2</thy-tag>
        <thy-tag id="shape" [thyShape]="shape">Tag 3</thy-tag>
        <thy-tag id="icon"> <thy-icon class="text-primary" thyIconName="smile"></thy-icon>Tag 4 </thy-tag>
        <thy-tag id="size" [thySize]="size">Tag 5</thy-tag>
        <thy-tag id="custom" thyColor="#56abfb">Tag 6</thy-tag>
        <thy-tag id="hoverable" [thyHoverable]="hoverable">Tag 7</thy-tag>
    `,
    standalone: false
})
export class ThyTagBasicTestComponent implements OnInit {
    size: string = 'md';
    color: ThyTagColor = 'default';
    theme: 'outline' | 'fill' | 'weak-fill' = 'fill';
    shape: ThyTagShape = 'rectangle';
    hoverable: boolean;

    constructor() {}

    ngOnInit(): void {}
}

describe('thy-tag', () => {
    let fixture: ComponentFixture<ThyTagBasicTestComponent>;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ThyTagBasicTestComponent],
            imports: [ThyTagModule, ThyIconModule],
            providers: [provideHttpClient()]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTagBasicTestComponent);
        fixture.detectChanges();
    });

    it('should create default tag', () => {
        const tagDebugElement = fixture.debugElement.query(By.css('#default'));
        expect(tagDebugElement).toBeTruthy();
        const tagElement: HTMLElement = tagDebugElement.nativeElement;
        expect(tagElement.classList.contains('thy-tag')).toBeTruthy();
        expect(tagElement.classList.contains('thy-tag-default')).toBeTruthy();
        expect(tagElement.classList.contains('thy-tag-md')).toBeTruthy();
        expect(tagElement.textContent).toContain('Default Tag');
    });

    it('should create tag with theme colors', () => {
        const tagDebugElement = fixture.debugElement.query(By.css('#color'));
        const tagElement: HTMLElement = tagDebugElement.nativeElement;
        ['default', 'primary', 'success', 'warning', 'danger', 'info'].forEach(color => {
            fixture.componentInstance.color = color;
            fixture.detectChanges();
            expect(tagElement.classList.contains(`thy-tag-${color}`)).toBeTruthy();
        });
    });

    it('should create tag with theme style', () => {
        const tagDebugElement = fixture.debugElement.query(By.css('#theme'));
        const tagElement: HTMLElement = tagDebugElement.nativeElement;
        fixture.componentInstance.color = '#56abfb';

        fixture.componentInstance.theme = 'outline';
        fixture.detectChanges();
        expect(tagElement.style.borderColor === 'rgb(86, 171, 251)').toBe(true);

        fixture.componentInstance.theme = 'weak-fill';
        fixture.detectChanges();
        expect(tagElement.style.backgroundColor === 'rgba(86, 171, 251, 0.1)').toBe(true);
    });

    it('should show icon with thy-icon', () => {
        const tagDebugElement = fixture.debugElement.query(By.css('#icon'));
        const tagElement: HTMLElement = tagDebugElement.nativeElement;
        const iconElement = tagElement.children[0];
        expect(iconElement).toBeTruthy();
        expect(iconElement.classList.contains('thy-icon-smile')).toBe(true);
    });

    it('should set size with thySize', () => {
        const tagDebugElement = fixture.debugElement.query(By.css('#size'));
        const tagElement: HTMLElement = tagDebugElement.nativeElement;
        ['sm', 'md', 'lg', 'xs'].forEach(size => {
            fixture.componentInstance.size = size;
            fixture.detectChanges();
            expect(tagElement.classList.contains(`thy-tag-${size}`)).toBe(true);
        });
    });

    it('should set shape with thyShape', () => {
        const tagDebugElement = fixture.debugElement.query(By.css('#shape'));
        const tagElement: HTMLElement = tagDebugElement.nativeElement;
        fixture.componentInstance.shape = 'pill';
        fixture.detectChanges();
        expect(tagElement.classList.contains(`thy-tag-pill`)).toBe(true);
    });

    it('should set color with custom color value', () => {
        const tagDebugElement = fixture.debugElement.query(By.css('#custom'));
        const tagElement: HTMLElement = tagDebugElement.nativeElement;
        expect(tagElement.style.backgroundColor === 'rgb(86, 171, 251)').toBe(true);
    });

    it('should set hover with thyHoverable', () => {
        const tagDebugElement = fixture.debugElement.query(By.css('#hoverable'));
        const tagElement: HTMLElement = tagDebugElement.nativeElement;
        fixture.componentInstance.hoverable = true;
        fixture.detectChanges();
        expect(tagElement.classList.contains(`thy-tag-hover`)).toBe(true);
    });

    it('should work when thyColor switch between custom color and theme color', () => {
        fixture.componentInstance.theme = 'fill';
        const tagElement: HTMLElement = fixture.debugElement.query(By.css('#color')).nativeElement;

        fixture.componentInstance.color = 'primary';
        fixture.detectChanges();
        expect(tagElement.classList.contains(`thy-tag-primary`)).toBe(true);

        fixture.componentInstance.color = 'rgb(86, 171, 251)';
        fixture.detectChanges();
        expect(tagElement.classList.contains(`thy-tag-primary`)).toBe(false);
        expect(tagElement.style.backgroundColor).toBe('rgb(86, 171, 251)');

        fixture.componentInstance.color = 'primary';
        fixture.detectChanges();
        expect(tagElement.classList.contains(`thy-tag-primary`)).toBe(true);
        expect(tagElement.style.backgroundColor === 'rgb(86, 171, 251)').toBe(false);
    });
});
