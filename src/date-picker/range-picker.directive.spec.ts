import { endOfDay, startOfDay } from 'date-fns';
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
import { ThyPropertyOperationComponent, ThyPropertyOperationModule } from 'ngx-tethys/property-operation';
import { ThyDateRangeEntry, ThyShortcutPosition, ThyShortcutPreset, ThyShortcutRange } from './standard-types';

registerLocaleData(zh);

describe('ThyRangePickerDirective', () => {
    let fixture: ComponentFixture<ThyTestRangePickerComponent>;
    let fixtureInstance: ThyTestRangePickerComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let popover: ThyPopover;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThyDatePickerModule, ThyPropertyOperationModule, BrowserAnimationsModule],
            providers: [],
            declarations: [ThyTestRangePickerComponent]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestRangePickerComponent);
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

        it('should support thyShowShortcut', fakeAsync(() => {
            fixtureInstance.thyShowShortcut = true;
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerWrapper());
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-picker-shortcut')).toBeTruthy();
        }));

        it('should support thyShortcutPosition', fakeAsync(() => {
            fixtureInstance.thyShowShortcut = true;
            fixtureInstance.thyShortcutPosition = 'bottom';
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerWrapper());
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-picker-shortcut-bottom')).toBeTruthy();
        }));

        it('should support more thyShortcutPresets', fakeAsync(() => {
            fixtureInstance.thyShowShortcut = true;
            fixtureInstance.thyShortcutPresets = [
                {
                    title: '回家那几天',
                    value: [new Date('2022-01-29').getTime(), new Date('2022-02-8').getTime()]
                }
            ];
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerWrapper());
            fixture.detectChanges();
            const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
            expect((shortcutItems[shortcutItems.length - 1] as HTMLElement).innerText).toBe('回家那几天');
        }));

        it('should support more thyShortcutRanges', fakeAsync(() => {
            fixtureInstance.thyShowShortcut = true;
            fixtureInstance.thyShortcutRanges = [
                {
                    title: '回家那几天',
                    begin: new Date('2022-01-29').getTime(),
                    end: new Date('2022-02-8').getTime()
                }
            ];
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerWrapper());
            fixture.detectChanges();
            const shortcutItems = overlayContainerElement.querySelectorAll('.thy-calendar-picker-shortcut-item');
            expect((shortcutItems[shortcutItems.length - 1] as HTMLElement).innerText).toBe('回家那几天');
        }));

        it('should support week mode', fakeAsync(() => {
            fixtureInstance.mode = 'week';
            fixture.detectChanges();
            dispatchClickEvent(getPickerTriggerWrapper());
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-week-number')).toBeTruthy();
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
            [(ngModel)]="modelValue"
            [thyShowShortcut]="thyShowShortcut"
            [thyShortcutPosition]="thyShortcutPosition"
            [thyShortcutPresets]="thyShortcutPresets"
            [thyShortcutRanges]="thyShortcutRanges"
            [thyMode]="mode"
            (thyOnCalendarChange)="thyOnCalendarChange($event)"
            (thyOpenChange)="thyOpenChange($event)"></thy-property-operation>
    `
})
class ThyTestRangePickerComponent {
    modelValue: ThyDateRangeEntry;
    thyShowShortcut: boolean;
    thyShortcutPosition: ThyShortcutPosition = 'left';
    thyShortcutPresets: ThyShortcutPreset[];
    thyShortcutRanges: ThyShortcutRange[];
    mode: string;
    thyOpenChange(): void {}
    thyOnCalendarChange(): void {}
}
