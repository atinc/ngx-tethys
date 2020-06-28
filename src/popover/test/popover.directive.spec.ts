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
import { dispatchMouseEvent } from '../../core/testing/dispatcher-events';

@Component({
    selector: 'thy-demo-tooltip-basic',
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
    showDelay = 0;
    hideDelay = 0;
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

            dispatchMouseEvent(buttonElement, 'mouseleave', 0, 0, 0, overlayContainerElement.querySelector('.thy-popover-container'));
            flush();
            fixture.detectChanges();
            flush();
            expect(getPopoverVisible()).toBe(true);

            dispatchMouseEvent(overlayContainerElement.querySelector('.thy-popover-container'), 'mouseleave');
            flush();
            fixture.detectChanges();
            flush();
            expect(getPopoverVisible()).toBe(false);

            // trigger again
            dispatchMouseEvent(buttonElement, 'mouseenter');
            fixture.detectChanges();
            flush();
            expect(getPopoverVisible()).toBe(true);

            dispatchMouseEvent(buttonElement, 'mouseleave', 0, 0, 0, overlayContainerElement.querySelector('.thy-popover-container'));
            flush();
            fixture.detectChanges();
            flush();
            expect(getPopoverVisible()).toBe(true);

            dispatchMouseEvent(overlayContainerElement.querySelector('.thy-popover-container'), 'mouseleave');
            flush();
            fixture.detectChanges();
            flush();
            expect(getPopoverVisible()).toBe(false);
        }));
    });
});
