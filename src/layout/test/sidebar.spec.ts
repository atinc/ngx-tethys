import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick, flush } from '@angular/core/testing';
import { ThyLayoutModule } from '../layout.module';
import { By } from '@angular/platform-browser';
import { ThyLayoutComponent } from '../layout.component';
import { injectDefaultSvgIconSet, bypassSanitizeProvider } from 'ngx-tethys/testing';
import { ThySidebarComponent, ThySidebarTheme } from '../sidebar.component';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { ThySidebarHeaderComponent } from '../sidebar-header.component';

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
                [thyIsDraggableWidth]="isDraggableWidth"
                [thyCollapsible]="collapsible"
                [thyCollapsed]="isCollapsed"
                [thyCollapsedWidth]="collapsibleWidth"
                (thyCollapsedChange)="collapsedChange($event)"
                [thyTrigger]="triggerTpl"
            >
                <thy-sidebar-header [thyDivided]="true" thyTitle="Title"> </thy-sidebar-header>
                恩
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
    isDraggableWidth = false;
    collapsible = false;
    collapsibleWidth = 0;
    thyTheme: ThySidebarTheme;
    isCollapsed = false;

    @ViewChild('customTpl', { read: TemplateRef, static: true }) customTpl: TemplateRef<unknown> | undefined;

    triggerTpl: TemplateRef<any> | undefined | null;

    collapsedChange(isCollapsed: boolean) {
        this.isCollapsed = isCollapsed;
    }
}

describe(`sidebar`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ThyDemoLayoutSidebarBasicComponent],
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
            expect(sidebarElement.style.width).toEqual('');
            fixture.componentInstance.width = 'lg';
            fixture.detectChanges();
            expect(sidebarElement.style.width).toEqual('300px');
        });

        it(`should get correct 200px width when input 200`, () => {
            expect(sidebarElement.style.width).toEqual('');
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

        it('thyIsDraggableWidth', fakeAsync(() => {
            fixture.debugElement.componentInstance.isDraggableWidth = true;
            fixture.detectChanges();
            tick();
            const dragElement = sidebarDebugElement.componentInstance.dragRef.nativeElement;
            const dragElementRect = dragElement.getBoundingClientRect();
            dispatchMouseEvent(dragElement, 'mousedown');
            dispatchMouseEvent(dragElement, 'mousemove', dragElementRect.left + 20, dragElementRect.height);
            dispatchMouseEvent(dragElement, 'mouseup');
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
            fixture.debugElement.componentInstance.collapsible = true;
            fixture.debugElement.componentInstance.collapsibleWidth = inputCollapseWidth;
            fixture.detectChanges();
            tick();
            const sidebarCollapseElement = sidebarElement.querySelector('.sidebar-collapse');
            dispatchMouseEvent(sidebarCollapseElement, 'click');
            fixture.detectChanges();
            expect(fixture.debugElement.componentInstance.isCollapsed).toEqual(true);
            expect(sidebarDebugElement.nativeElement.style.width).toEqual(fixture.debugElement.componentInstance.collapsibleWidth + 'px');
            dispatchMouseEvent(sidebarCollapseElement, 'click');
            fixture.detectChanges();
            expect(fixture.debugElement.componentInstance.isCollapsed).toEqual(false);
            expect(sidebarDebugElement.nativeElement.style.width).toEqual(inputCollapseWidth + 'px');
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
            expect(sidebarCollapseElement).toBeTruthy();
        }));
    });
});
