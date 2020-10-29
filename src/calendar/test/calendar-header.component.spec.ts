import { Component, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyCalendarModule } from '../module';

@Component({
    selector: 'thy-demo-calendar-header',
    template: ``
})
class ThyDemoCalendarHeaderComponent {}

@NgModule({
    imports: [ThyCalendarModule],
    declarations: [ThyDemoCalendarHeaderComponent],
    exports: [ThyDemoCalendarHeaderComponent]
})
export class CalendarHeaderTestModule {}

describe('ThyCalendar', () => {
    let fixture: ComponentFixture<ThyDemoCalendarHeaderComponent>;
    let testComponent: ThyDemoCalendarHeaderComponent;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyCalendarModule, CalendarHeaderTestModule],
            providers: []
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoCalendarHeaderComponent);
        testComponent = fixture.debugElement.componentInstance;
    });

    it('', () => {});

    it('', () => {});
});
