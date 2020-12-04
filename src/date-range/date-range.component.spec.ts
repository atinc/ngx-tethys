import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { DateRangeItemInfo } from './date-range.class';
import { formatDate } from '../util';
import { DateHelperByDatePipe } from '../date-picker/date-helper.service';
import { ThyDateRangeModule } from './module';
import { getUnixTime, startOfQuarter, endOfQuarter, setMonth, getMonth, startOfMonth, endOfMonth } from 'date-fns';

registerLocaleData(zh);

describe('ThyTestDateRangeComponent', () => {
    let fixture: ComponentFixture<ThyTestDateRangeComponent>;
    let fixtureInstance: ThyTestDateRangeComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThyDateRangeModule, NoopAnimationsModule],
            providers: [],
            declarations: [ThyTestDateRangeComponent]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestDateRangeComponent);
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
            dispatchMouseEvent(getPickerTriggerElement(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(getPickerContainer()).not.toBeNull();
            dispatchMouseEvent(queryFromOverlay('.cdk-overlay-backdrop'), 'click');
            fixture.detectChanges();
            tick(500);
            expect(getPickerContainer()).toBeNull();
        }));

        it('should not open by click when thyHiddenMenu is true', fakeAsync(() => {
            fixtureInstance.hiddenMenu = true;
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerElement(), 'click');
            fixture.detectChanges();
            tick(500);
            expect(overlayContainerElement.childElementCount).toEqual(0);
        }));

        it('should have thy-date-rage-text-active class in .thy-date-range-text element when click this element', fakeAsync(() => {
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerElement(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(debugElement.query(By.css('.thy-date-range-container .thy-date-range-text-active'))).not.toBeNull();
        }));

        it('hidden left and right arrow when thyHiddenSwitchRangeIcon is true', fakeAsync(() => {
            fixtureInstance.hiddenSwitchRangeIcon = true;
            fixture.detectChanges();
            expect(debugElement.queryAll(By.css('.thy-date-range-container .btn-icon')).length).toEqual(0);
        }));

        it('should show customValue property value when customValue is not empty string', fakeAsync(() => {
            const text = '自定义日期选择入口';
            fixtureInstance.customValue = text;
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerElement(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const lastActionMenuItem = getPickerContainer()
                .querySelector('thy-popover-container')
                .querySelector('.thy-date-range-action-menu-container').lastChild;
            expect((lastActionMenuItem as HTMLElement).innerText).toEqual(text);
        }));
    });

    describe('action api test', () => {
        beforeEach(() => (fixtureInstance.useSuite = 2));
        it('should show customDateRanges second text when choose second option', fakeAsync(() => {
            const value = fixtureInstance.customDateRanges[1].text;
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerElement(), 'click');
            tick(500);
            fixture.detectChanges();
            const secondOptional = getPickerContainer()
                .querySelector('thy-popover-container')
                .querySelector('.thy-date-range-action-menu-container')
                .querySelectorAll('.action-menu-item')[1];
            dispatchMouseEvent(secondOptional, 'click');
            tick(500);
            fixture.detectChanges();
            expect(getPickerTriggerElement().innerText).toEqual(value);
        }));
    });

    function getPickerTriggerElement(): HTMLInputElement {
        return debugElement.query(By.css('.thy-date-range-text')).nativeElement as HTMLInputElement;
    }

    function getPickerContainer(): HTMLElement {
        return queryFromOverlay('.cdk-overlay-pane') as HTMLElement;
    }

    function queryFromOverlay(selector: string): HTMLElement {
        return overlayContainerElement.querySelector(selector) as HTMLElement;
    }
});

@Component({
    template: `
        <ng-container [ngSwitch]="useSuite">
            <!-- Suite 1 for test general Api -->
            <thy-date-range
                *ngSwitchCase="1"
                name="generalProperties"
                [thyHiddenMenu]="hiddenMenu"
                [thyDisabledSwitch]="hiddenSwitchRangeIcon"
                [thyCustomTextValue]="customValue"
                [thyOptionalDateRanges]="dateRanges"
                [(ngModel)]="selectedDate"
            ></thy-date-range>

            <!-- Suite 2 -->
            <thy-date-range
                *ngSwitchCase="2"
                name="setCustomDateRanges"
                [thyOptionalDateRanges]="customDateRanges"
                [(ngModel)]="selectedDate"
            ></thy-date-range>
        </ng-container>
    `
})
class ThyTestDateRangeComponent {
    useSuite: 1 | 2 | 3;

    selectedDate: DateRangeItemInfo;

    dateRanges: DateRangeItemInfo[] = [
        {
            key: '3month',
            text: '近三个月',
            begin: formatDate(new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1)),
            end: formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)),
            timestamp: {
                interval: 3,
                unit: 'month'
            }
        }
    ];

    customDateRanges: DateRangeItemInfo[] = [
        {
            key: 'lastThreeMonths',
            text: '最近三个月',
            begin: getUnixTime(startOfMonth(setMonth(new Date(), getMonth(new Date()) - 2))),
            end: getUnixTime(endOfMonth(new Date())),
            timestamp: {
                interval: 3,
                unit: 'month'
            }
        },
        {
            key: 'season',
            text: '本季度',
            begin: getUnixTime(startOfQuarter(new Date())),
            end: getUnixTime(endOfQuarter(new Date())),
            timestamp: {
                interval: 3,
                unit: 'month'
            }
        }
    ];

    hiddenMenu = false;

    hiddenSwitchRangeIcon = false;

    customValue = '';
}
