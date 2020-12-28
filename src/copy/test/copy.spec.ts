import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, async, TestBed, flush, fakeAsync, tick } from '@angular/core/testing';
import { dispatchFakeEvent } from 'ngx-tethys/testing';
import { ThyCopyDirective } from '../copy.directive';
import { ThyTooltipModule } from '../../tooltip/tooltip.module';
import { ThyNotifyService, ThyNotifyModule } from '../../notify';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('thy-copy', () => {
    let fixture: ComponentFixture<ThyCopyComponent>;
    let testComponent: ThyCopyComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ThyTooltipModule, ThyNotifyModule, NoopAnimationsModule],
            declarations: [ThyCopyComponent, ThyCopyDirective],
            providers: [ThyNotifyService]
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
            tick(4500);
            flush();
            expect(spy).toHaveBeenCalledTimes(1);
            document.body.querySelectorAll(`thy-notify-container`)[0].remove();
        }));
    });

    describe('copy tooltip', () => {
        it('thyCopyTips should be correct', fakeAsync(() => {
            // console.log(testComponent,testComponent.copyDirective.tooltipService.thyTooltipDirective);
        }));
    });
});
@Component({
    template: `
        <p #copyContainer (thyCopy)="copy($event)" thyCopyContent="我是一只猪猪" [thyCopyTips]="copyTooltip">点击</p>
    `
})
class ThyCopyComponent implements OnInit {
    copyTooltip = '';

    ngOnInit() {}
    @ViewChild('copyContainer', { read: false }) copyContainer: ElementRef<Element>;
    @ViewChild(ThyCopyDirective, { static: true }) copyDirective: ThyCopyDirective;

    copy = jasmine.createSpy('thyCopy callback');
}
