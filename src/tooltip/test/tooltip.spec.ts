import { FocusMonitor } from '@angular/cdk/a11y';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, ElementRef, ViewChild, inject as coreInject } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync, fakeAsync, flush, flushMicrotasks, inject, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ThyTooltipModule, ThyTooltipDirective, ThyTooltipService, ThyTooltipRef } from 'ngx-tethys/tooltip';
import { Platform } from '@angular/cdk/platform';
import { dispatchMouseEvent, dispatchTouchEvent } from 'ngx-tethys/testing';

const initialTooltipMessage = 'hello, this is tooltip message';
const TOOLTIP_CLASS = `thy-tooltip`;
const tooltipTemplateContext = { text: 'hello world' };

@Component({
    selector: 'thy-demo-tooltip-basic',
    template: `
        <button
            [thyTooltip]="message"
            [thyTooltipDisabled]="disabled"
            [thyTooltipShowDelay]="showDelay"
            [thyTooltipHideDelay]="hideDelay"
            [thyTooltipPlacement]="placement">
            Basic Usage
        </button>

        <button #tooltipHost>Tooltip Host</button>
    `,
    imports: [ThyTooltipDirective]
})
class ThyDemoTooltipBasicComponent {
    elementRef = coreInject<ElementRef<HTMLElement>>(ElementRef);

    @ViewChild(ThyTooltipDirective, { static: true }) tooltip: ThyTooltipDirective;

    @ViewChild('tooltipHost', { static: true }) tooltipHostElement: ElementRef<HTMLElement>;

    message = initialTooltipMessage;

    disabled = false;

    showDelay = 0;

    hideDelay = 0;

    placement = 'top';
}

@Component({
    selector: 'thy-demo-tooltip-template',
    template: `
        <button
            [thyTooltip]="world"
            [thyTooltipDisabled]="disabled"
            [thyTooltipTemplateContext]="message"
            [thyTooltipPlacement]="placement"
            [thyTooltipShowDelay]="showDelay"
            [thyTooltipHideDelay]="hideDelay"
            thyButton="primary">
            Tooltip with Template
        </button>
        <ng-template #world let-data>{{ data.text }}</ng-template>
    `,
    imports: [ThyTooltipDirective]
})
class ThyDemoTooltipTemplateComponent {
    @ViewChild(ThyTooltipDirective, { static: true }) tooltip: ThyTooltipDirective;

    message = tooltipTemplateContext;

    disabled = false;

    showDelay: any = undefined;

    hideDelay: any = undefined;

    placement = 'top';
}

describe(`ThyTooltip`, () => {
    let overlayContainer: OverlayContainer | undefined = undefined;
    let overlayContainerElement: HTMLElement | undefined = undefined;
    let platform: { IOS: boolean; isBrowser: boolean; ANDROID: boolean } | undefined = undefined;

    beforeEach(fakeAsync(() => {
        platform = { IOS: false, isBrowser: true, ANDROID: false };
        TestBed.configureTestingModule({
            imports: [ThyTooltipModule],
            providers: [provideNoopAnimations(), { provide: Platform, useFactory: () => platform }]
        });

        TestBed.compileComponents();

        inject([OverlayContainer, FocusMonitor], (oc: OverlayContainer, fm: FocusMonitor) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
            // focusMonitor = fm;
        })();
    }));

    afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
        // Since we're resetting the testing module in some of the tests,
        // we can potentially have multiple overlay containers.
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
    }));

    /** Asserts whether a tooltip directive has a tooltip instance. */
    function assertTooltipInstance(tooltip: ThyTooltipDirective, shouldExist: boolean): void {
        const tooltipInstance = tooltip['tooltipRef'] ? tooltip['tooltipRef']['tooltipInstance'] : null;
        expect(!!tooltipInstance).toBe(shouldExist);
    }

    describe(`touch usage`, () => {
        let fixture: ComponentFixture<ThyDemoTooltipBasicComponent> | undefined = undefined;
        let tooltipDirective: ThyTooltipDirective | undefined = undefined;
        let buttonDebugElement: DebugElement | undefined = undefined;
        let buttonElement: HTMLElement | undefined = undefined;

        function getTooltipVisible() {
            return tooltipDirective['tooltipRef'] ? tooltipDirective['tooltipRef']['isTooltipVisible']() : false;
        }

        beforeEach(() => {
            platform.ANDROID = true;
            fixture = TestBed.createComponent(ThyDemoTooltipBasicComponent);
            fixture.detectChanges();
            buttonDebugElement = fixture.debugElement.query(By.css('button'));
            buttonElement = buttonDebugElement.nativeElement;
            tooltipDirective = buttonDebugElement.injector.get<ThyTooltipDirective>(ThyTooltipDirective);
        });

        it('should show the tooltip for tap', fakeAsync(() => {
            assertTooltipInstance(tooltipDirective, false);
            dispatchTouchEvent(buttonElement, 'touchstart');
            fixture.detectChanges();
            tick(100); // tap time
            dispatchTouchEvent(buttonElement, 'touchend');
            fixture.detectChanges();
            tick(100);
            expect(getTooltipVisible()).toBe(true);
            flush();
        }));

        it('should show the tooltip for long press', fakeAsync(() => {
            assertTooltipInstance(tooltipDirective, false);
            dispatchTouchEvent(buttonElement, 'touchstart');
            fixture.detectChanges();
            tick(600); // default long press time is 500
            expect(getTooltipVisible()).toBe(true);
            flush();
        }));

        it('should not prevent the default action on touchstart', () => {
            const event = dispatchTouchEvent(buttonElement, 'touchstart');
            fixture.detectChanges();
            expect(event.defaultPrevented).toBe(false);
        });

        it('should close on touchend with a delay', fakeAsync(() => {
            dispatchTouchEvent(buttonElement, 'touchstart');
            fixture.detectChanges();
            tick(500); // Finish the animation.
            assertTooltipInstance(tooltipDirective, true);
            expect(getTooltipVisible()).toBe(true);

            dispatchTouchEvent(buttonElement, 'touchend');
            fixture.detectChanges();
            tick(1000); // 2/3 through the delay
            assertTooltipInstance(tooltipDirective, true);
            expect(getTooltipVisible()).toBe(true);

            tick(500); // Finish the delay.
            fixture.detectChanges();
            tick(500); // Finish the exit animation.

            assertTooltipInstance(tooltipDirective, false);
            expect(getTooltipVisible()).toBe(false);
        }));

        it('should close on touchmove', fakeAsync(() => {
            dispatchTouchEvent(buttonElement, 'touchstart');
            fixture.detectChanges();
            tick(100);
            assertTooltipInstance(tooltipDirective, false);
            expect(getTooltipVisible()).toBe(false);

            dispatchTouchEvent(buttonElement, 'touchmove');
            fixture.detectChanges();
            tick(100); // touch moving
            assertTooltipInstance(tooltipDirective, false);
            expect(getTooltipVisible()).toBe(false);

            dispatchTouchEvent(buttonElement, 'touchend');
            fixture.detectChanges();
            tick(100);
            assertTooltipInstance(tooltipDirective, false);
            expect(getTooltipVisible()).toBe(false);
        }));
    });

    describe(`basic usage`, () => {
        let fixture: ComponentFixture<ThyDemoTooltipBasicComponent> | undefined = undefined;
        let basicTestComponent: ThyDemoTooltipBasicComponent | undefined = undefined;
        // let tooltipDebugElement: DebugElement;
        let tooltipDirective: ThyTooltipDirective | undefined = undefined;
        let buttonDebugElement: DebugElement | undefined = undefined;
        let buttonElement: HTMLElement | undefined = undefined;

        function getTooltipVisible() {
            return tooltipDirective['tooltipRef'] ? tooltipDirective['tooltipRef']['isTooltipVisible']() : false;
        }

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoTooltipBasicComponent);
            fixture.detectChanges();
            basicTestComponent = fixture.debugElement.componentInstance;

            buttonDebugElement = fixture.debugElement.query(By.css('button'));
            buttonElement = buttonDebugElement.nativeElement;

            tooltipDirective = buttonDebugElement.injector.get<ThyTooltipDirective>(ThyTooltipDirective);
        });

        it('should show and hide the tooltip', fakeAsync(() => {
            assertTooltipInstance(tooltipDirective, false);
            // fake mouseenter event
            dispatchMouseEvent(buttonElement, 'mouseenter');

            expect(getTooltipVisible()).toBe(false);
            // Tick for the show delay (default is 200)
            tick(200);
            expect(getTooltipVisible()).toBe(true);
            expect(overlayContainerElement.textContent).toEqual('');
            expect(tooltipDirective['tooltipRef']['overlayRef']['_scrollStrategy']['_scrollSubscription']).toBeTruthy();
            fixture.detectChanges();

            // wait till animation has finished
            tick(100);

            // Make sure tooltip is shown to the user and animation has finished
            const tooltipElement = overlayContainerElement.querySelector(`.${TOOLTIP_CLASS}`) as HTMLElement;
            expect(tooltipElement instanceof HTMLElement).toBe(true);
            expect(tooltipElement.style.transform).toBe('scale(1)');
            expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);
            const tooltipHideDelay = 100; // default hide delay is 100
            // fake mouseleave event
            dispatchMouseEvent(buttonElement, 'mouseleave');
            expect(getTooltipVisible()).toBe(true);

            tick(tooltipHideDelay);
            fixture.detectChanges();
            expect(getTooltipVisible()).toBe(false);
            expect(tooltipDirective['tooltipRef']['overlayRef']['_scrollStrategy']['_scrollSubscription']).toBe(null);
            assertTooltipInstance(tooltipDirective, true);

            // On animation complete, should expect that the tooltip has been detached.
            flushMicrotasks();
            assertTooltipInstance(tooltipDirective, false);
        }));

        it('should show without show delay', fakeAsync(() => {
            assertTooltipInstance(tooltipDirective, false);

            basicTestComponent.showDelay = 0;
            fixture.detectChanges();

            expect(getTooltipVisible()).toBe(false);
            // fake mouseenter event
            dispatchMouseEvent(buttonElement, 'mouseenter');
            tick(0);
            expect(getTooltipVisible()).toBe(true);
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);
        }));

        // for test more fast, show tooltip directly call tooltip directive's show
        // method without delay replace mock mouseenter event as belows
        // because the above cases have been test mouseenter and delay

        it('should be able to override the show and hide delays', fakeAsync(() => {
            basicTestComponent.showDelay = 477;
            basicTestComponent.hideDelay = 688;

            fixture.detectChanges();
            tooltipDirective.show();
            tick();

            expect(getTooltipVisible()).toBe(false);
            tick(477);
            expect(getTooltipVisible()).toBe(true);

            tooltipDirective.hide();
            fixture.detectChanges();
            tick();

            expect(getTooltipVisible()).toBe(true);
            tick(688);
            expect(getTooltipVisible()).toBe(false);
        }));

        xit('should be able to override the default placement', fakeAsync(() => {
            const originElement = basicTestComponent.elementRef.nativeElement;

            originElement.style.position = 'absolute';
            originElement.style.top = '200px';
            originElement.style.right = '20px';

            basicTestComponent.placement = 'left';
            fixture.detectChanges();
            expect(tooltipDirective.placement).toBe('left');
            tooltipDirective.show(0);
            tick(0);
            fixture.detectChanges();
            tick(200);

            expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);
            const tooltipPaneElement = overlayContainerElement.querySelector(`.thy-tooltip-panel`) as HTMLElement;
            expect(tooltipPaneElement.classList.contains('thy-tooltip-left')).toBe(true);
        }));

        it('should not show tooltip when content is not present or empty', () => {
            assertTooltipInstance(tooltipDirective, false);

            basicTestComponent.message = undefined;
            fixture.detectChanges();
            tooltipDirective.show(0);
            assertTooltipInstance(tooltipDirective, false);

            basicTestComponent.message = null;
            fixture.detectChanges();
            tooltipDirective.show(0);
            assertTooltipInstance(tooltipDirective, false);

            basicTestComponent.message = '';
            fixture.detectChanges();
            tooltipDirective.show(0);
            assertTooltipInstance(tooltipDirective, false);

            basicTestComponent.message = '   ';
            fixture.detectChanges();
            tooltipDirective.show(0);
            assertTooltipInstance(tooltipDirective, false);

            basicTestComponent.message = 'new message';
            fixture.detectChanges();
            tooltipDirective.show(0);
            assertTooltipInstance(tooltipDirective, true);
        });

        it('should not show if disabled', fakeAsync(() => {
            // Test that disabling the tooltip will not set the tooltip visible
            basicTestComponent.disabled = true;
            fixture.detectChanges();
            tooltipDirective.show(0);
            tick(0);
            expect(getTooltipVisible()).toBe(false);

            // Test to make sure setting disabled to false will show the tooltip
            // Sanity check to make sure everything was correct before (detectChanges, tick)
            basicTestComponent.disabled = false;
            fixture.detectChanges();
            tooltipDirective.show(0);
            tick(0);
            expect(getTooltipVisible()).toBe(true);
        }));

        it('should hide if disabled while tooltip is visible', fakeAsync(() => {
            // Display the tooltip with a timeout before hiding.
            tooltipDirective.show(0);
            fixture.detectChanges();
            tick(0);
            expect(getTooltipVisible()).toBe(true);

            // Set tooltip to be disabled and verify that the tooltip hides.
            basicTestComponent.disabled = true;
            fixture.detectChanges();
            tick(0);
            expect(getTooltipVisible()).toBe(false);
        }));

        it('should not show if hide is called before delay finishes', waitForAsync(() => {
            assertTooltipInstance(tooltipDirective, false);

            const tooltipDelay = 1000;

            tooltipDirective.show(tooltipDelay);
            expect(tooltipDirective['tooltipRef'].isTooltipVisible()).toBe(false);

            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain('');
            tooltipDirective.hide();

            fixture.whenStable().then(() => {
                expect(tooltipDirective['tooltipRef'].isTooltipVisible()).toBe(false);
            });
        }));

        // it('should be able to update the tooltip placement while open', fakeAsync(() => {
        //     tooltipDirective.placement = 'bottom';
        //     tooltipDirective.show();
        //     tick();
        //     assertTooltipInstance(tooltipDirective, true);
        //     tooltipDirective.placement = 'top';
        //     spyOn(tooltipDirective['overlayRef'], 'updatePosition').and.callThrough();
        //     fixture.detectChanges();
        //     tick();
        //     assertTooltipInstance(tooltipDirective, true);
        //     expect(tooltipDirective['overlayRef'].updatePosition).toHaveBeenCalled();
        // }));

        it('should be able to modify the tooltip content', fakeAsync(() => {
            assertTooltipInstance(tooltipDirective, false);
            tooltipDirective.show(0);
            tick(0); // Tick for the show delay (default is 0)
            expect(tooltipDirective['tooltipRef']['tooltipInstance'].visibility).toBe('visible');
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain(initialTooltipMessage);
            const newMessage = 'new tooltip message';
            tooltipDirective.content = newMessage;
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain(newMessage);
        }));

        it('should hide if origin has destroyed', fakeAsync(() => {
            // Display the tooltip with a timeout before hiding.
            tooltipDirective.show(0);
            fixture.detectChanges();
            tick(0);
            expect(getTooltipVisible()).toBe(true);
            expect(overlayContainerElement.textContent).toBeTruthy();

            // Set tooltip to be disabled and verify that the tooltip hides.
            basicTestComponent.tooltip.ngOnDestroy();
            fixture.detectChanges();
            tick(0);
            expect(getTooltipVisible()).toBe(false);
            expect(overlayContainerElement.textContent).toBeFalsy();
        }));
    });

    describe(`template usage`, () => {
        let fixture: ComponentFixture<ThyDemoTooltipTemplateComponent> | undefined = undefined;
        let basicTestComponent: ThyDemoTooltipTemplateComponent | undefined = undefined;
        // let tooltipDebugElement: DebugElement;
        let tooltipDirective: ThyTooltipDirective | undefined = undefined;
        let buttonDebugElement: DebugElement | undefined = undefined;
        let buttonElement: HTMLElement | undefined = undefined;

        function getTooltipVisible() {
            return tooltipDirective['tooltipRef'] ? tooltipDirective['tooltipRef']['isTooltipVisible']() : false;
        }

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoTooltipTemplateComponent);
            fixture.detectChanges();
            basicTestComponent = fixture.debugElement.componentInstance;

            buttonDebugElement = fixture.debugElement.query(By.css('button'));
            buttonElement = buttonDebugElement.nativeElement;

            tooltipDirective = buttonDebugElement.injector.get<ThyTooltipDirective>(ThyTooltipDirective);
        });

        it('should show and hide the tooltip', fakeAsync(() => {
            assertTooltipInstance(tooltipDirective, false);
            // fake mouseenter event
            dispatchMouseEvent(buttonElement, 'mouseenter');

            expect(getTooltipVisible()).toBe(false);
            // Tick for the show delay (default is 200)
            tick(200);
            expect(getTooltipVisible()).toBe(true);
            expect(overlayContainerElement.textContent).toEqual('');

            fixture.detectChanges();

            // wait till animation has finished
            tick(100);

            // Make sure tooltip is shown to the user and animation has finished
            const tooltipElement = overlayContainerElement.querySelector(`.${TOOLTIP_CLASS}`) as HTMLElement;
            expect(tooltipElement instanceof HTMLElement).toBe(true);
            expect(tooltipElement.style.transform).toBe('scale(1)');

            expect(overlayContainerElement.textContent).toContain(tooltipTemplateContext.text);

            const tooltipHideDelay = 100; // default hide delay is 100
            // fake mouseleave event
            dispatchMouseEvent(buttonElement, 'mouseleave');
            expect(getTooltipVisible()).toBe(true);

            tick(tooltipHideDelay);
            fixture.detectChanges();
            expect(getTooltipVisible()).toBe(false);
            assertTooltipInstance(tooltipDirective, true);

            // On animation complete, should expect that the tooltip has been detached.
            flushMicrotasks();
            assertTooltipInstance(tooltipDirective, false);
        }));

        it('should show without show delay', fakeAsync(() => {
            assertTooltipInstance(tooltipDirective, false);

            basicTestComponent.showDelay = 0;
            fixture.detectChanges();

            expect(getTooltipVisible()).toBe(false);
            // fake mouseenter event
            dispatchMouseEvent(buttonElement, 'mouseenter');
            tick(0);
            expect(getTooltipVisible()).toBe(true);
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain(tooltipTemplateContext.text);
        }));

        // for test more fast, show tooltip directly call tooltip directive's show
        // method without delay replace mock mouseenter event as belows
        // because the above cases have been test mouseenter and delay

        it('should be able to override the show and hide delays', fakeAsync(() => {
            basicTestComponent.showDelay = 477;
            basicTestComponent.hideDelay = 688;

            fixture.detectChanges();
            tooltipDirective.show();
            tick();

            expect(getTooltipVisible()).toBe(false);
            tick(477);
            expect(getTooltipVisible()).toBe(true);

            tooltipDirective.hide();
            fixture.detectChanges();
            tick();

            expect(getTooltipVisible()).toBe(true);
            tick(688);
            expect(getTooltipVisible()).toBe(false);
        }));

        // it('should be able to override the default placement', fakeAsync(() => {
        //     basicTestComponent.placement = 'left';
        //     fixture.detectChanges();

        //     expect(tooltipDirective.placement).toBe('left');
        //     tooltipDirective.show(0);
        //     tick(0);
        //     fixture.detectChanges();
        //     tick(200);

        //     expect(overlayContainerElement.textContent).toContain(tooltipTemplateContext.text);
        //     const tooltipElement = overlayContainerElement.querySelector(`.${TOOLTIP_CLASS}`) as HTMLElement;
        //     expect(tooltipElement.classList.contains('thy-tooltip-left')).toBe(true);
        // }));

        it('should not show if disabled', fakeAsync(() => {
            // Test that disabling the tooltip will not set the tooltip visible
            basicTestComponent.disabled = true;
            fixture.detectChanges();
            tooltipDirective.show(0);
            tick(0);
            expect(getTooltipVisible()).toBe(false);

            // Test to make sure setting disabled to false will show the tooltip
            // Sanity check to make sure everything was correct before (detectChanges, tick)
            basicTestComponent.disabled = false;
            fixture.detectChanges();
            tooltipDirective.show(0);
            tick(0);
            expect(getTooltipVisible()).toBe(true);
        }));

        it('should hide if disabled while tooltip is visible', fakeAsync(() => {
            // Display the tooltip with a timeout before hiding.
            tooltipDirective.show(0);
            fixture.detectChanges();
            tick(0);
            expect(getTooltipVisible()).toBe(true);

            // Set tooltip to be disabled and verify that the tooltip hides.
            basicTestComponent.disabled = true;
            fixture.detectChanges();
            tick(0);
            expect(getTooltipVisible()).toBe(false);
        }));

        it('should not show if hide is called before delay finishes', waitForAsync(() => {
            assertTooltipInstance(tooltipDirective, false);
        }));
    });

    describe(`usage with tooltip service`, () => {
        let fixture: ComponentFixture<ThyDemoTooltipBasicComponent> | undefined = undefined;
        let basicTestComponent: ThyDemoTooltipBasicComponent | undefined = undefined;
        let tooltipService: ThyTooltipService | undefined = undefined;
        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoTooltipBasicComponent);
            fixture.detectChanges();
            basicTestComponent = fixture.debugElement.componentInstance;
            tooltipService = TestBed.inject(ThyTooltipService);
        });

        it('should create tooltip and displayed', fakeAsync(() => {
            const tooltipRef: ThyTooltipRef = tooltipService.create(basicTestComponent.tooltipHostElement, {
                placement: 'top'
            });
            tooltipRef.show('Tooltip content', 1000);
            tick(500);
            fixture.detectChanges();
            expect(tooltipRef.isTooltipVisible()).toBe(false);
            tick(500);
            fixture.detectChanges();
            expect(tooltipRef.isTooltipVisible()).toBe(true);
            tooltipRef.hide(1000);
            tick(1000);
            fixture.detectChanges();
            expect(tooltipRef.isTooltipVisible()).toBe(false);
        }));

        it('should show tooltip with data', fakeAsync(() => {
            const tooltipRef: ThyTooltipRef = tooltipService.create(basicTestComponent.tooltipHostElement, {
                placement: 'top'
            });
            const data = { name: 'Mike' };
            tooltipRef.show('Tooltip content', data, 3000);
            tick(3000);
            fixture.detectChanges();
            expect(tooltipRef.isTooltipVisible()).toBe(true);
            expect(tooltipRef['tooltipInstance'].data).toEqual(data);
        }));
    });
});
