import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyTimePanel } from '../time-picker-panel.component';
import { ThyTimePickerModule } from '../time-picker.module';
import { provideHttpClient } from '@angular/common/http';

describe('ThyTimePanelComponent', () => {
    let fixture: ComponentFixture<ThyTestTimePanelComponent>;
    let fixtureInstance: ThyTestTimePanelComponent;
    let debugElement: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThyTimePickerModule],
            declarations: [ThyTestTimePanelComponent],
            providers: [provideHttpClient()]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestTimePanelComponent);
        fixtureInstance = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    describe('general property testing', () => {
        it('should support thyFormat', fakeAsync(() => {
            fixtureInstance.format = 'HH:mm:ss';
            fixture.detectChanges();
            let columns = debugElementQueryAll('.thy-time-picker-panel-time-column');
            expect(columns.length === 3).toBeTruthy();
            expect(columns.find(m => m.classes[hourColumnClass])).toBeTruthy();
            expect(columns.find(m => m.classes[minuteColumnClass])).toBeTruthy();
            expect(columns.find(m => m.classes[secondColumnClass])).toBeTruthy();

            fixtureInstance.format = 'H:mm';
            fixture.detectChanges();
            columns = debugElementQueryAll('.thy-time-picker-panel-time-column');
            expect(columns.length === 2).toBeTruthy();
            expect(columns.find(m => m.classes[hourColumnClass])).toBeTruthy();
            expect(columns.find(m => m.classes[minuteColumnClass])).toBeTruthy();

            fixtureInstance.format = null;
            fixture.detectChanges();
            columns = debugElementQueryAll('.thy-time-picker-panel-time-column');
            expect(columns.length === 3).toBeTruthy();
            expect(columns.find(m => m.classes[hourColumnClass])).toBeTruthy();
            expect(columns.find(m => m.classes[minuteColumnClass])).toBeTruthy();
            expect(columns.find(m => m.classes[secondColumnClass])).toBeTruthy();

            flush();
        }));

        it('should support thyHourStep,thyMinuteStep,thySecondStep', fakeAsync(() => {
            fixtureInstance.hourStep = 5;
            fixtureInstance.minuteStep = 10;
            fixtureInstance.secondStep = 20;
            fixture.detectChanges();

            expect(getHourColumnElement().children.length === Math.ceil(24 / 5)).toBeTruthy();
            expect(getMinuteColumnElement().children.length === Math.ceil(60 / 10)).toBeTruthy();
            expect(getSecondColumnElement().children.length === Math.ceil(60 / 20)).toBeTruthy();

            flush();
        }));

        it('should support thyShowSelectNow', () => {
            fixtureInstance.showSelectNow = false;
            fixture.detectChanges();
            expect(debugElementQuery('.thy-time-picker-panel-time-now')).toBeFalsy();

            fixtureInstance.showSelectNow = true;
            fixture.detectChanges();
            expect(debugElementQuery('.thy-time-picker-panel-time-now')).toBeTruthy();

            const valueChange = spyOn(fixtureInstance, 'onPickTime');
            const closePanel = spyOn(fixtureInstance, 'closePanel');

            debugElementQuery('.thy-time-picker-panel-time-now').nativeElement.click();
            expect(valueChange).toHaveBeenCalled();
            expect(closePanel).toHaveBeenCalled();
        });

        it('should support thyShowOperations', () => {
            fixtureInstance.showOperations = false;
            fixture.detectChanges();
            expect(debugElementQuery('.thy-time-picker-panel-bottom-operation')).toBeFalsy();

            fixtureInstance.showOperations = true;
            fixture.detectChanges();
            expect(debugElementQuery('.thy-time-picker-panel-bottom-operation')).toBeTruthy();
        });
    });

    describe('active style testing', () => {
        it('should add active style when pick time', fakeAsync(() => {
            fixture.detectChanges();
            const hour = getHourColumnChildren(10);
            hour.click();

            fixture.detectChanges();
            expect(hour.classList.contains('thy-time-picker-panel-time-column-cell-selected')).toBeTruthy();
            flush();
        }));
    });

    describe('ngModel testing', () => {
        it('should support default value', fakeAsync(() => {
            const date = new Date();
            date.setHours(10, 20, 3);
            fixtureInstance.value = date;
            fixture.detectChanges();
            tick(500);

            expect(fixtureInstance.timePanelRef.value.getTime() === date.getTime()).toBeTruthy();
            expect(fixtureInstance.timePanelRef.hour === 10).toBeTruthy();
            expect(fixtureInstance.timePanelRef.minute === 20).toBeTruthy();
            expect(fixtureInstance.timePanelRef.second === 3).toBeTruthy();

            const value = new Date().setHours(10, 20, 30);
            fixtureInstance.value = value;
            fixture.detectChanges();
            tick(500);

            expect(fixtureInstance.timePanelRef.value.getTime() === value).toBeTruthy();
            expect(fixtureInstance.timePanelRef.hour === 10).toBeTruthy();
            expect(fixtureInstance.timePanelRef.minute === 20).toBeTruthy();
            expect(fixtureInstance.timePanelRef.second === 30).toBeTruthy();
        }));

        it('should support pick hour,minute,second and emit change event', fakeAsync(() => {
            const date = new Date();
            date.setHours(10, 20, 3);
            let newDate = new Date(date);
            fixtureInstance.value = date;
            fixture.detectChanges();
            tick(500);
            expect(fixtureInstance.timePanelRef.value.getTime() === new Date(date).getTime()).toBeTruthy();

            const valueChange = spyOn(fixtureInstance, 'onPickTime');

            getHourColumnChildren(5).click();
            newDate.setHours(5);
            expect(valueChange.calls.mostRecent().args[0].getTime() === newDate.getTime()).toBeTruthy();

            tick(200);

            getMinuteColumnChildren(10).click();
            newDate.setMinutes(10);
            expect(valueChange.calls.mostRecent().args[0].getTime() === newDate.getTime()).toBeTruthy();

            tick(200);

            getSecondColumnChildren(30).click();
            newDate.setSeconds(30);
            expect(valueChange.calls.mostRecent().args[0].getTime() === newDate.getTime()).toBeTruthy();
        }));

        it('should support confirm emit change', fakeAsync(() => {
            const date = new Date();
            date.setHours(10, 20, 3);
            let newDate = new Date(date);
            fixtureInstance.value = date;
            fixture.detectChanges();
            tick(500);
            expect(fixtureInstance.timePanelRef.value.getTime() === new Date(date).getTime()).toBeTruthy();

            const valueChange = spyOn(fixtureInstance, 'onValueChange');

            getHourColumnChildren(5).click();
            newDate.setHours(5);
            tick(200);
            getMinuteColumnChildren(10).click();
            newDate.setMinutes(10);
            tick(200);
            newDate.setSeconds(30);
            getSecondColumnChildren(30).click();

            debugElementQuery('.thy-time-picker-panel-time-confirm').nativeElement.click();

            expect(valueChange.calls.mostRecent().args[0].getTime() === newDate.getTime()).toBeTruthy();
        }));
    });

    const hourColumnClass = 'thy-time-picker-panel-hour-column';

    const minuteColumnClass = 'thy-time-picker-panel-minute-column';

    const secondColumnClass = 'thy-time-picker-panel-second-column';

    function getHourColumnElement() {
        return debugElementQuery(`.${hourColumnClass}`);
    }

    function getHourColumnChildren(index: number) {
        return getHourColumnElement().children[index].nativeElement as HTMLElement;
    }

    function getMinuteColumnElement() {
        return debugElementQuery(`.${minuteColumnClass}`);
    }

    function getMinuteColumnChildren(index: number) {
        return getMinuteColumnElement().children[index].nativeElement as HTMLElement;
    }

    function getSecondColumnElement() {
        return debugElementQuery(`.${secondColumnClass}`);
    }

    function getSecondColumnChildren(index: number) {
        return getSecondColumnElement().children[index].nativeElement as HTMLElement;
    }

    function debugElementQuery(selector: string) {
        return debugElement.query(By.css(selector));
    }

    function debugElementQueryAll(selector: string) {
        return debugElement.queryAll(By.css(selector));
    }
});

@Component({
    template: `
        <thy-time-picker-panel
            #panel
            [(ngModel)]="value"
            [thyFormat]="format"
            [thyHourStep]="hourStep"
            [thyMinuteStep]="minuteStep"
            [thySecondStep]="secondStep"
            [thyShowSelectNow]="showSelectNow"
            [thyShowOperations]="showOperations"
            (thyPickChange)="onPickTime($event)"
            (ngModelChange)="onValueChange($event)"
            (thyClosePanel)="closePanel()"></thy-time-picker-panel>
    `,
    standalone: false
})
class ThyTestTimePanelComponent {
    @ViewChild('panel') timePanelRef: ThyTimePanel;

    value: Date | number;

    format: string = 'HH:mm:ss';

    hourStep = 1;

    minuteStep = 1;

    secondStep = 1;

    showSelectNow = true;

    showOperations = true;

    onPickTime(value: Date) {}

    onValueChange(value: Date) {}

    closePanel() {}
}
