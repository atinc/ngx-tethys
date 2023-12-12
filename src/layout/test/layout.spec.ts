import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyLayoutModule } from '../layout.module';
import { By } from '@angular/platform-browser';
import { ThyLayoutComponent, ThyLayoutDirective } from '../layout.component';
import { ThyHeaderComponent, ThyHeaderDirective } from '../header.component';
import { injectDefaultSvgIconSet, bypassSanitizeProvider } from 'ngx-tethys/testing';
import { ThyContentComponent, ThyContentDirective } from '../content.component';
import { ThyContentSectionComponent, ThyContentSectionDirective } from '../content-section.component';
import { ThyContentMainComponent, ThyContentMainDirective } from '../content-main.component';

@Component({
    selector: 'thy-demo-layout-basic',
    template: `
        <thy-layout>
            <thy-header [thyDivided]="isDivided" [thyShadow]="shadow" [thySize]="size" thyTitle="I am header" [thyIcon]="iconName">
            </thy-header>
            <thy-content>
                <thy-content-section>Content section</thy-content-section>
                <thy-content-main>Content main</thy-content-main>
            </thy-content>
        </thy-layout>
    `
})
class ThyDemoLayoutBasicComponent {
    isDivided = false;
    shadow = false;
    size = '';
    iconName = '';
}

@Component({
    selector: 'thy-demo-layout-custom-header',
    template: `
        <thy-layout>
            <thy-header>
                <ng-template #headerTitle> My Custom Header Title</ng-template>
                <ng-template #headerContent>My Custom Header Content </ng-template>
                <ng-template #headerOperation>My Custom Header Operation </ng-template>
            </thy-header>
            <thy-content> 恩，我是 content </thy-content>
        </thy-layout>
    `
})
class ThyDemoLayoutCustomHeaderComponent {}

@Component({
    selector: 'thy-demo-layout-directive-basic',
    template: `
        <div thyLayout>
            <div thyHeader [thySize]="size" [thyShadow]="shadow" [thyDivided]="isDivided">Header</div>
            <div thyContent>
                <div thyContentSection>Content section</div>
                <div thyContentMain>Content main</div>
            </div>
        </div>
    `
})
class ThyDemoLayoutDirectiveBasicComponent {
    isDivided = false;
    shadow = false;
    size = '';
}

describe(`layout`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ThyDemoLayoutBasicComponent, ThyDemoLayoutCustomHeaderComponent, ThyDemoLayoutDirectiveBasicComponent],
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

            // header title
            const titleNameElement = headerElement.querySelector('.title-name');
            expect(titleNameElement).toBeTruthy();
            expect(titleNameElement.innerHTML).toContain('I am header');

            // content
            const contentDebugElement = fixture.debugElement.query(By.directive(ThyContentComponent));
            expect(contentDebugElement).toBeTruthy();
            const contentElement: HTMLElement = contentDebugElement.nativeElement;
            expect(contentElement).toBeTruthy();
            expect(contentElement.classList.contains(`thy-layout-content`)).toBeTruthy();

            // content section
            const contentSectionDebugElement = fixture.debugElement.query(By.directive(ThyContentSectionComponent));
            expect(contentSectionDebugElement).toBeTruthy();
            const contentSectionElement = contentSectionDebugElement.nativeElement;
            expect(contentSectionElement).toBeTruthy();
            expect(contentSectionElement.classList.contains(`thy-layout-content-section`)).toBeTruthy();

            // content main
            const contentMainDebugElement = fixture.debugElement.query(By.directive(ThyContentMainComponent));
            expect(contentMainDebugElement).toBeTruthy();
            const contentMainElement = contentMainDebugElement.nativeElement;
            expect(contentMainElement).toBeTruthy();
            expect(contentMainElement.classList.contains(`thy-layout-content-main`)).toBeTruthy();
        });

        it('should get divided header', () => {
            const headerDebugElement = fixture.debugElement.query(By.directive(ThyHeaderComponent));
            expect(headerDebugElement).toBeTruthy();
            const headerElement: HTMLElement = headerDebugElement.nativeElement;
            expect(headerElement).toBeTruthy();
            expect(headerElement.classList.contains(`thy-layout-header`)).toBeTruthy();
            expect(headerElement.classList.contains(`thy-layout-header-divided`)).toBeFalsy();
            fixture.componentInstance.isDivided = true;
            fixture.detectChanges();
            expect(headerElement.classList.contains(`thy-layout-header-divided`)).toBeTruthy();
        });

        it('should get shadow header', () => {
            const headerDebugElement = fixture.debugElement.query(By.directive(ThyHeaderComponent));
            expect(headerDebugElement).toBeTruthy();
            const headerElement: HTMLElement = headerDebugElement.nativeElement;
            expect(headerElement).toBeTruthy();
            expect(headerElement.classList.contains(`thy-layout-header`)).toBeTruthy();
            expect(headerElement.classList.contains(`thy-layout-header-shadow`)).toBeFalsy();
            fixture.componentInstance.shadow = true;
            fixture.detectChanges();
            expect(headerElement.classList.contains(`thy-layout-header-shadow`)).toBeTruthy();
        });

        it('layout header thyIcon', () => {
            const headerDebugElement = fixture.debugElement.query(By.directive(ThyHeaderComponent));
            expect(headerDebugElement).toBeTruthy();
            expect(headerDebugElement.nativeElement.querySelector('.prefix-icon')).toBeFalsy();
            fixture.debugElement.componentInstance.iconName = 'application-fill';
            fixture.detectChanges();
            expect(headerDebugElement.nativeElement.querySelector('.prefix-icon')).toBeTruthy();
        });

        it('layout header thySize', () => {
            const headerDebugElement = fixture.debugElement.query(By.directive(ThyHeaderComponent));
            expect(headerDebugElement).toBeTruthy();
            const headerElement: HTMLElement = headerDebugElement.nativeElement;
            expect(headerElement.classList.contains(`thy-layout-header-sm`)).toBeFalsy();
            fixture.componentInstance.size = 'sm';
            fixture.detectChanges();
            expect(headerElement.classList.contains(`thy-layout-header-sm`)).toBeTruthy();
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

    describe('directive', () => {
        let fixture: ComponentFixture<ThyDemoLayoutDirectiveBasicComponent>;
        let layoutDebugElement: DebugElement;
        let layoutElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoLayoutDirectiveBasicComponent);
            fixture.detectChanges();
            layoutDebugElement = fixture.debugElement.query(By.directive(ThyLayoutDirective));
            layoutElement = layoutDebugElement.nativeElement;
        });

        it(`should get correct class`, () => {
            // layout
            expect(layoutDebugElement).toBeTruthy();
            expect(layoutElement).toBeTruthy();
            expect(layoutElement.classList.contains(`thy-layout`)).toBeTruthy();

            // header
            const headerDebugElement = fixture.debugElement.query(By.directive(ThyHeaderDirective));
            expect(headerDebugElement).toBeTruthy();
            const headerElement: HTMLElement = headerDebugElement.nativeElement;
            expect(headerElement).toBeTruthy();
            expect(headerElement.classList.contains(`thy-layout-header`)).toBeTruthy();

            // content
            const contentDebugElement = fixture.debugElement.query(By.directive(ThyContentDirective));
            expect(contentDebugElement).toBeTruthy();
            const contentElement: HTMLElement = contentDebugElement.nativeElement;
            expect(contentElement).toBeTruthy();
            expect(contentElement.classList.contains(`thy-layout-content`)).toBeTruthy();

            // content section
            const contentSectionDebugElement = fixture.debugElement.query(By.directive(ThyContentSectionDirective));
            expect(contentSectionDebugElement).toBeTruthy();
            const contentSectionElement = contentSectionDebugElement.nativeElement;
            expect(contentSectionElement).toBeTruthy();
            expect(contentSectionElement.classList.contains(`thy-layout-content-section`)).toBeTruthy();

            // content main
            const contentMainDebugElement = fixture.debugElement.query(By.directive(ThyContentMainDirective));
            expect(contentMainDebugElement).toBeTruthy();
            const contentMainElement = contentMainDebugElement.nativeElement;
            expect(contentMainElement).toBeTruthy();
            expect(contentMainElement.classList.contains(`thy-layout-content-main`)).toBeTruthy();
        });

        it('should get divided header', () => {
            const headerDebugElement = fixture.debugElement.query(By.directive(ThyHeaderDirective));
            expect(headerDebugElement).toBeTruthy();
            const headerElement: HTMLElement = headerDebugElement.nativeElement;
            expect(headerElement).toBeTruthy();
            expect(headerElement.classList.contains(`thy-layout-header`)).toBeTruthy();
            expect(headerElement.classList.contains(`thy-layout-header-divided`)).toBeFalsy();
            fixture.componentInstance.isDivided = true;
            fixture.detectChanges();
            expect(headerElement.classList.contains(`thy-layout-header-divided`)).toBeTruthy();
        });

        it('should get shadow header', () => {
            const headerDebugElement = fixture.debugElement.query(By.directive(ThyHeaderDirective));
            expect(headerDebugElement).toBeTruthy();
            const headerElement: HTMLElement = headerDebugElement.nativeElement;
            expect(headerElement).toBeTruthy();
            expect(headerElement.classList.contains(`thy-layout-header`)).toBeTruthy();
            expect(headerElement.classList.contains(`thy-layout-header-shadow`)).toBeFalsy();
            fixture.componentInstance.shadow = true;
            fixture.detectChanges();
            expect(headerElement.classList.contains(`thy-layout-header-shadow`)).toBeTruthy();
        });

        it('layout header thySize', () => {
            const headerDebugElement = fixture.debugElement.query(By.directive(ThyHeaderDirective));
            expect(headerDebugElement).toBeTruthy();
            const headerElement: HTMLElement = headerDebugElement.nativeElement;
            expect(headerElement.classList.contains(`thy-layout-header-sm`)).toBeFalsy();
            fixture.componentInstance.size = 'sm';
            fixture.detectChanges();
            expect(headerElement.classList.contains(`thy-layout-header-sm`)).toBeTruthy();
            fixture.componentInstance.size = 'lg';
            fixture.detectChanges();
            expect(headerElement.classList.contains(`thy-layout-header-lg`)).toBeTruthy();
        });
    });

    // thyIconPrefix、thyHasBorder将被弃用，不加测试
});
