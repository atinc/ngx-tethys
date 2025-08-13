import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, waitForAsync, TestBed, flush, fakeAsync } from '@angular/core/testing';
import { ThySharedModule, ThyScrollDirective } from 'ngx-tethys/shared';
import { dispatchFakeEvent } from 'ngx-tethys/testing';

describe('thy-scroll', () => {
    let fixture: ComponentFixture<ThyScrollViewportComponent> | undefined = undefined;
    let testComponent: ThyScrollViewportComponent | undefined = undefined;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyScrollViewportComponent);
        testComponent = fixture.componentInstance;
    });

    describe('scroll listener', () => {
        it('thyOnScrolled should be called', fakeAsync(() => {
            const spy = testComponent.thyScrolled;
            fixture.detectChanges();

            const el = fixture.componentInstance.scrollContainer.nativeElement;
            dispatchFakeEvent(el, 'scroll');
            fixture.detectChanges();
            flush();

            expect(spy).toHaveBeenCalledTimes(1);
        }));

        it('thyOnScrolled should not be called when set the thyEnable value to false', fakeAsync(() => {
            const spy = testComponent.thyScrolled;
            testComponent.thyEnable = false;
            fixture.detectChanges();

            const el = fixture.componentInstance.scrollContainer.nativeElement;
            dispatchFakeEvent(el, 'scroll');

            fixture.detectChanges();
            flush();

            expect(spy).toHaveBeenCalledTimes(0);
        }));
    });
});

@Component({
    template: `
        <div #scrollContainer class="scroll-container" thyScroll (thyOnScrolled)="thyScrolled($event)" [thyEnable]="thyEnable">
            <div class="row">
                <div #firstRowStart class="cell"></div>
                <div #firstRowEnd class="cell"></div>
            </div>
            <div class="row">
                <div #lastRowStart class="cell"></div>
                <div #lastRowEnd class="cell"></div>
            </div>
        </div>
    `,
    styles: [
        `
            .scroll-container {
                width: 100px;
                height: 100px;
                overflow: auto;
            }

            .row {
                display: flex;
                flex-direction: row;
            }

            .cell {
                flex: none;
                width: 100px;
                height: 100px;
            }
        `
    ],
    imports: [ThySharedModule]
})
class ThyScrollViewportComponent implements OnInit {
    @ViewChild(ThyScrollDirective, { read: false }) thyScrollDirective: ThyScrollDirective;
    @ViewChild('scrollContainer', { read: false }) scrollContainer: ElementRef<Element>;
    @ViewChild('firstRowStart', { read: false }) firstRowStart: ElementRef<Element>;
    @ViewChild('firstRowEnd', { read: false }) firstRowEnd: ElementRef<Element>;
    @ViewChild('lastRowStart', { read: false }) lastRowStart: ElementRef<Element>;
    @ViewChild('lastRowEnd', { read: false }) lastRowEnd: ElementRef<Element>;
    thyScrolled = jasmine.createSpy('thyScrolled callback');
    thyEnable = true;

    ngOnInit() {}
}
