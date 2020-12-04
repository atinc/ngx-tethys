import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyLayoutModule } from '../layout.module';
import { By } from '@angular/platform-browser';
import { ThyLayoutComponent } from '../layout.component';
import { ThyHeaderComponent } from '../header.component';
import { injectDefaultSvgIconSet, bypassSanitizeProvider } from 'ngx-tethys/testing/thy-icon';
import { ThyContentComponent } from '../content.component';
import { ThySidebarComponent } from '../sidebar.component';

const SIDEBAR_ISOLATED_CLASS = 'thy-layout-sidebar-isolated';
@Component({
    selector: 'demo-layout-sidebar',
    template: `
        <thy-layout>
            <thy-sidebar [thyWidth]="width" [thyIsolated]="isolated"> 恩 </thy-sidebar>
            <thy-content>
                恩，我是 content
            </thy-content>
        </thy-layout>
    `
})
class ThyDemoLayoutSidebarBasicComponent {
    width: string | number = '';
    isolated = false;
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
    });
});
