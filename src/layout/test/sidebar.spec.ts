import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent } from '@tethys/cdk/testing';
import { ThyResizableDirective, ThyResizeEvent } from 'ngx-tethys/resizable';
import { bypassSanitizeProvider, createKeyboardEvent, injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { ThyLayoutComponent } from '../layout.component';
import { ThyLayoutModule } from '../layout.module';
import { ThySidebarContentComponent } from '../sidebar-content.component';
import { ThySidebarFooterComponent } from '../sidebar-footer.component';
import { ThySidebarHeaderComponent } from '../sidebar-header.component';
import { ThySidebarComponent, ThySidebarDirection, ThySidebarTheme } from '../sidebar.component';

const SIDEBAR_ISOLATED_CLASS = 'thy-layout-sidebar-isolated';
@Component({
    selector: 'thy-demo-layout-sidebar',
    template: `
        <thy-layout>
            <thy-sidebar
                [thyWidth]="width"
                [thyDefaultWidth]="defaultWidth"
                [thyTheme]="thyTheme"
                [thyIsolated]="isolated"
                [thyDivided]="isDivided"
                [thyHasBorderLeft]="hasBorderLeft"
                [thyHasBorderRight]="hasBorderRight"
                [thyDraggable]="draggable"
                [thyDragMaxWidth]="dragMaxWidth"
                [thyCollapsible]="collapsible"
                [thyCollapsed]="isCollapsed"
                [thyCollapsedWidth]="collapsibleWidth"
                [thyDirection]="sidebarDirection"
                (thyCollapsedChange)="collapsedChange($event)"
                (thyDragWidthChange)="dragWidthChange($event)"
                [thyTrigger]="triggerTpl">
                <thy-sidebar-header [thyDivided]="true" thyTitle="Title"> </thy-sidebar-header>
                <thy-sidebar-content> Content </thy-sidebar-content>
                <thy-sidebar-footer> Footer </thy-sidebar-footer>
            </thy-sidebar>
            <ng-template #customTpl>
                <div class="custom-collapse"></div>
            </ng-template>
            <thy-content> Yeah, I am content </thy-content>
        </thy-layout>
    `
})
class ThyDemoLayoutSidebarBasicComponent {
    width: string | number = '';
    defaultWidth: string | number = 260;
    isolated = false;
    isDivided = true;
    hasBorderLeft = true;
    hasBorderRight = true;
    draggable = false;
    dragMaxWidth = 100;
    collapsible = false;
    collapsibleWidth = 0;
    thyTheme: ThySidebarTheme;
    isCollapsed = false;
    dragWidth: number;
    sidebarDirection: ThySidebarDirection = 'left';

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
            <thy-sidebar [thyDirection]="sidebarDirection">
                <thy-sidebar-header>
                    <ng-template #headerTitle>My Custom Sidebar Header Title</ng-template>
                    <ng-template #headerOperation>My Custom Sidebar Header Operation</ng-template>
                </thy-sidebar-header>
            </thy-sidebar>
            <thy-content>Yeah, I am content</thy-content>
        </thy-layout>
    `
})
class ThyDemoLayoutCustomSidebarComponent {
    sidebarDirection = 'right';
}

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
        let testInstance: ThyDemoLayoutSidebarBasicComponent;
        let layoutDebugElement: DebugElement;
        let layoutElement: HTMLElement;
        let sidebarDebugElement: DebugElement;
        let sidebarElement: HTMLElement;
        let sidebarComponent: ThySidebarComponent;
        let sidebarHeaderDebugElement: DebugElement;
        let sidebarHeaderElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoLayoutSidebarBasicComponent);
            fixture.detectChanges();
            testInstance = fixture.debugElement.componentInstance;

            layoutDebugElement = fixture.debugElement.query(By.directive(ThyLayoutComponent));
            layoutElement = layoutDebugElement.nativeElement;

            sidebarDebugElement = fixture.debugElement.query(By.directive(ThySidebarComponent));
            sidebarElement = sidebarDebugElement.nativeElement;
            sidebarComponent = sidebarDebugElement.componentInstance;

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
            testInstance.thyTheme = 'dark';
            fixture.detectChanges();
            expect(sidebarElement.classList).toContain('sidebar-theme-dark');
        });

        it(`should get correct class with theme light`, () => {
            expect(sidebarElement.classList).not.toContain('sidebar-theme-light');
            testInstance.thyTheme = 'light';
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

        it(`should get correct class according to thyHasBorderLeft value`, () => {
            expect(sidebarElement.classList).not.toContain('thy-layout-sidebar--clear-border-left');
            testInstance.sidebarDirection = 'right';
            testInstance.hasBorderLeft = false;
            fixture.detectChanges();
            expect(sidebarElement.classList).toContain('thy-layout-sidebar--clear-border-left');
        });

        it(`should get correct class according to thyHasBorderRight value`, () => {
            expect(sidebarElement.classList).not.toContain('thy-layout-sidebar--clear-border-right');
            testInstance.hasBorderRight = false;
            fixture.detectChanges();
            expect(sidebarElement.classList).toContain('thy-layout-sidebar--clear-border-right');
        });

        it(`should get correct class according to thyDirection value`, () => {
            expect(sidebarElement.classList).not.toContain('thy-layout-sidebar-right');
            testInstance.sidebarDirection = 'right';
            fixture.detectChanges();
            expect(sidebarElement.classList).toContain('thy-layout-sidebar-right');
        });

        it(`should get correct class according to thyDivided value when thyDirection is left`, () => {
            expect(sidebarElement.classList).not.toContain('thy-layout-sidebar--clear-border-right');

            testInstance.isDivided = false;
            fixture.detectChanges();
            expect(sidebarElement.classList).toContain('thy-layout-sidebar--clear-border-right');
        });

        it(`should get correct class according to thyDivided value when thyDirection is right`, () => {
            expect(sidebarElement.classList).not.toContain('thy-layout-sidebar--clear-border-left');

            testInstance.sidebarDirection = 'right';
            fixture.detectChanges();
            expect(sidebarElement.classList).not.toContain('thy-layout-sidebar--clear-border-left');

            testInstance.isDivided = false;
            fixture.detectChanges();
            expect(sidebarElement.classList).toContain('thy-layout-sidebar--clear-border-left');
        });

        describe('thyDraggable', () => {
            it('should drag width', fakeAsync(() => {
                testInstance.draggable = true;
                fixture.detectChanges();
                tick();
                const dragElement: HTMLElement = fixture.debugElement.query(By.css('.sidebar-drag')).nativeElement;
                const resizeHandleElement: HTMLElement = fixture.debugElement.query(By.css('.sidebar-resize-handle')).nativeElement;
                expect(dragElement).toBeTruthy();
                expect(resizeHandleElement).toBeTruthy();
                dispatchMouseEvent(resizeHandleElement, 'mouseenter');
                dispatchMouseEvent(resizeHandleElement, 'mousedown');
                const dragElementRect = resizeHandleElement.getBoundingClientRect();
                dispatchMouseEvent(resizeHandleElement, 'mousemove', dragElementRect.left + 50, dragElementRect.top);
                dispatchMouseEvent(resizeHandleElement, 'mouseleave');
            }));

            it('should restore drag width to default width', fakeAsync(() => {
                testInstance.draggable = true;
                fixture.detectChanges();
                tick();
                const dragElement: HTMLElement = fixture.debugElement.query(By.css('.sidebar-drag')).nativeElement;
                const resizeHandleElement: HTMLElement = fixture.debugElement.query(By.css('.sidebar-resize-handle')).nativeElement;
                expect(dragElement).toBeTruthy();
                expect(resizeHandleElement).toBeTruthy();
                expect(sidebarElement.style.width).toEqual('240px');
                dispatchMouseEvent(resizeHandleElement, 'dblclick');
                fixture.detectChanges();
                expect(sidebarElement.style.width).toEqual('260px');
                flush();
            }));

            it('should collapse sidebar when drag width equal thyCollapsedWidth', fakeAsync(() => {
                testInstance.draggable = true;
                fixture.detectChanges();
                tick();

                sidebarComponent.collapseVisible = true;
                sidebarComponent.thyCollapsedWidth = 20;
                sidebarComponent.thyCollapsible = true;
                expect(sidebarComponent.isCollapsed).toEqual(false);
                sidebarComponent.resizeHandler({ width: sidebarComponent.thyCollapsedWidth } as unknown as ThyResizeEvent);
                expect(sidebarComponent.collapseVisible).toEqual(false);
                expect(sidebarComponent.isCollapsed).toEqual(true);
                tick(200);
                expect(sidebarComponent.collapseTip).toContain('展开');
            }));
        });

        it('should enable thyCollapsible', fakeAsync(() => {
            testInstance.collapsible = true;
            testInstance.collapsibleWidth = 80;
            fixture.detectChanges();
            tick();
            expect(sidebarComponent.thyCollapsible).toEqual(true);
            expect(sidebarComponent.thyCollapsedWidth).toEqual(80);
        }));

        it('should sidebar expand or collapsed when press mete+/ or control+/', fakeAsync(() => {
            testInstance.collapsible = true;
            fixture.detectChanges();
            const spy = spyOn(fixture.componentInstance, 'collapsedChange');
            const metaEvent = createKeyboardEvent('keydown', null, '/', { meta: true });
            const controlEvent = createKeyboardEvent('keydown', null, '/', { control: true });
            document.dispatchEvent(metaEvent);
            tick();
            expect(spy).toHaveBeenCalledTimes(1);
            document.dispatchEvent(controlEvent);
            tick();
            expect(spy).toHaveBeenCalledTimes(2);
            flush();
        }));

        it('should set correctly thyCollapsed and collapsibleWidth when click collapse button', fakeAsync(() => {
            const inputCollapseWidth = 80;
            const originWidth = sidebarDebugElement.nativeElement.style.width;
            testInstance.collapsible = true;
            testInstance.collapsibleWidth = inputCollapseWidth;
            fixture.detectChanges();
            tick();
            const sidebarCollapseElement = sidebarElement.querySelector('.sidebar-collapse');
            dispatchMouseEvent(sidebarCollapseElement, 'click');
            fixture.detectChanges();
            expect(testInstance.isCollapsed).toEqual(true);
            expect(sidebarDebugElement.nativeElement.style.width).toEqual(inputCollapseWidth + 'px');
            dispatchMouseEvent(sidebarCollapseElement, 'click');
            fixture.detectChanges();
            expect(testInstance.isCollapsed).toEqual(false);
            expect(sidebarDebugElement.nativeElement.style.width).toEqual(originWidth);
            flush();
        }));

        it(`should be tip text changed when toggle collapse`, fakeAsync(() => {
            testInstance.collapsible = true;
            testInstance.collapsibleWidth = 80;
            fixture.detectChanges();
            tick();
            expect(sidebarComponent.collapseTip).toContain('收起');
            const sidebarCollapseElement = sidebarElement.querySelector('.sidebar-collapse');
            dispatchMouseEvent(sidebarCollapseElement, 'click');
            fixture.detectChanges();
            tick(200);
            expect(sidebarComponent.collapseTip).toContain('展开');
            flush();
        }));

        it(`should be not found collapse dom when trigger is null`, fakeAsync(() => {
            testInstance.collapsible = true;
            testInstance.triggerTpl = null;
            fixture.detectChanges();
            tick();
            const sidebarCollapseElement = sidebarElement.querySelector('.sidebar-collapse');
            expect(sidebarCollapseElement).toBeFalsy();
        }));

        it(`should be collapse dom exist when trigger is templateRef`, fakeAsync(() => {
            testInstance.collapsible = true;
            testInstance.triggerTpl = testInstance.customTpl;
            fixture.detectChanges();
            tick();
            const sidebarCollapseElement = sidebarElement.querySelector('.sidebar-collapse');
            expect(sidebarCollapseElement).toBeTruthy();
            const customCollapseElement = sidebarElement.querySelector('.custom-collapse');
            expect(customCollapseElement).toBeTruthy();
            flush();
        }));

        it(`should visible collapse dom when hover sidebar element`, fakeAsync(() => {
            testInstance.collapsible = true;
            testInstance.triggerTpl = testInstance.customTpl;
            fixture.detectChanges();
            tick();
            dispatchMouseEvent(sidebarElement, 'mouseenter');
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            const sidebarCollapseElement = sidebarElement.querySelector('.sidebar-collapse.collapse-visible');
            expect(sidebarCollapseElement).toBeTruthy();
            dispatchMouseEvent(sidebarElement, 'mouseleave');
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            const customCollapseElement = sidebarElement.querySelector('.sidebar-collapse.collapse-visible');
            expect(customCollapseElement).toBeFalsy();
        }));

        it(`should be collapsed when moving drag width to collapsed`, fakeAsync(() => {
            testInstance.collapsible = true;
            testInstance.draggable = true;
            testInstance.isCollapsed = false;
            testInstance.collapsibleWidth = 80;
            fixture.detectChanges();
            tick();
            const resizableEle = fixture.debugElement.query(By.directive(ThyResizableDirective)).nativeElement as HTMLElement;
            const rect = resizableEle.getBoundingClientRect();
            const resizeHandleEl = resizableEle.querySelector('.sidebar-resize-handle') as HTMLElement;
            dispatchMouseEvent(resizeHandleEl, 'mousedown');
            dispatchMouseEvent(window.document, 'mousemove', rect.left - 120, rect.bottom);
            dispatchMouseEvent(window.document, 'mouseup');
            fixture.detectChanges();
            expect(testInstance.isCollapsed).toEqual(true);
            flush();
        }));

        it(`should be max width is 100px`, fakeAsync(() => {
            testInstance.draggable = true;
            testInstance.dragMaxWidth = 100;
            testInstance.width = 20;
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
            expect(layoutElement.classList.contains(`thy-layout--is-sidebar-right`)).toEqual(true);
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
