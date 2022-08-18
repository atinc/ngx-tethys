import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ThyTimePickerModule } from '../time-picker.module';

describe('ThyTimePickerPanelComponent', () => {
    let fixture: ComponentFixture<ThyTestTimePickerPanelComponent>;
    let fixtureInstance: ThyTestTimePickerPanelComponent;
    let debugElement: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ThyTimePickerModule],
            declarations: [ThyTestTimePickerPanelComponent]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestTimePickerPanelComponent);
        fixtureInstance = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    describe('general property testing', () => {});
});

@Component({
    template: `
        <thy-time-picker-panel
            [(ngModel)]="value"
            [thyFormat]="format"
            [thyHourStep]="hourStep"
            [thyMinuteStep]="minuteStep"
            [thySecondStep]="secondStep"
        ></thy-time-picker-panel>
    `
})
class ThyTestTimePickerPanelComponent {
    value: Date;

    format: string = 'HH:mm:ss';

    hourStep = 1;

    minuteStep = 1;

    secondStep = 1;
}
