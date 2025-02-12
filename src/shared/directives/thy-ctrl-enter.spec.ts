import { dispatchKeyboardEvent } from 'ngx-tethys/testing';
import { ENTER } from 'ngx-tethys/util';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThyCtrlEnterDirective } from './thy-ctrl-enter.directive';

@Component({
    selector: 'thy-autofocus-test',
    template: ` <input #enter (thyCtrlEnter)="ok($event)" /> `,
    standalone: false
})
class ThyCtrlEnterTestComponent {
    @ViewChild('enter') input: ElementRef;

    ok(event: KeyboardEvent) {}
}

describe('ThyCtrlEnterDirective', () => {
    let fixture: ComponentFixture<ThyCtrlEnterTestComponent>;
    let testComponent: ThyCtrlEnterTestComponent;
    let enterSpy: jasmine.Spy;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyCtrlEnterDirective],
            declarations: [ThyCtrlEnterTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyCtrlEnterTestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        enterSpy = spyOn(testComponent, 'ok');
    });

    it('should call thyCtrlEnter when enter', () => {
        const event = dispatchKeyboardEvent(testComponent.input.nativeElement, 'keydown', ENTER, '', { control: true, meta: true });
        fixture.detectChanges();
        expect(enterSpy).toHaveBeenCalled();
        expect(enterSpy).toHaveBeenCalledWith(event);
    });
});
