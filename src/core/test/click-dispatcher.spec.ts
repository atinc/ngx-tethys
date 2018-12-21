import {
    inject,
    TestBed,
    async,
    fakeAsync,
    ComponentFixture,
    tick,
    flushMicrotasks,
    flush
} from '@angular/core/testing';
import {
    NgModule,
    Component,
    ViewChild,
    ElementRef,
    OnDestroy
} from '@angular/core';
import { ThyClickDispatcher } from '../event-dispatchers/click-dispatcher';
import { Subscription, Observable } from 'rxjs';
import { dispatchFakeEvent } from '../testing';

describe('ClickDispatcher', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ClickDispatcherTestModule]
        });

        TestBed.compileComponents();
    }));

    describe('basic usage', () => {
        let click: ThyClickDispatcher;
        let fixture: ComponentFixture<ClickComponent>;

        beforeEach(inject([ThyClickDispatcher], (s: ThyClickDispatcher) => {
            click = s;

            fixture = TestBed.createComponent(ClickComponent);
            fixture.detectChanges();
        }));

        it('should notify through the component and service that a click event occurred', fakeAsync(() => {
            // Listen for notifications from scroll directive
            const clicked$ = fixture.componentInstance.clicked$;
            const componentSpy = jasmine.createSpy('component click document callback');
            clicked$.subscribe(componentSpy);

            // Listen for notifications from click service with a throttle of 100ms
            const throttleTime = 100;
            const serviceSpy = jasmine.createSpy('service click document callback');
            click.clicked(throttleTime).subscribe(serviceSpy);
            dispatchFakeEvent(document, 'click', false);

            // The click directive should have notified the service immediately.
            expect(componentSpy).toHaveBeenCalled();

            // Verify that the throttle is used, the service should wait for the throttle time until
            // sending the notification.
            expect(serviceSpy).not.toHaveBeenCalled();

            // After the throttle time, the notification should be sent.
            tick(throttleTime);
            expect(serviceSpy).toHaveBeenCalled();
        }));

        it('should not execute the global events in the Angular zone', () => {
            click.clicked(0).subscribe(() => {});
            dispatchFakeEvent(document, 'click', false);

            expect(fixture.ngZone.isStable).toBe(true);
        });

        it('should be able to unsubscribe from the global click', () => {
            const spy = jasmine.createSpy('global click callback');
            const subscription = click.clicked(0).subscribe(spy);

            dispatchFakeEvent(document, 'click', false);
            expect(spy).toHaveBeenCalledTimes(1);

            subscription.unsubscribe();
            dispatchFakeEvent(document, 'click', false);

            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should complete the `clicked` stream on destroy', () => {
            const completeSpy = jasmine.createSpy('complete spy');
            const subscription = click
                .clicked(0)
                .subscribe(undefined, undefined, completeSpy);

            click.ngOnDestroy();

            expect(completeSpy).toHaveBeenCalled();

            subscription.unsubscribe();
        });

        it('should complete the click stream when it is destroyed', fakeAsync(() => {
            const clicked$ = fixture.componentInstance.clicked$;
            const spy = jasmine.createSpy('complete spy');
            const subscription = clicked$.subscribe(undefined, undefined, spy);

            fixture.componentInstance.clickDispatcher.ngOnDestroy();
            fixture.destroy();
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        }));
    });

    describe('lazy subscription', () => {
        let click: ThyClickDispatcher;

        beforeEach(inject([ThyClickDispatcher], (s: ThyClickDispatcher) => {
            click = s;
        }));

        it('should lazily add global listeners as service subscriptions are added and removed', () => {
            expect(click.globalSubscription).toBeNull(
                'Expected no global listeners on init.'
            );

            const subscription = click.clicked(0).subscribe(() => {});

            expect(click.globalSubscription).toBeTruthy(
                'Expected global listeners after a subscription has been added.'
            );

            subscription.unsubscribe();

            expect(click.globalSubscription).toBeNull(
                'Expected global listeners to have been removed after the subscription has stopped.'
            );
        });

        it('should remove the global subscription on destroy', () => {
            expect(click.globalSubscription).toBeNull(
                'Expected no global listeners on init.'
            );

            const subscription = click.clicked(0).subscribe(() => {});

            expect(click.globalSubscription).toBeTruthy(
                'Expected global listeners after a subscription has been added.'
            );

            click.ngOnDestroy();

            expect(click.globalSubscription).toBeNull(
                'Expected global listeners to have been removed after the subscription has stopped.'
            );

            subscription.unsubscribe();
        });
    });
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
    clicked$: Observable<Event>;
    constructor(public clickDispatcher: ThyClickDispatcher) {
        this.clicked$ = clickDispatcher.clicked(0);
        this.subscription = this.clicked$.subscribe(event => {
            this.clicked++;
        });
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
