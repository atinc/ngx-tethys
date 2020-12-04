import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyLayoutModule } from '../layout.module';
import { By } from '@angular/platform-browser';
import { ThyLayoutComponent } from '../layout.component';
import { ThyHeaderComponent } from '../header.component';
import { injectDefaultSvgIconSet, bypassSanitizeProvider } from 'ngx-tethys/testing/thy-icon';
import { ThyContentComponent } from '../content.component';

@Component({
    selector: 'demo-layout-basic',
    template: `
        <thy-layout>
            <thy-header thyTitle="I am header" thyIcon="application-fill"> </thy-header>
            <thy-content>
                恩，我是 content
            </thy-content>
        </thy-layout>
    `
})
class ThyDemoLayoutBasicComponent {}

@Component({
    selector: 'demo-layout-custom-header',
    template: `
        <thy-layout>
            <thy-header>
                <ng-template #headerTitle> My Custom Header Title</ng-template>
                <ng-template #headerContent>My Custom Header Content </ng-template>
                <ng-template #headerOperation>My Custom Header Operation </ng-template>
            </thy-header>
            <thy-content>
                恩，我是 content
            </thy-content>
        </thy-layout>
    `
})
class ThyDemoLayoutCustomHeaderComponent {}

describe(`layout`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ThyDemoLayoutBasicComponent, ThyDemoLayoutCustomHeaderComponent],
            imports: [ThyLayoutModule],
            providers: [bypassSanitizeProvider]
        });
        TestBed.compileComponents();
        injectDefaultSvgIconSet();
    });

    describe('basic', () => {
        let fixture: ComponentFixture<ThyDemoLayoutBasicComponent>;
        let layoutDebugElement: DebugElement;
        let layoutElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoLayoutBasicComponent);
            fixture.detectChanges();
            layoutDebugElement = fixture.debugElement.query(By.directive(ThyLayoutComponent));
            layoutElement = layoutDebugElement.nativeElement;
        });

        it(`should get correct class`, () => {
            // layout
            expect(layoutDebugElement).toBeTruthy();
            expect(layoutElement).toBeTruthy();
            expect(layoutElement.classList.contains(`thy-layout`)).toBeTruthy();

            // header
            const headerDebugElement = fixture.debugElement.query(By.directive(ThyHeaderComponent));
            expect(headerDebugElement).toBeTruthy();
            const headerElement: HTMLElement = headerDebugElement.nativeElement;
            expect(headerElement).toBeTruthy();
            expect(headerElement.classList.contains(`thy-layout-header`)).toBeTruthy();

            // header icon and title
            const iconElement = headerElement.querySelector('.prefix-icon');
            const titleNameElement = headerElement.querySelector('.title-name');
            expect(iconElement).toBeTruthy();
            expect(titleNameElement).toBeTruthy();
            expect(titleNameElement.innerHTML).toContain('I am header');

            // content
            const contentDebugElement = fixture.debugElement.query(By.directive(ThyContentComponent));
            expect(contentDebugElement).toBeTruthy();
            const contentElement: HTMLElement = contentDebugElement.nativeElement;
            expect(contentElement).toBeTruthy();
            expect(contentElement.classList.contains(`thy-layout-content`)).toBeTruthy();
        });
    });

    describe('custom-header', () => {
        let fixture: ComponentFixture<ThyDemoLayoutCustomHeaderComponent>;
        let headerDebugElement: DebugElement;
        let headerElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoLayoutCustomHeaderComponent);
            fixture.detectChanges();
            headerDebugElement = fixture.debugElement.query(By.directive(ThyHeaderComponent));
            headerElement = headerDebugElement.nativeElement;
        });

        it(`should get correct header class`, () => {
            expect(headerDebugElement).toBeTruthy();
            expect(headerElement).toBeTruthy();
            expect(headerElement.classList.contains(`thy-layout-header`)).toBeTruthy();
        });

        it(`should get correct custom header template`, () => {
            const headerTitle = headerElement.querySelector(`.layout-header-title`);
            const headerContent = headerElement.querySelector(`.layout-header-content`);
            const headerOperation = headerElement.querySelector(`.layout-header-operation`);

            expect(headerTitle).toBeTruthy();
            expect(headerContent).toBeTruthy();
            expect(headerOperation).toBeTruthy();

            expect(headerTitle.innerHTML).toContain('My Custom Header Title');
            expect(headerContent.innerHTML).toContain('My Custom Header Content');
            expect(headerOperation.innerHTML).toContain('My Custom Header Operation');
        });
    });
});
