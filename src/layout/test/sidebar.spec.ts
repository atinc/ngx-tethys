import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick, flush } from '@angular/core/testing';
import { ThyLayoutModule } from '../layout.module';
import { By } from '@angular/platform-browser';
import { ThyLayoutComponent } from '../layout.component';
import { injectDefaultSvgIconSet, bypassSanitizeProvider } from 'ngx-tethys/testing/thy-icon';
import { ThySidebarComponent } from '../sidebar.component';
import { dispatchMouseEvent } from 'ngx-tethys/testing';

const SIDEBAR_ISOLATED_CLASS = 'thy-layout-sidebar-isolated';
@Component({
    selector: 'thy-demo-layout-sidebar',
    template: `
        <thy-layout>
            <thy-sidebar
                [thyWidth]="width"
                [thyIsolated]="isolated"
                [thyHasBorderRight]="hasBorderRight"
                [thyIsDraggableWidth]="isDraggableWidth"
                [thyCollapsible]="collapsible"
                [thyCollapsed]="isCollapsed"
                [thyCollapsedWidth]="collapsibleWidth"
                (thyCollapsedChange)="collapsedChange($event)"
            >
                恩
            </thy-sidebar>
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
    isCollapsed = false;

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

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoLayoutSidebarBasicComponent);
            fixture.detectChanges();
            layoutDebugElement = fixture.debugElement.query(By.directive(ThyLayoutComponent));
            layoutElement = layoutDebugElement.nativeElement;
            sidebarDebugElement = fixture.debugElement.query(By.directive(ThySidebarComponent));
            sidebarElement = sidebarDebugElement.nativeElement;
        });

        it(`should get correct class`, () => {
            expect(layoutElement.classList.contains(`thy-layout`));
            expect(layoutElement.classList.contains(`thy-layout--has-sidebar`));
            expect(sidebarElement.classList.contains(`thy-layout-sidebar`));
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
    });
});
