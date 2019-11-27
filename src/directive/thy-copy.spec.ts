import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, async, TestBed, flush, fakeAsync, tick } from '@angular/core/testing';
import { ThyDirectiveModule } from './module';
import { ThyCopyDirective } from './thy-copy.directive';
import { dispatchFakeEvent } from '../core/testing';
import { By } from '@angular/platform-browser';
import { ThyTooltipModule } from '../tooltip/tooltip.module';
import { ThyNotifyService, ThyNotifyModule } from '../notify';

describe('thy-copy', () => {
    let fixture: ComponentFixture<ThyCopyComponent>;
    let testComponent: ThyCopyComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ThyDirectiveModule, ThyTooltipModule, ThyNotifyModule],
            declarations: [ThyCopyComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyCopyComponent);
        testComponent = fixture.componentInstance;
    });

    describe('copy listener', () => {
        it('thyCopy should be called', fakeAsync(() => {
            const spy = testComponent.copy;
            fixture.detectChanges();
            const el = fixture.componentInstance.copyContainer.nativeElement;
            dispatchFakeEvent(el, 'click');
            fixture.detectChanges();
            flush();

            expect(spy).toHaveBeenCalledTimes(1);
        }));
    });
});
@Component({
    template: `
        <p #copyContainer (thyCopy)="copy($event)" [thyCopyContent]="'我是一只猪猪'"></p>
    `
})
class ThyCopyComponent implements OnInit {
    ngOnInit() {}
    @ViewChild('copyContainer', { read: false }) copyContainer: ElementRef<Element>;
    copy = jasmine.createSpy('thyCopy callback');
}
