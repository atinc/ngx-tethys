import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyDatePickerModule } from './date-picker.module';
import { dispatchMouseEvent, typeInElement } from '../core/testing';
import { isSameDay, fromUnixTime } from 'date-fns';
import { RangeEntry } from './standard-types';

registerLocaleData(zh);

describe('ThyRangePickerComponent', () => {
    let fixture: ComponentFixture<ThyTestRangePickerComponent>;
    let fixtureInstance: ThyTestRangePickerComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThyDatePickerModule],
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

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('general api testing', () => {
        beforeEach(() => (fixtureInstance.useSuite = 1));

        it('should open by click and close by click at outside', fakeAsync(() => {
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).not.toBeNull();

            dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).toBeNull();
        }));

        it('should focus on the trigger after a click outside', fakeAsync(() => {
            fixture.detectChanges();
            openPickerByClickTrigger();

            dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerTrigger().matches(':focus-within')).toBeTruthy();
        }));

        it('should support thyAllowClear and work properly', fakeAsync(() => {
            const clearBtnSelector = By.css('thy-picker .thy-calendar-picker-clear .thy-icon');
            const initial = (fixtureInstance.modelValue = { begin: new Date(), end: new Date() });
            fixtureInstance.thyAllowClear = false;
            fixture.detectChanges();
            expect(debugElement.query(clearBtnSelector)).toBeNull();

            fixtureInstance.thyAllowClear = true;
            tick();
            fixture.detectChanges();
            expect(fixtureInstance.modelValue).toBe(initial);
            expect(debugElement.query(clearBtnSelector)).toBeDefined();

            const thyOnChange = spyOn(fixtureInstance, 'modelValueChange');
            debugElement.query(clearBtnSelector).nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.modelValue.begin).toBe(null);
            expect(fixtureInstance.modelValue.end).toBe(null);
            expect(thyOnChange).toHaveBeenCalledWith({ begin: null, end: null });
            expect(debugElement.query(clearBtnSelector)).toBeFalsy();
        }));

        it('should support thyDisabled', fakeAsync(() => {
            // Make sure picker clear button shown up
            fixtureInstance.thyAllowClear = true;
            fixtureInstance.modelValue = { begin: new Date(), end: new Date() };

            fixtureInstance.thyDisabled = true;
            fixture.detectChanges();
            expect(debugElement.query(By.css('thy-picker .thy-input-disabled'))).toBeDefined();
            expect(debugElement.query(By.css('thy-picker i.thy-calendar-picker-clear'))).toBeNull();

            fixtureInstance.thyDisabled = false;
            tick();
            fixture.detectChanges();
            expect(debugElement.query(By.css('thy-picker .thy-input-disabled'))).toBeNull();
            expect(debugElement.query(By.css('thy-picker i.thy-calendar-picker-clear'))).toBeDefined();
        }));

        it('should support thyOpen if assigned', fakeAsync(() => {
            fixtureInstance.useSuite = 2;

            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).toBeNull();

            fixtureInstance.thyOpen = true;
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).not.toBeNull();
            expect(queryFromOverlay('.cdk-overlay-backdrop')).toBeNull();

            fixtureInstance.thyOpen = false;
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).toBeNull();
        }));

        it('should support thyDisabledDate', fakeAsync(() => {
            fixture.detectChanges();
            const compareDate = new Date('2018-11-15 00:00:00');
            fixtureInstance.modelValue = {
                begin: new Date('2018-11-11 12:12:12'),
                end: new Date('2018-12-12 12:12:12')
            };
            fixtureInstance.thyDisabledDate = (current: Date) => isSameDay(current, compareDate);
            fixture.detectChanges();

            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            const disabledCell = queryFromOverlay('.thy-calendar-range-left tbody.thy-calendar-tbody td.thy-calendar-disabled-cell');
            expect(disabledCell.textContent.trim()).toBe('15');
        }));

        it('should support thyPlaceHolder', () => {
            const featureKey = 'RIGHT_PLACEHOLDER';
            fixtureInstance.thyPlaceHolder = ['Start', featureKey];
            fixture.detectChanges();
            expect(getPickerTrigger().getAttribute('placeholder')).toBe('Start ~ RIGHT_PLACEHOLDER');
        });

        it('should support thySize', () => {
            fixture.detectChanges();
            expect(getPickerTrigger().classList.contains('form-control-lg')).not.toBeTruthy();
            fixtureInstance.thySize = 'lg';
            fixture.detectChanges();
            expect(getPickerTrigger().classList.contains('form-control-lg')).toBeTruthy();
        });

        it('should support thySuffixIcon', () => {
            fixture.detectChanges();
            expect(getPickerTriggerWrapper().querySelector('.thy-icon-angry')).toBeNull();
            fixtureInstance.thySuffixIcon = 'angry';
            fixture.detectChanges();
            expect(getPickerTriggerWrapper().querySelector('.thy-icon-angry')).toBeTruthy();
        });

        it('should support thyOpenChange', fakeAsync(() => {
            const thyOpenChange = spyOn(fixtureInstance, 'thyOpenChange');
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOpenChange).toHaveBeenCalledWith(true);

            dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOpenChange).toHaveBeenCalledWith(false);
            expect(thyOpenChange).toHaveBeenCalledTimes(2);
        }));

        it('should support thyValue', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2018-11-11'), end: new Date('2018-12-11') };
            fixture.detectChanges();
            openPickerByClickTrigger();
            expect(getFirstSelectedDayCell().textContent.trim()).toBe('11');
        }));

        it('should support thyOnCalendarChange', fakeAsync(() => {
            const thyOnCalendarChange = spyOn(fixtureInstance, 'thyOnCalendarChange');
            fixture.detectChanges();
            openPickerByClickTrigger();
            const left = getFirstCell('left');
            const leftText = left.textContent.trim();
            dispatchMouseEvent(left, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnCalendarChange).toHaveBeenCalled();
            let result = (thyOnCalendarChange.calls.allArgs()[0] as Date[][])[0];
            expect((result[0] as Date).getDate()).toBe(+leftText);
            const right = getFirstCell('right');
            const rightText = right.textContent.trim();
            dispatchMouseEvent(right, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnCalendarChange).toHaveBeenCalled();
            result = (thyOnCalendarChange.calls.allArgs()[1] as Date[][])[0];
            expect((result[0] as Date).getDate()).toBe(+leftText);
            expect((result[1] as Date).getDate()).toBe(+rightText);
        }));

        it('should support thyOnChange', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2018-11-11'), end: new Date('2018-11-11') };
            const thyOnChange = spyOn(fixtureInstance, 'modelValueChange');
            fixture.detectChanges();
            openPickerByClickTrigger();

            const left = getFirstCell('left'); // Use the first cell
            const leftText = left.textContent.trim();
            dispatchMouseEvent(left, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const right = getFirstCell('right'); // NOTE: At the time "left" clicked, the date panel will be re-rendered
            const rightText = right.textContent.trim();
            dispatchMouseEvent(right, 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(thyOnChange).toHaveBeenCalled();
            const result = (thyOnChange.calls.allArgs()[0] as RangeEntry[])[0];
            expect(fromUnixTime(result.begin as number).getDate()).toBe(+leftText);
            expect(fromUnixTime(result.end as number).getDate()).toBe(+rightText);
        }));
    }); // /general api testing

    describe('panel switch and move forward/afterward', () => {
        beforeEach(() => (fixtureInstance.useSuite = 1));

        it('should support date panel changes', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2018-6-11'), end: new Date('2018-12-12') };
            fixture.detectChanges();
            openPickerByClickTrigger();
            // Click previous year button
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-range-left .thy-calendar-prev-year-btn'), 'click');
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-range-left .thy-calendar-year-select').textContent.indexOf('2017') > -1).toBeTruthy();
            // Click next year button * 2
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-range-left .thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-range-left .thy-calendar-next-year-btn'), 'click');
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-range-left .thy-calendar-year-select').textContent.indexOf('2019') > -1).toBeTruthy();
            // Click previous month button
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-range-left .thy-calendar-prev-month-btn'), 'click');
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-range-left .thy-calendar-month-select').textContent.indexOf('5') > -1).toBeTruthy();
            // Click next month button * 2
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-range-left .thy-calendar-next-month-btn'), 'click');
            fixture.detectChanges();
            dispatchMouseEvent(queryFromOverlay('.thy-calendar-range-left .thy-calendar-next-month-btn'), 'click');
            fixture.detectChanges();
            expect(queryFromOverlay('.thy-calendar-range-left .thy-calendar-month-select').textContent.indexOf('7') > -1).toBeTruthy();
        }));
    }); // /panel switch and move forward/afterward

    describe('specified date picker testing', () => {
        beforeEach(() => (fixtureInstance.useSuite = 1));

        it('should not change value when click ESC', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2018-09-11'), end: new Date('2020-09-12') };
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            openPickerByClickTrigger();

            dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            tick(500);
            expect(getRangePickerInput().value).toBe('2018-09-11 ~ 2020-09-12');
        }));
    }); // /specified date picker testing

    describe('ngModel value accesors', () => {
        beforeEach(() => (fixtureInstance.useSuite = 3));

        it('should specified date provide by "modelValue" be choose', fakeAsync(() => {
            fixtureInstance.modelValue = { begin: new Date('2018-11-11'), end: new Date('2018-12-12') };
            fixture.detectChanges();
            tick(); // Wait writeValue() tobe done
            fixture.detectChanges();
            expect(getFirstSelectedDayCell().textContent.trim()).toBe('11');

            // Click the first cell to change ngModel
            const left = getFirstCell('left');
            const leftText = left.textContent.trim();
            dispatchMouseEvent(left, 'click');
            fixture.detectChanges();
            const right = getFirstCell('right');
            const rightText = right.textContent.trim();
            dispatchMouseEvent(right, 'click');
            fixture.detectChanges();
            expect(fromUnixTime(fixtureInstance.modelValue.begin as number).getDate()).toBe(+leftText);
            expect(fromUnixTime(fixtureInstance.modelValue.end as number).getDate()).toBe(+rightText);
        }));
    });

    ////////////

    function getPickerTrigger(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker .thy-calendar-picker-input')).nativeElement as HTMLInputElement;
    }

    function getRangePickerInput(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker .thy-calendar-picker-input')).nativeElement as HTMLInputElement;
    }

    function getPickerTriggerWrapper(): HTMLInputElement {
        return debugElement.query(By.css('thy-picker .thy-calendar-picker')).nativeElement as HTMLInputElement;
    }

    function getPickerContainer(): HTMLElement {
        return queryFromOverlay('.thy-calendar-picker-container') as HTMLElement;
    }

    function getFirstSelectedDayCell(): HTMLElement {
        return queryFromOverlay('.thy-calendar-range-left tbody.thy-calendar-tbody td.thy-calendar-selected-day') as HTMLElement;
    }

    function getFirstCell(partial: 'left' | 'right'): HTMLElement {
        return queryFromOverlay(`.thy-calendar-range-${partial} tbody.thy-calendar-tbody td.thy-calendar-cell`) as HTMLElement;
    }

    function queryFromOverlay(selector: string): HTMLElement {
        return overlayContainerElement.querySelector(selector) as HTMLElement;
    }

    function openPickerByClickTrigger(): void {
        dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
        fixture.detectChanges();
        tick(500);
        fixture.detectChanges();
    }
});

@Component({
    template: `
        <ng-container [ngSwitch]="useSuite">
            <!-- Suite 1 -->
            <thy-range-picker
                *ngSwitchCase="1"
                [thyAllowClear]="thyAllowClear"
                [thyDisabled]="thyDisabled"
                [thyDisabledDate]="thyDisabledDate"
                [thyPlaceHolder]="thyPlaceHolder"
                [thyPanelClassName]="thyPanelClassName"
                [thySize]="thySize"
                [thySuffixIcon]="thySuffixIcon"
                (thyOpenChange)="thyOpenChange($event)"
                [(ngModel)]="modelValue"
                (ngModelChange)="modelValueChange($event)"
                (thyOnPanelChange)="thyOnPanelChange($event)"
                (thyOnCalendarChange)="thyOnCalendarChange($event)"
            ></thy-range-picker>
            <ng-template #tplDateRender let-current>
                <div [class.test-first-day]="current.getDate() === 1">{{ current.getDate() }}</div>
            </ng-template>

            <!-- Suite 2 -->
            <!-- use another picker to avoid thyOpen's side-effects because thyOpen act as "true" if used -->
            <thy-range-picker *ngSwitchCase="2" [thyOpen]="thyOpen"></thy-range-picker>

            <!-- Suite 3 -->
            <thy-range-picker *ngSwitchCase="3" thyOpen [(ngModel)]="modelValue"></thy-range-picker>
        </ng-container>
    `
})
class ThyTestRangePickerComponent {
    useSuite: 1 | 2 | 3;
    @ViewChild('tplDateRender') tplDateRender: TemplateRef<Date>;
    @ViewChild('tplExtraFooter') tplExtraFooter: TemplateRef<void>;

    thyAllowClear: boolean;
    thyDisabled: boolean;
    thyDisabledDate: (d: Date) => boolean;
    thyPlaceHolder: string[];
    thyPanelClassName: string;
    thySize: string;
    thySuffixIcon: string;
    modelValue: RangeEntry;
    thyOpen: boolean;
    thyOpenChange(): void {}
    modelValueChange(): void {}
    thyOnPanelChange(): void {}
    thyOnCalendarChange(): void {}
    thyOnOk(): void {}
}
