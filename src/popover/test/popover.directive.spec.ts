import { ViewChild, Component, ElementRef, NgModule, DebugElement } from '@angular/core';
import { ThyPopoverDirective } from '../popover.directive';
import { ThyPlacement } from '../../core/overlay/interface';
import { fakeAsync, TestBed, inject, ComponentFixture, tick, flush } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ThyPopoverModule } from '../module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent } from 'ngx-tethys/testing';

@Component({
    selector: 'thy-demo-popover-basic',
    template: `
        <button
            thyButton="primary"
            [thyPopover]="template"
            [thyTrigger]="trigger"
            [thyPlacement]="placement"
            [thyConfig]="config"
            [thyShowDelay]="showDelay"
            [thyHideDelay]="hideDelay"
        >
            Use Template
        </button>
        <ng-template #template>
            恩，这是一个 Template
        </ng-template>
    `
})
class ThyDemoVisiblePopoverComponent {
    @ViewChild(ThyPopoverDirective, { static: true }) popover: ThyPopoverDirective;

    placement: ThyPlacement = 'bottom';
    trigger = 'hover';
    showDelay = 1000;
    hideDelay = 1000;
    config = {
        panelClass: 'demo-popover'
    };

    constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@NgModule({
    imports: [ThyPopoverModule],
    declarations: [ThyDemoVisiblePopoverComponent],
    exports: []
})
export class TooltipTestModule {}

describe(`ThyTooltip`, () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let platform: { IOS: boolean; isBrowser: boolean; ANDROID: boolean };

    beforeEach(fakeAsync(() => {
        platform = { IOS: false, isBrowser: true, ANDROID: false };
        TestBed.configureTestingModule({
            imports: [TooltipTestModule, NoopAnimationsModule],
            providers: [{ provide: Platform, useFactory: () => platform }]
        });

        TestBed.compileComponents();

        inject([OverlayContainer, FocusMonitor], (oc: OverlayContainer, fm: FocusMonitor) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();
    }));

    afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
        // Since we're resetting the testing module in some of the tests,
        // we can potentially have multiple overlay containers.
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
    }));

    describe(`popover directive`, () => {
        let fixture: ComponentFixture<ThyDemoVisiblePopoverComponent>;
        let popoverDirective: ThyPopoverDirective;
        let buttonDebugElement: DebugElement;
        let buttonElement: HTMLElement;

        function getPopoverVisible() {
            return popoverDirective.popoverOpened;
        }

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoVisiblePopoverComponent);
            fixture.detectChanges();
            buttonDebugElement = fixture.debugElement.query(By.css('button'));
            buttonElement = buttonDebugElement.nativeElement;
            popoverDirective = buttonDebugElement.injector.get<ThyPopoverDirective>(ThyPopoverDirective);
        });

        it('popover visible', fakeAsync(() => {
            dispatchMouseEvent(buttonElement, 'mouseenter');
            fixture.detectChanges();
            flush();
            expect(getPopoverVisible()).toBe(true);

            let container = overlayContainerElement.querySelector('.thy-popover-container');
            dispatchMouseEvent(buttonElement, 'mouseleave');
            dispatchMouseEvent(container, 'mouseenter');

            flush();
            fixture.detectChanges();
            flush();
            expect(getPopoverVisible()).toBe(true);

            dispatchMouseEvent(container, 'mouseleave');
            flush();
            fixture.detectChanges();
            flush();
            expect(getPopoverVisible()).toBe(false);

            // trigger again
            dispatchMouseEvent(buttonElement, 'mouseenter');
            fixture.detectChanges();
            flush();
            expect(getPopoverVisible()).toBe(true);

            container = overlayContainerElement.querySelector('.thy-popover-container');
            dispatchMouseEvent(buttonElement, 'mouseleave');
            dispatchMouseEvent(container, 'mouseenter');

            flush();
            fixture.detectChanges();
            flush();
            expect(getPopoverVisible()).toBe(true);

            dispatchMouseEvent(container, 'mouseleave');
            flush();
            fixture.detectChanges();
            flush();
            expect(getPopoverVisible()).toBe(false);
        }));

        it('should show popover delay 1000ms', fakeAsync(() => {
            dispatchMouseEvent(buttonElement, 'mouseenter');
            fixture.detectChanges();
            tick(500);
            expect(getPopoverVisible()).toBe(false);
            tick(500);
            expect(getPopoverVisible()).toBe(true);
        }));

        it('should clear showTimeout when hide popover', fakeAsync(() => {
            dispatchMouseEvent(buttonElement, 'mouseenter');
            fixture.detectChanges();
            tick(500);

            dispatchMouseEvent(buttonElement, 'mouseleave');
            fixture.detectChanges();
            tick(500);
            expect(getPopoverVisible()).toBe(false);
        }));

        it('should clear hideTimeout when trigger show popover', fakeAsync(() => {
            dispatchMouseEvent(buttonElement, 'mouseenter');
            fixture.detectChanges();
            flush();
            expect(getPopoverVisible()).toBe(true);

            dispatchMouseEvent(buttonElement, 'mouseleave');
            fixture.detectChanges();
            tick(500);

            dispatchMouseEvent(buttonElement, 'mouseenter');
            fixture.detectChanges();
            tick(1000);
            expect(getPopoverVisible()).toBe(true);
        }));
    });
});

@Component({
    selector: 'thy-demo-popover-basic',
    template: `
        <button
            thyButton="primary"
            [thyPopover]="template"
            [thyTrigger]="trigger"
            [thyPlacement]="placement"
            [thyConfig]="config"
            [thyShowDelay]="showDelay"
            [thyHideDelay]="hideDelay"
            [thyDisabled]="disabled"
        >
            Use Template
        </button>
        <ng-template #template>
            恩，这是一个 Template
        </ng-template>
    `
})
class TestPopoverDirectiveClickComponent {
    @ViewChild(ThyPopoverDirective, { static: true }) popover: ThyPopoverDirective;

    placement: ThyPlacement = 'bottom';
    trigger = 'click';
    showDelay = 0;
    hideDelay = 0;
    config = {
        panelClass: 'demo-popover'
    };
    disabled = false;

    constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@NgModule({
    imports: [ThyPopoverModule],
    declarations: [TestPopoverDirectiveClickComponent],
    exports: []
})
export class PopoverTestModule {}

describe(`ThyPopoverDirective`, () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let platform: { IOS: boolean; isBrowser: boolean; ANDROID: boolean };

    beforeEach(fakeAsync(() => {
        platform = { IOS: false, isBrowser: true, ANDROID: false };
        TestBed.configureTestingModule({
            imports: [PopoverTestModule, NoopAnimationsModule],
            providers: [{ provide: Platform, useFactory: () => platform }]
        });

        TestBed.compileComponents();

        inject([OverlayContainer, FocusMonitor], (oc: OverlayContainer, fm: FocusMonitor) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();
    }));

    afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
    }));

    describe(`popover directive`, () => {
        let fixture: ComponentFixture<TestPopoverDirectiveClickComponent>;
        let popoverDirective: ThyPopoverDirective;
        let buttonDebugElement: DebugElement;
        let buttonElement: HTMLElement;

        function getPopoverVisible() {
            return popoverDirective.popoverOpened;
        }

        beforeEach(() => {
            fixture = TestBed.createComponent(TestPopoverDirectiveClickComponent);
            fixture.detectChanges();
            buttonDebugElement = fixture.debugElement.query(By.css('button'));
            buttonElement = buttonDebugElement.nativeElement;
            popoverDirective = buttonDebugElement.injector.get<ThyPopoverDirective>(ThyPopoverDirective);
        });

        it('should show popover when click trigger', fakeAsync(() => {
            dispatchMouseEvent(buttonElement, 'click');
            fixture.detectChanges();
            flush();
            expect(getPopoverVisible()).toBe(true);
            fixture.detectChanges();
            tick(100);
        }));

        it('should not show popover when `thyDisabled = true` is set', fakeAsync(() => {
            fixture.componentInstance.trigger = 'hover';
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            flush();

            dispatchMouseEvent(buttonElement, 'mouseenter');
            fixture.detectChanges();
            tick(500);
            expect(getPopoverVisible()).toBe(false);
            fixture.detectChanges();
            tick(100);
        }));

        it('should not be shown popover when `thyDisabled = true` and in deferred mode', fakeAsync(() => {
            fixture.componentInstance.trigger = 'hover';
            fixture.componentInstance.showDelay = 2000;
            fixture.componentInstance.showDelay = 1000;
            fixture.detectChanges();
            flush();

            dispatchMouseEvent(buttonElement, 'mouseenter');
            fixture.detectChanges();

            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            tick(2500);

            expect(getPopoverVisible()).toBe(false);
        }));
    });
});
