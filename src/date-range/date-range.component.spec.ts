import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick, flush } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyDatepickerModule } from '../datepicker/datepicker.module';
import { dispatchMouseEvent, typeInElement } from '../core/testing';
import { isSameDay, fromUnixTime } from 'date-fns';
// import { RangeEntry } from './standard-types';
import { DateRangeItemInfo } from './date-range.class';
import { helpers } from '../util';
import { DateHelperByDatePipe } from '../date-picker/date-helper.service';
import { transformDateValue } from '../date-picker/picker.util';
import { ThyDateRangeModule } from './module';
import { O_CREAT } from 'constants';
registerLocaleData(zh);

describe('ThyTestDateRangeComponent', () => {
    let fixture: ComponentFixture<ThyTestDateRangeComponent>;
    let fixtureInstance: ThyTestDateRangeComponent;
    let debugElement: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThyDateRangeModule],
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
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
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
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            expect(getPickerContainer().querySelector('thy-popover-container').childElementCount).toEqual(0);
        }));

        it('should have active class in .thy-date-text element when click this element', fakeAsync(() => {
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(debugElement.query(By.css('.thy-date-range .active'))).not.toBeNull();
        }));

        it('should show yyyy-MM-dd ~ yyyy-MM-dd ', () => {
            fixtureInstance.showDateValue = true;
            fixture.detectChanges();
            const prevDate = new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1);
            const curDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
            const formatStr = 'yyyy-MM-dd';
            const dateHelper = new DateHelperByDatePipe();
            const value = [dateHelper.format(prevDate, formatStr), dateHelper.format(curDate, formatStr)].join(' ~ ');
            expect(getPickerTriggerWrapper().innerText).toEqual(value);
        });

        it('should show customValue property value when customValue is not empty string', fakeAsync(() => {
            const text = '自定义日期选择入口';
            fixtureInstance.customValue = text;
            fixture.detectChanges();
            dispatchMouseEvent(getPickerTriggerWrapper(), 'click');
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            expect(
                (getPickerContainer()
                    .querySelector('thy-popover-container')
                    .querySelector('.thy-date-range-menu-item') as HTMLInputElement).value
            ).toEqual(text);
        }));
    });

    function getPickerTriggerWrapper(): HTMLInputElement {
        return debugElement.query(By.css('.thy-date-text')).nativeElement as HTMLInputElement;
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
            <!-- Suite 1 -->
            <thy-date-range
                *ngSwitchCase="1"
                [thyHiddenMenu]="hiddenMenu"
                [thyShowDateValue]="showDateValue"
                [thyCustomValue]="customValue"
                [thyMinDate]="minDate"
                [thyMaxDate]="maxDate"
                [(ngModel)]="dateTestModel"
                name="setTestDate"
                [dateRanges]="dateRanges"
                (ngModelChange)="change()"
            ></thy-date-range>
            <ng-template #tplDateRender let-current>
                <div [class.test-first-day]="current.getDate() === 1">{{ current.getDate() }}</div>
            </ng-template>

            <!-- Suite 2 -->
            <!-- use default dateRanges -->
            <thy-date-range
                *ngSwitchCase="2"
                [thyShowDateValue]="showDateValue"
                [thyCustomValue]="customValue"
                [thyMinDate]="minDate"
                [thyMaxDate]="maxDate"
                [(ngModel)]="dateTestModel"
                name="setTestDate"
                (ngModelChange)="change()"
            ></thy-date-range>
        </ng-container>
    `
})
class ThyTestDateRangeComponent {
    useSuite: 1 | 2 | 3;
    @ViewChild('tplDateRender', { static: true }) tplDateRender: TemplateRef<Date>;
    @ViewChild('tplExtraFooter', { static: true }) tplExtraFooter: TemplateRef<void>;

    // dateRanges(value: DateRangeItemInfo[])

    dateRanges: DateRangeItemInfo[] = [
        {
            key: '3month',
            text: '近三个月',
            begin: helpers.formatDate(new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1)),
            end: helpers.formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)),
            timestamp: {
                interval: 3,
                unit: 'month'
            }
        }
    ];

    hiddenMenu = false;

    showDateValue: Boolean = false;

    customValue = '';

    minDate: Date;

    maxDate: Date;

    dateTestModel: DateRangeItemInfo;

    change(): void {}
}
