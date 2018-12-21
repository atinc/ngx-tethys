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
import { ThyClickPositioner } from '../click-positioner';
import { Subscription, Observable } from 'rxjs';
import { dispatchFakeEvent, dispatchMouseEvent } from '../testing';

describe('ClickDispatcher', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ClickPositionerTestModule]
        });

        TestBed.compileComponents();
    }));

    let clickPositioner: ThyClickPositioner;
    let fixture: ComponentFixture<ClickPositionerComponent>;

    beforeEach(inject(
        [ThyClickPositioner],
        (_clickPositioner: ThyClickPositioner) => {
            clickPositioner = _clickPositioner;

            fixture = TestBed.createComponent(ClickPositionerComponent);
            fixture.detectChanges();
        }
    ));

    it('should not execute the global events in the Angular zone', () => {
        expect(clickPositioner.lastClickPosition).toBeNull();
        dispatchFakeEvent(document, 'click', false);

        expect(fixture.ngZone.isStable).toBe(true);
    });

    it('should has value for lastClickPosition from the global click', () => {
        expect(clickPositioner.lastClickPosition).toBeNull();
        dispatchMouseEvent(document, 'click', 100, 200);
        expect(clickPositioner.lastClickPosition).toEqual({
            x: 100,
            y: 200
        });
    });

    it('should execute runTaskUseLastPosition expected right position from the global click ', fakeAsync(() => {
        dispatchMouseEvent(document, 'click', 100, 200);
        expect(clickPositioner.lastClickPosition).toBeTruthy();

        const completeSpy = jasmine.createSpy('complete spy');
        clickPositioner.runTaskUseLastPosition(position => {
            expect(position).toEqual({
                x: 100,
                y: 200
            });
            completeSpy.call(position);
        });
        flush();
        expect(completeSpy).toHaveBeenCalled();
    }));
});

/** Simple component that contains a large div and can be scrolled. */
@Component({
    template: `
        <div></div>
    `
})
class ClickPositionerComponent implements OnDestroy {
    clicked = 0;
    subscription: Subscription;
    clicked$: Observable<Event>;
    constructor(public clickPositioner: ThyClickPositioner) {
        clickPositioner.initialize();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
}

const TEST_COMPONENTS = [ClickPositionerComponent];
@NgModule({
    imports: [],
    providers: [ClickPositionerComponent],
    exports: TEST_COMPONENTS,
    declarations: TEST_COMPONENTS,
    entryComponents: TEST_COMPONENTS
})
class ClickPositionerTestModule {}
