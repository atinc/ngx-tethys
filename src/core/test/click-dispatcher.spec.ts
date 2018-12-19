import {
    inject,
    TestBed,
    async,
    fakeAsync,
    ComponentFixture,
    tick
} from '@angular/core/testing';
import {
    NgModule,
    Component,
    ViewChild,
    ElementRef,
    OnDestroy
} from '@angular/core';
import { ClickDispatcher } from '../click-dispatcher';
import { Subscription } from 'rxjs';
import { dispatchFakeEvent } from '../testing';

describe('ClickDispatcher', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ClickDispatcherTestModule]
        });

        TestBed.compileComponents();
    }));

    describe('Basic usage', () => {
        let click: ClickDispatcher;
        let fixture: ComponentFixture<ClickComponent>;

        beforeEach(inject([ClickDispatcher], (s: ClickDispatcher) => {
            click = s;

            fixture = TestBed.createComponent(ClickComponent);
            fixture.detectChanges();
        }));


        // it('should notify through the directive and service that a scroll event occurred', fakeAsync(() => {
        //     // Listen for notifications from scroll directive
        //     const scrollable = fixture.componentInstance.scrollable;
        //     const directiveSpy = jasmine.createSpy('directive scroll callback');
        //     scrollable.elementScrolled().subscribe(directiveSpy);

        //     // Listen for notifications from scroll service with a throttle of 100ms
        //     const throttleTime = 100;
        //     const serviceSpy = jasmine.createSpy('service scroll callback');
        //     scroll.scrolled(throttleTime).subscribe(serviceSpy);

        //     // Emit a scroll event from the scrolling element in our component.
        //     // This event should be picked up by the scrollable directive and notify.
        //     // The notification should be picked up by the service.
        //     dispatchFakeEvent(
        //         fixture.componentInstance.scrollingElement.nativeElement,
        //         'scroll',
        //         false
        //     );

        //     // The scrollable directive should have notified the service immediately.
        //     expect(directiveSpy).toHaveBeenCalled();

        //     // Verify that the throttle is used, the service should wait for the throttle time until
        //     // sending the notification.
        //     expect(serviceSpy).not.toHaveBeenCalled();

        //     // After the throttle time, the notification should be sent.
        //     tick(throttleTime);
        //     expect(serviceSpy).toHaveBeenCalled();
        // }));

        // it('should not execute the global events in the Angular zone', () => {
        //     click.clicked(0).subscribe(() => {});
        //     dispatchFakeEvent(document, 'click', false);

        //     expect(fixture.ngZone.isStable).toBe(true);
        // });

        // it('should be able to unsubscribe from the global click', () => {
        //     const spy = jasmine.createSpy('global click callback');
        //     const subscription = click.clicked(0).subscribe(spy);

        //     dispatchFakeEvent(document, 'click', false);
        //     expect(spy).toHaveBeenCalledTimes(1);

        //     subscription.unsubscribe();
        //     dispatchFakeEvent(document, 'click', false);

        //     expect(spy).toHaveBeenCalledTimes(2);
        // });

        it('should complete the `clicked` stream on destroy', () => {
            const completeSpy = jasmine.createSpy('complete spy');
            const subscription = click
                .clicked(0)
                .subscribe(undefined, undefined, completeSpy);

            click.ngOnDestroy();

            expect(completeSpy).toHaveBeenCalled();

            subscription.unsubscribe();
        });

        // it('should complete the scrollable stream when it is destroyed', () => {
        //     const scrollable = fixture.componentInstance.scrollable;
        //     const spy = jasmine.createSpy('complete spy');
        //     const subscription = scrollable
        //         .elementScrolled()
        //         .subscribe(undefined, undefined, spy);

        //     fixture.destroy();
        //     expect(spy).toHaveBeenCalled();
        //     subscription.unsubscribe();
        // });

        // it('should not register the same scrollable twice', () => {
        //     const scrollable = fixture.componentInstance.scrollable;
        //     const scrollSpy = jasmine.createSpy('scroll spy');
        //     const scrollSubscription = scroll.scrolled(0).subscribe(scrollSpy);

        //     expect(scroll.scrollContainers.has(scrollable)).toBe(true);

        //     scroll.register(scrollable);
        //     scroll.deregister(scrollable);

        //     dispatchFakeEvent(
        //         fixture.componentInstance.scrollingElement.nativeElement,
        //         'scroll'
        //     );
        //     fixture.detectChanges();

        //     expect(scrollSpy).not.toHaveBeenCalled();
        //     scrollSubscription.unsubscribe();
        // });
    });

    // describe('lazy subscription', () => {
    //     let scroll: ScrollDispatcher;

    //     beforeEach(inject([ScrollDispatcher], (s: ScrollDispatcher) => {
    //         scroll = s;
    //     }));

    //     it('should lazily add global listeners as service subscriptions are added and removed', () => {
    //         expect(scroll._globalSubscription).toBeNull(
    //             'Expected no global listeners on init.'
    //         );

    //         const subscription = scroll.scrolled(0).subscribe(() => {});

    //         expect(scroll._globalSubscription).toBeTruthy(
    //             'Expected global listeners after a subscription has been added.'
    //         );

    //         subscription.unsubscribe();

    //         expect(scroll._globalSubscription).toBeNull(
    //             'Expected global listeners to have been removed after the subscription has stopped.'
    //         );
    //     });

    //     it('should remove global listeners on unsubscribe, despite any other live scrollables', () => {
    //         const fixture = TestBed.createComponent(NestedScrollingComponent);
    //         fixture.detectChanges();

    //         expect(scroll._globalSubscription).toBeNull(
    //             'Expected no global listeners on init.'
    //         );
    //         expect(scroll.scrollContainers.size).toBe(
    //             4,
    //             'Expected multiple scrollables'
    //         );

    //         const subscription = scroll.scrolled(0).subscribe(() => {});

    //         expect(scroll._globalSubscription).toBeTruthy(
    //             'Expected global listeners after a subscription has been added.'
    //         );

    //         subscription.unsubscribe();

    //         expect(scroll._globalSubscription).toBeNull(
    //             'Expected global listeners to have been removed after the subscription has stopped.'
    //         );
    //         expect(scroll.scrollContainers.size).toBe(
    //             4,
    //             'Expected scrollable count to stay the same'
    //         );
    //     });

    //     it('should remove the global subscription on destroy', () => {
    //         expect(scroll._globalSubscription).toBeNull(
    //             'Expected no global listeners on init.'
    //         );

    //         const subscription = scroll.scrolled(0).subscribe(() => {});

    //         expect(scroll._globalSubscription).toBeTruthy(
    //             'Expected global listeners after a subscription has been added.'
    //         );

    //         scroll.ngOnDestroy();

    //         expect(scroll._globalSubscription).toBeNull(
    //             'Expected global listeners to have been removed after the subscription has stopped.'
    //         );

    //         subscription.unsubscribe();
    //     });
    // });
});

/** Simple component that contains a large div and can be scrolled. */
@Component({
    template: `
        <div></div>
    `
})
class ClickComponent implements OnDestroy {
    clicked = 0;
    subscription: Subscription;
    constructor(clickDispatcher: ClickDispatcher) {
        // this.subscription = clickDispatcher.clicked().subscribe(event => {
        //     this.clicked++;
        // });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
}

const TEST_COMPONENTS = [ClickComponent];
@NgModule({
    imports: [],
    providers: [ClickComponent],
    exports: TEST_COMPONENTS,
    declarations: TEST_COMPONENTS,
    entryComponents: TEST_COMPONENTS
})
class ClickDispatcherTestModule {}
