import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick, flush } from '@angular/core/testing';
import { ThyLayoutModule } from '../layout.module';
import { By } from '@angular/platform-browser';
import { ThyLayoutComponent } from '../layout.component';
import { injectDefaultSvgIconSet, bypassSanitizeProvider } from 'ngx-tethys/testing';
import { ThySidebarComponent, ThySidebarTheme } from '../sidebar.component';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { ThySidebarHeaderComponent } from '../sidebar-header.component';
import { ThySidebarContentComponent } from '../sidebar-content.component';
import { ThySidebarFooterComponent } from '../sidebar-footer.component';
import { ThyResizableDirective } from '../../resizable';

const SIDEBAR_ISOLATED_CLASS = 'thy-layout-sidebar-isolated';
@Component({
    selector: 'thy-demo-layout-sidebar',
    template: `
        <thy-layout>
            <thy-sidebar
                [thyWidth]="width"
                [thyTheme]="thyTheme"
                [thyIsolated]="isolated"
                [thyHasBorderRight]="hasBorderRight"
                [thyDraggable]="draggable"
                [thyDragMaxWidth]="dragMaxWidth"
                [thyCollapsible]="collapsible"
                [thyCollapsed]="isCollapsed"
                [thyCollapsedWidth]="collapsibleWidth"
                (thyCollapsedChange)="collapsedChange($event)"
                (thyDragWidthChange)="dragWidthChange($event)"
                [thyTrigger]="triggerTpl"
            >
                <thy-sidebar-header [thyDivided]="true" thyTitle="Title"> </thy-sidebar-header>
                <thy-sidebar-content>
                    Content
                </thy-sidebar-content>
                <thy-sidebar-footer> Footer </thy-sidebar-footer>
            </thy-sidebar>
            <<ng-template #customTpl>
                <div class="custom-collapse"></div>
            </ng-template>
            <thy-content>
                Yeah, I am content
            </thy-content>
        </thy-layout>
    `
})
class ThyDemoLayoutSidebarBasicComponent {
    width: string | number = '';
    isolated = false;
    hasBorderRight = true;
    draggable = false;
    dragMaxWidth = 100;
    collapsible = false;
    collapsibleWidth = 0;
    thyTheme: ThySidebarTheme;
    isCollapsed = false;
    dragWidth: number;

    @ViewChild('customTpl', { read: TemplateRef, static: true }) customTpl: TemplateRef<unknown> | undefined;

    triggerTpl: TemplateRef<any> | undefined | null;

    collapsedChange(isCollapsed: boolean) {
        this.isCollapsed = isCollapsed;
    }

    dragWidthChange(width: number) {
        this.dragWidth = width;
    }
}

@Component({
    selector: 'thy-demo-layout-custom-sidebar',
    template: `
        <thy-layout>
            <thy-sidebar>
                <thy-sidebar-header>
                    <ng-template #headerTitle>My Custom Sidebar Header Title</ng-template>
                    <ng-template #headerOperation>My Custom Sidebar Header Operation</ng-template>
                </thy-sidebar-header>
            </thy-sidebar>
            <thy-content>Yeah, I am content</thy-content>
        </thy-layout>
    `
})
class ThyDemoLayoutCustomSidebarComponent {}

describe(`sidebar`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ThyDemoLayoutSidebarBasicComponent, ThyDemoLayoutCustomSidebarComponent],
            imports: [ThyLayoutModule],
            providers: [bypassSanitizeProvider]
        });
        TestBed.compileComponents();
        injectDefaultSvgIconSet();
    });

    describe('basic', () => {
        let fixture: ComponentFixture<ThyDemoLayoutSidebarBasicComponent>;
        let layoutDebugElement: DebugElement;
        let layoutElement: HTMLElement;
        let sidebarDebugElement: DebugElement;
        let sidebarElement: HTMLElement;
        let sidebarHeaderDebugElement: DebugElement;
        let sidebarHeaderElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoLayoutSidebarBasicComponent);
            fixture.detectChanges();
            layoutDebugElement = fixture.debugElement.query(By.directive(ThyLayoutComponent));
            layoutElement = layoutDebugElement.nativeElement;
            sidebarDebugElement = fixture.debugElement.query(By.directive(ThySidebarComponent));
            sidebarElement = sidebarDebugElement.nativeElement;
            sidebarHeaderDebugElement = fixture.debugElement.query(By.directive(ThySidebarHeaderComponent));
            sidebarHeaderElement = sidebarHeaderDebugElement.nativeElement;
        });

        it(`should get correct class`, () => {
            expect(layoutElement.classList.contains(`thy-layout`)).toEqual(true);
            expect(layoutElement.classList.contains(`thy-layout--has-sidebar`)).toEqual(true);
            expect(sidebarElement.classList.contains(`thy-layout-sidebar`)).toEqual(true);
        });

        it(`should get correct 300px width when input lg`, () => {
            expect(sidebarElement.style.width).toEqual('240px');
            fixture.componentInstance.width = 'lg';
            fixture.detectChanges();
            expect(sidebarElement.style.width).toEqual('300px');
        });

        it(`should get correct 200px width when input 200`, () => {
            expect(sidebarElement.style.width).toEqual('240px');
            fixture.componentInstance.width = 200;
            fixture.detectChanges();
            expect(sidebarElement.style.width).toEqual('200px');
        });

        it(`should get correct class with theme dark`, () => {
            expect(sidebarElement.classList).not.toContain('sidebar-theme-dark');
            fixture.debugElement.componentInstance.thyTheme = 'dark';
            fixture.detectChanges();
            expect(sidebarElement.classList).toContain('sidebar-theme-dark');
        });

        it(`should get correct class with theme light`, () => {
            expect(sidebarElement.classList).not.toContain('sidebar-theme-light');
            fixture.debugElement.componentInstance.thyTheme = 'light';
            fixture.detectChanges();
            expect(sidebarElement.classList).toContain('sidebar-theme-light');
        });

        it(`should get correct class with ThySidebarHeaderComponent has divided`, () => {
            expect(sidebarHeaderElement.classList.contains(`sidebar-header-divided`)).toEqual(true);
        });

        it(`should get correct class with thy-sidebar-content`, () => {
            const debugElement = fixture.debugElement.query(By.directive(ThySidebarContentComponent));
            expect(debugElement).toBeTruthy();
            const element: HTMLElement = debugElement.nativeElement;
            expect(element).toBeTruthy();
            expect(element.classList.contains('sidebar-content')).toBeTruthy();
            expect(element.textContent.includes('Content')).toBeTruthy();
        });

        it(`should get correct class with thy-sidebar-footer`, () => {
            const debugElement = fixture.debugElement.query(By.directive(ThySidebarFooterComponent));
            expect(debugElement).toBeTruthy();
            const element: HTMLElement = debugElement.nativeElement;
            expect(element).toBeTruthy();
            expect(element.classList.contains('sidebar-footer')).toBeTruthy();
            expect(element.textContent.includes('Footer')).toBeTruthy();
        });

        it(`should get correct isolated class when isolated`, () => {
            expect(sidebarElement.classList.contains(SIDEBAR_ISOLATED_CLASS)).toEqual(false);
            fixture.componentInstance.isolated = true;
            fixture.detectChanges();
            expect(sidebarElement.classList.contains(SIDEBAR_ISOLATED_CLASS)).toEqual(true);
        });

        it(`should get correct class according to thyHasBorderRight value`, () => {
            expect(sidebarElement.classList).not.toContain('thy-layout-sidebar--clear-border-right');
            fixture.debugElement.componentInstance.hasBorderRight = false;
            fixture.detectChanges();
            expect(sidebarElement.classList).toContain('thy-layout-sidebar--clear-border-right');
        });

        it('thyDraggable', fakeAsync(() => {
            fixture.debugElement.componentInstance.draggable = true;
            fixture.detectChanges();
            tick();
            const dragElement: HTMLElement = fixture.debugElement.query(By.css('.sidebar-resize-handle')).nativeElement;
            dispatchMouseEvent(dragElement, 'mousedown');
            const dragElementRect = dragElement.getBoundingClientRect();
            dispatchMouseEvent(dragElement, 'mousemove', dragElementRect.left + 50, dragElementRect.top);
            dispatchMouseEvent(dragElement, 'mouseup');
            expect(fixture.debugElement.componentInstance.dragWidth).toEqual(50);
        }));

        it('should enable thyCollapsible', fakeAsync(() => {
            fixture.debugElement.componentInstance.collapsible = true;
            fixture.debugElement.componentInstance.collapsibleWidth = 80;
            fixture.detectChanges();
            tick();
            expect(sidebarDebugElement.componentInstance.thyCollapsible).toEqual(true);
            expect(sidebarDebugElement.componentInstance.thyCollapsedWidth).toEqual(80);
        }));

        it('should set correctly thyCollapsed and collapsibleWidth when click collapse button', fakeAsync(() => {
            const inputCollapseWidth = 80;
            const originWidth = sidebarDebugElement.nativeElement.style.width;
            fixture.debugElement.componentInstance.collapsible = true;
            fixture.debugElement.componentInstance.collapsibleWidth = inputCollapseWidth;
            fixture.detectChanges();
            tick();
            const sidebarCollapseElement = sidebarElement.querySelector('.sidebar-collapse');
            dispatchMouseEvent(sidebarCollapseElement, 'click');
            fixture.detectChanges();
            expect(fixture.debugElement.componentInstance.isCollapsed).toEqual(true);
            expect(sidebarDebugElement.nativeElement.style.width).toEqual(inputCollapseWidth + 'px');
            dispatchMouseEvent(sidebarCollapseElement, 'click');
            fixture.detectChanges();
            expect(fixture.debugElement.componentInstance.isCollapsed).toEqual(false);
            expect(sidebarDebugElement.nativeElement.style.width).toEqual(originWidth);
            flush();
        }));

        it(`should be tip text changed when toggle collapse`, fakeAsync(() => {
            fixture.debugElement.componentInstance.collapsible = true;
            fixture.debugElement.componentInstance.collapsibleWidth = 80;
            fixture.detectChanges();
            tick();
            expect(sidebarDebugElement.componentInstance.collapseTip).toEqual('收起');
            const sidebarCollapseElement = sidebarElement.querySelector('.sidebar-collapse');
            dispatchMouseEvent(sidebarCollapseElement, 'click');
            fixture.detectChanges();
            tick(200);
            expect(sidebarDebugElement.componentInstance.collapseTip).toEqual('展开');
            flush();
        }));

        it(`should be not found collapse dom when trigger is null`, fakeAsync(() => {
            fixture.debugElement.componentInstance.collapsible = true;
            fixture.debugElement.componentInstance.triggerTpl = null;
            fixture.detectChanges();
            tick();
            const sidebarCollapseElement = sidebarElement.querySelector('.sidebar-collapse');
            expect(sidebarCollapseElement).toBeFalsy();
        }));

        it(`should be collapse dom exist when trigger is templateRef`, fakeAsync(() => {
            fixture.debugElement.componentInstance.collapsible = true;
            fixture.debugElement.componentInstance.triggerTpl = fixture.debugElement.componentInstance.customTpl;
            fixture.detectChanges();
            tick();
            const sidebarCollapseElement = sidebarElement.querySelector('.sidebar-collapse');
            expect(sidebarCollapseElement).toBeTruthy();
            const customCollapseElement = sidebarElement.querySelector('.custom-collapse');
            expect(customCollapseElement).toBeTruthy();
            flush();
        }));

        it(`should be collapsed when moving drag width to collapsed`, fakeAsync(() => {
            fixture.debugElement.componentInstance.collapsible = true;
            fixture.debugElement.componentInstance.draggable = true;
            fixture.debugElement.componentInstance.isCollapsed = false;
            fixture.debugElement.componentInstance.collapsibleWidth = 80;
            fixture.detectChanges();
            tick();
            const resizableEle = fixture.debugElement.query(By.directive(ThyResizableDirective)).nativeElement as HTMLElement;
            const rect = resizableEle.getBoundingClientRect();
            const resizeHandleEl = resizableEle.querySelector('.sidebar-resize-handle') as HTMLElement;
            dispatchMouseEvent(resizeHandleEl, 'mousedown');
            dispatchMouseEvent(window.document, 'mousemove', rect.left - 120, rect.bottom);
            dispatchMouseEvent(window.document, 'mouseup');
            fixture.detectChanges();
            expect(fixture.debugElement.componentInstance.isCollapsed).toEqual(true);
            flush();
        }));

        it(`should be max width is 100px`, fakeAsync(() => {
            fixture.debugElement.componentInstance.draggable = true;
            fixture.debugElement.componentInstance.dragMaxWidth = 100;
            fixture.debugElement.componentInstance.width = 20;
            fixture.detectChanges();
            tick();
            const resizableEle = fixture.debugElement.query(By.directive(ThyResizableDirective)).nativeElement as HTMLElement;
            const rect = resizableEle.getBoundingClientRect();
            const resizeHandleEl = resizableEle.querySelector('.sidebar-resize-handle') as HTMLElement;
            dispatchMouseEvent(resizeHandleEl, 'mousedown');
            dispatchMouseEvent(window.document, 'mousemove', rect.left + 120, rect.bottom);
            dispatchMouseEvent(window.document, 'mouseup');
            fixture.detectChanges();

            expect(sidebarElement.style.width).toEqual('100px');
            flush();
        }));
    });

    describe('custom-sidebar', () => {
        let fixture: ComponentFixture<ThyDemoLayoutCustomSidebarComponent>;
        let layoutDebugElement: DebugElement;
        let layoutElement: HTMLElement;
        let sidebarDebugElement: DebugElement;
        let sidebarElement: HTMLElement;
        let sidebarHeaderDebugElement: DebugElement;
        let sidebarHeaderElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoLayoutCustomSidebarComponent);
            fixture.detectChanges();
            layoutDebugElement = fixture.debugElement.query(By.directive(ThyLayoutComponent));
            layoutElement = layoutDebugElement.nativeElement;
            sidebarDebugElement = fixture.debugElement.query(By.directive(ThySidebarComponent));
            sidebarElement = sidebarDebugElement.nativeElement;
            sidebarHeaderDebugElement = fixture.debugElement.query(By.directive(ThySidebarHeaderComponent));
            sidebarHeaderElement = sidebarHeaderDebugElement.nativeElement;
        });

        it(`should get correct class`, () => {
            expect(layoutElement.classList.contains(`thy-layout`)).toEqual(true);
            expect(layoutElement.classList.contains(`thy-layout--has-sidebar`)).toEqual(true);
            expect(sidebarElement.classList.contains(`thy-layout-sidebar`)).toEqual(true);
        });

        it(`should get correct custom sidebar template`, () => {
            const sidebarHeaderTitle = sidebarHeaderElement.querySelector(`.title`);
            const sidebarHeaderOperation = sidebarHeaderElement.querySelector('.operation');

            expect(sidebarHeaderTitle).toBeTruthy();
            expect(sidebarHeaderOperation).toBeTruthy();

            expect(sidebarHeaderTitle.innerHTML).toContain('My Custom Sidebar Header Title');
            expect(sidebarHeaderOperation.innerHTML).toContain('My Custom Sidebar Header Operation');
        });
    });
});
