import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ThyLayoutModule } from '../layout.module';
import { By } from '@angular/platform-browser';
import { ThyLayoutComponent } from '../layout.component';
import { injectDefaultSvgIconSet, bypassSanitizeProvider } from 'ngx-tethys/testing/thy-icon';
import { ThySidebarComponent } from '../sidebar.component';
import { dispatchMouseEvent } from 'ngx-tethys/testing';

const SIDEBAR_ISOLATED_CLASS = 'thy-layout-sidebar-isolated';
@Component({
    selector: 'demo-layout-sidebar',
    template: `
        <thy-layout>
            <thy-sidebar
                [thyWidth]="width"
                [thyIsolated]="isolated"
                [thyHasBorderRight]="hasBorderRight"
                [thyIsDraggableWidth]="isDraggableWidth"
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
    });
});
