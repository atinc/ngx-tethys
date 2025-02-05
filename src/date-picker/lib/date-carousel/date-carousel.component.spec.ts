import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LibPackerModule } from 'ngx-tethys/date-picker';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { setDefaultTimeZone } from 'ngx-tethys/util';
import { RangeAdvancedValue } from '../../inner-types';
import { TinyDate } from './../../../util/date/tiny-date';
import { DateCarousel } from './date-carousel.component';

registerLocaleData(zh);

describe('TestDateCarouselComponent', () => {
    let fixture: ComponentFixture<TestDateCarouselComponent>;
    let fixtureInstance: TestDateCarouselComponent;
    let debugElement: DebugElement;
    let nativeElement: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, LibPackerModule],
            providers: [],
            declarations: [TestDateCarouselComponent]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestDateCarouselComponent);
        fixtureInstance = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = fixture.debugElement.query(By.directive(DateCarousel)).nativeElement;
        setDefaultTimeZone('Asia/Shanghai');
    });

    describe('date-carousel testing', () => {
        it('should build correct selectableData without advancedSelectedValue', fakeAsync(() => {
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const selectableBtns = getSelectableBtns();
            expect(selectableBtns.length).toEqual(11);
            const yearBtns = getYearBtns();
            expect((yearBtns[0] as HTMLElement).innerText).toEqual(`${new TinyDate().getYear()}`);
            expect((yearBtns[1] as HTMLElement).innerText).toEqual(`${new TinyDate().addYears(1).getYear()}`);
            expect((yearBtns[2] as HTMLElement).innerText).toEqual(`${new TinyDate().addYears(2).getYear()}`);
        }));

        it('should build correct selectableData with advancedSelectedValue', fakeAsync(() => {
            fixture.detectChanges();
            fixtureInstance.advancedSelectedValue = {
                begin: new TinyDate('2022-04-01'),
                dateGranularity: 'month',
                end: new TinyDate('2022-06-10')
            };
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const monthBtns = getMonthBtns();
            expect(monthBtns[0].classList.contains('active'));
            expect(monthBtns[1].classList.contains('active'));
            expect((monthBtns[0] as HTMLElement).innerText).toEqual(`${new TinyDate('2022-04-01').getMonth() + 1}月`);
            expect((monthBtns[1] as HTMLElement).innerText).toEqual(`${new TinyDate('2022-04-01').addMonths(1).getMonth() + 1}月`);
            expect((monthBtns[2] as HTMLElement).innerText).toEqual(`${new TinyDate('2022-04-01').addMonths(2).getMonth() + 1}月`);

            flush();

            fixture.detectChanges();
            fixtureInstance.advancedSelectedValue = {
                begin: new TinyDate('2022-04-01'),
                dateGranularity: 'year',
                end: new TinyDate('2023-06-10')
            };
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();

            const yearBtns = getYearBtns();
            expect(yearBtns[0].classList.contains('active'));
            expect(yearBtns[1].classList.contains('active'));
            expect(yearBtns[2].classList.contains('active')).toBeFalsy();
            expect((yearBtns[0] as HTMLElement).innerText).toEqual(`${new TinyDate('2022-04-01').getYear()}`);
            expect((yearBtns[1] as HTMLElement).innerText).toEqual(`${new TinyDate('2022-04-01').addYears(1).getYear()}`);
            expect((yearBtns[2] as HTMLElement).innerText).toEqual(`${new TinyDate('2022-04-01').addYears(2).getYear()}`);
        }));

        it('should ndModel worked', fakeAsync(() => {
            fixtureInstance.advancedSelectedValue = {
                begin: new TinyDate('2022-04-01'),
                dateGranularity: 'quarter',
                end: new TinyDate('2022-06-10')
            };
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const yearBtns = getYearBtns();
            const quarterBtns = getQuarterBtns();
            const monthBtns = getMonthBtns();
            expect(yearBtns[0].classList.contains('indeterminate'));
            expect(quarterBtns[0].classList.contains('active'));
            expect(monthBtns[0].classList.contains('indeterminate'));
            expect(monthBtns[1].classList.contains('indeterminate'));
            expect(monthBtns[2].classList.contains('indeterminate'));
            fixture.detectChanges();
            dispatchMouseEvent(yearBtns[0], 'click');
            fixture.detectChanges();
            expect(fixtureInstance.advancedSelectedValue.begin.isSameDay(new TinyDate('2022-04-01').startOfYear())).toBeTruthy();
            expect(fixtureInstance.advancedSelectedValue.end.isSameDay(new TinyDate('2022-04-01').endOfYear())).toBeTruthy();
            expect(fixtureInstance.advancedSelectedValue.dateGranularity).toBe('year');
        }));

        it('should ndModelChange call', fakeAsync(() => {
            const spy = spyOn(fixtureInstance, 'modelValueChange');
            fixtureInstance.advancedSelectedValue = {
                begin: new TinyDate('2022-04-01'),
                dateGranularity: 'quarter',
                end: new TinyDate('2022-06-10')
            };
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const yearBtns = getYearBtns();
            dispatchMouseEvent(yearBtns[0], 'click');
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledWith({
                begin: new TinyDate('2022-04-01').startOfYear(),
                dateGranularity: 'year',
                end: new TinyDate('2022-06-10').endOfYear()
            });
            flush();
            dispatchMouseEvent(yearBtns[0], 'click');
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledWith({
                begin: null,
                dateGranularity: null,
                end: null
            });
        }));

        it('should activeDate worked', fakeAsync(() => {
            fixtureInstance.activeDate = new TinyDate('2022-05-01');
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const yearBtns = getYearBtns();
            const quarterBtns = getQuarterBtns();
            const monthBtns = getMonthBtns();
            expect((yearBtns[0] as HTMLElement).innerText).toEqual(`${new TinyDate('2022-05-01').getYear()}`);
            expect((yearBtns[1] as HTMLElement).innerText).toEqual(`${new TinyDate('2022-05-01').addYears(1).getYear()}`);
            expect((yearBtns[2] as HTMLElement).innerText).toEqual(`${new TinyDate('2022-05-01').addYears(2).getYear()}`);
            expect((quarterBtns[0] as HTMLElement).innerText).toEqual(`Q${new TinyDate('2022-05-01').getQuarter()}`);
            expect((quarterBtns[1] as HTMLElement).innerText).toEqual(`Q${new TinyDate('2022-05-01').addQuarters(1).getQuarter()}`);
            expect((quarterBtns[2] as HTMLElement).innerText).toEqual(`Q${new TinyDate('2022-05-01').addQuarters(2).getQuarter()}`);
            expect((monthBtns[0] as HTMLElement).innerText).toEqual(`${new TinyDate('2022-05-01').getMonth() + 1}月`);
            expect((monthBtns[1] as HTMLElement).innerText).toEqual(`${new TinyDate('2022-05-01').addMonths(1).getMonth() + 1}月`);
            expect((monthBtns[2] as HTMLElement).innerText).toEqual(`${new TinyDate('2022-05-01').addMonths(2).getMonth() + 1}月`);
        }));

        it('should build pre and next year button worked', fakeAsync(() => {
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const preAndNextYearBtn = nativeElement.querySelectorAll('.carousel-item-year button');
            dispatchMouseEvent(preAndNextYearBtn[0], 'click');
            flush();
            fixture.detectChanges();
            const yearBtns = getYearBtns();
            expect((yearBtns[0] as HTMLElement).innerText).toEqual(`${new TinyDate().addYears(-1).getYear()}`);
            expect((yearBtns[1] as HTMLElement).innerText).toEqual(`${new TinyDate().addYears(0).getYear()}`);
            expect((yearBtns[2] as HTMLElement).innerText).toEqual(`${new TinyDate().addYears(1).getYear()}`);

            fixture.detectChanges();
            dispatchMouseEvent(preAndNextYearBtn[1], 'click');
            fixture.detectChanges();
            const newYearBtns = getYearBtns();
            expect((newYearBtns[0] as HTMLElement).innerText).toEqual(`${new TinyDate().getYear()}`);
            expect((newYearBtns[1] as HTMLElement).innerText).toEqual(`${new TinyDate().addYears(1).getYear()}`);
            expect((newYearBtns[2] as HTMLElement).innerText).toEqual(`${new TinyDate().addYears(2).getYear()}`);
        }));

        it('should build pre and next quarter button worked', fakeAsync(() => {
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const preAndNextQuarterBtn = nativeElement.querySelectorAll('.carousel-item-quarter button');
            dispatchMouseEvent(preAndNextQuarterBtn[0], 'click');
            flush();
            fixture.detectChanges();
            const quarter = getQuarterBtns();
            expect((quarter[0] as HTMLElement).innerText.includes(`Q${new TinyDate().addQuarters(-2).getQuarter()}`)).toBeTruthy();
            expect((quarter[1] as HTMLElement).innerText.includes(`Q${new TinyDate().addQuarters(-1).getQuarter()}`)).toBeTruthy();
            expect((quarter[2] as HTMLElement).innerText.includes(`Q${new TinyDate().addQuarters(0).getQuarter()}`)).toBeTruthy();

            fixture.detectChanges();
            dispatchMouseEvent(preAndNextQuarterBtn[1], 'click');
            fixture.detectChanges();
            const newQuarterBtns = getQuarterBtns();
            expect((newQuarterBtns[0] as HTMLElement).innerText.includes(`Q${new TinyDate().addQuarters(0).getQuarter()}`)).toBeTruthy();
            expect((newQuarterBtns[1] as HTMLElement).innerText.includes(`Q${new TinyDate().addQuarters(1).getQuarter()}`)).toBeTruthy();
            expect((newQuarterBtns[2] as HTMLElement).innerText.includes(`Q${new TinyDate().addQuarters(2).getQuarter()}`)).toBeTruthy();
        }));

        it('should build pre and next month button worked', fakeAsync(() => {
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const preAndNextMonthBtn = nativeElement.querySelectorAll('.carousel-item-month button');
            dispatchMouseEvent(preAndNextMonthBtn[0], 'click');
            flush();
            fixture.detectChanges();
            const month = getMonthBtns();
            expect((month[0] as HTMLElement).innerText.includes(`${new TinyDate().addMonths(-2).getMonth() + 1}月`)).toBeTruthy();
            expect((month[1] as HTMLElement).innerText.includes(`${new TinyDate().addMonths(-1).getMonth() + 1}月`)).toBeTruthy();
            expect((month[2] as HTMLElement).innerText.includes(`${new TinyDate().addMonths(0).getMonth() + 1}月`)).toBeTruthy();

            fixture.detectChanges();
            dispatchMouseEvent(preAndNextMonthBtn[1], 'click');
            fixture.detectChanges();
            const newMonthBtns = getMonthBtns();
            expect((newMonthBtns[0] as HTMLElement).innerText.includes(`${new TinyDate().addMonths(0).getMonth() + 1}月`)).toBeTruthy();
            expect((newMonthBtns[1] as HTMLElement).innerText.includes(`${new TinyDate().addMonths(1).getMonth() + 1}月`)).toBeTruthy();
            expect((newMonthBtns[2] as HTMLElement).innerText.includes(`${new TinyDate().addMonths(2).getMonth() + 1}月`)).toBeTruthy();
        }));

        it('should mouseenter worked', fakeAsync(() => {
            fixtureInstance.advancedSelectedValue = {
                begin: new TinyDate('2022-04-01'),
                dateGranularity: 'quarter',
                end: new TinyDate('2022-04-10')
            };
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const quarterBtns = getQuarterBtns();
            expect(quarterBtns[0].classList.contains('active'));
            dispatchMouseEvent(quarterBtns[1], 'mouseenter');
            fixture.detectChanges();
            expect(quarterBtns[1].classList.contains('in-hover-range'));
            dispatchMouseEvent(quarterBtns[1], 'mouseleave');
            fixture.detectChanges();
            expect(quarterBtns[1].classList.contains('in-hover-range')).toBeFalsy();

            flush();
            fixture.detectChanges();
            fixtureInstance.advancedSelectedValue = {
                begin: new TinyDate('2022-04-01'),
                dateGranularity: 'month',
                end: new TinyDate('2022-06-10')
            };
            fixture.detectChanges();
            tick(500);
            fixture.detectChanges();
            const monthBtns = getMonthBtns();
            dispatchMouseEvent(monthBtns[1], 'mouseenter');
            fixture.detectChanges();
            expect(monthBtns[1].classList.contains('out-range'));
            dispatchMouseEvent(monthBtns[1], 'mouseleave');
            fixture.detectChanges();
            expect(monthBtns[1].classList.contains('out-range')).toBeFalsy();
        }));
    });

    function getSelectableBtns() {
        return nativeElement.querySelectorAll('.selectable-button');
    }

    function getYearBtns() {
        const btns = getSelectableBtns();
        return Array.from(btns).slice(0, 3);
    }
    function getQuarterBtns() {
        const btns = getSelectableBtns();
        return Array.from(btns).slice(3, 7);
    }

    function getMonthBtns() {
        const btns = getSelectableBtns();
        return Array.from(btns).slice(7);
    }
});

@Component({
    template: `
        <date-carousel
            [activeDate]="activeDate"
            (ngModelChange)="modelValueChange($event)"
            [(ngModel)]="advancedSelectedValue"></date-carousel>
    `
})
class TestDateCarouselComponent {
    advancedSelectedValue: RangeAdvancedValue = {
        begin: undefined,
        end: undefined,
        dateGranularity: undefined
    };
    activeDate: TinyDate;
    modelValueChange(): void {}
}
