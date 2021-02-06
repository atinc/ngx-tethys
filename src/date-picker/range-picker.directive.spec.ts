import { endOfDay, startOfDay } from 'date-fns';
import { ThyPropertyOperationComponent, ThyPropertyOperationModule } from 'ngx-tethys';
import { dispatchMouseEvent } from 'ngx-tethys/testing';

import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ThyPopover } from '../popover/popover.service';
import { ThyDatePickerModule } from './date-picker.module';

registerLocaleData(zh);

describe('ThyRangePickerDirective', () => {
    let fixture: ComponentFixture<ThyTestRangePickerDirective>;
    let fixtureInstance: ThyTestRangePickerDirective;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let popover: ThyPopover;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThyDatePickerModule, ThyPropertyOperationModule, BrowserAnimationsModule],
            providers: [],
            declarations: [ThyTestRangePickerDirective]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestRangePickerDirective);
        fixtureInstance = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    beforeEach(inject([OverlayContainer, ThyPopover], (oc: OverlayContainer, _popover: ThyPopover) => {
        overlayContainer = oc;
        popover = _popover;
        overlayContainerElement = oc.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('thyRangePickerDirective testing', () => {
        it('should support thyOpenChange', fakeAsync(() => {
            const thyOpenChange = spyOn(fixtureInstance, 'thyOpenChange');
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerWrapper());

            expect(thyOpenChange).toHaveBeenCalledWith(true);

            dispatchClickEvent(queryFromOverlay('.cdk-overlay-backdrop'));

            expect(thyOpenChange).toHaveBeenCalledWith(false);
            expect(thyOpenChange).toHaveBeenCalledTimes(2);
        }));

        it('should support calendarChange', fakeAsync(() => {
            const thyOnCalendarChange = spyOn(fixtureInstance, 'thyOnCalendarChange');
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerWrapper());

            const left = getFirstCell('left');
            const leftText = left.textContent.trim();
            dispatchClickEvent(left);

            expect(thyOnCalendarChange).toHaveBeenCalled();
            let result = (thyOnCalendarChange.calls.allArgs()[0] as Date[][])[0];
            expect((result[0] as Date).getDate()).toBe(+leftText);

            const right = getFirstCell('right');
            const rightText = right.textContent.trim();
            dispatchClickEvent(right);

            expect(thyOnCalendarChange).toHaveBeenCalled();
            result = (thyOnCalendarChange.calls.allArgs()[1] as Date[][])[0];
            expect((result[0] as Date).getDate()).toBe(+leftText);
            expect((result[1] as Date).getDate()).toBe(+rightText);
        }));

        it('should first date is startOfDay,last date is endOfDay', fakeAsync(() => {
            const thyOnCalendarChange = spyOn(fixtureInstance, 'thyOnCalendarChange');
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerWrapper());

            const left = getFirstCell('left');
            dispatchClickEvent(left);

            expect(thyOnCalendarChange).toHaveBeenCalled();
            let result = (thyOnCalendarChange.calls.allArgs()[0] as Date[][])[0];
            expect(result[0]).toEqual(startOfDay(result[0]));

            const right = getFirstCell('right');
            dispatchClickEvent(right);

            expect(thyOnCalendarChange).toHaveBeenCalled();
            result = (thyOnCalendarChange.calls.allArgs()[1] as Date[][])[0];
            expect(result[1]).toEqual(endOfDay(result[1]));
        }));

        function queryFromOverlay(selector: string): HTMLElement {
            return overlayContainerElement.querySelector(selector) as HTMLElement;
        }

        function getFirstCell(partial: 'left' | 'right'): HTMLElement {
            return queryFromOverlay(`.thy-calendar-range-${partial} tbody.thy-calendar-tbody td.thy-calendar-cell`) as HTMLElement;
        }

        function getPickerTriggerWrapper(): HTMLInputElement {
            return debugElement.query(By.directive(ThyPropertyOperationComponent)).nativeElement;
        }

        function dispatchClickEvent(selector: HTMLElement | HTMLInputElement): void {
            dispatchMouseEvent(selector, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
        }
    });
});

@Component({
    template: `
        <thy-property-operation
            thyLabelText="开始时间"
            thyRangePicker
            (thyOnCalendarChange)="thyOnCalendarChange($event)"
            (thyOpenChange)="thyOpenChange($event)"
        ></thy-property-operation>
    `
})
class ThyTestRangePickerDirective {
    thyOpenChange(): void {}
    thyOnCalendarChange(): void {}
}
