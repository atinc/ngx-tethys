import { dispatchFakeEvent } from 'ngx-tethys/testing';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ThyNotifyModule, ThyNotifyService } from '../../notify';
import { ThyTooltipModule } from '../../tooltip/tooltip.module';
import { ThyCopyDirective } from '../copy.directive';

describe('thy-copy', () => {
    let fixture: ComponentFixture<ThyCopyComponent>;
    let testComponent: ThyCopyComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ThyTooltipModule, ThyNotifyModule, NoopAnimationsModule, ThyCopyDirective],
            declarations: [ThyCopyComponent],
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
            expect(document.body.querySelectorAll(`thy-notify-container`).length).toEqual(1);
            document.body.querySelectorAll(`thy-notify-container`)[0].remove();
        }));

        it('notify not show when thyShowNotify is false', fakeAsync(() => {
            const spy = testComponent.copy;
            fixture.componentInstance.showNotify = false;
            fixture.detectChanges();
            const el = fixture.componentInstance.copyContainer.nativeElement;
            dispatchFakeEvent(el, 'click');
            fixture.detectChanges();
            tick(4500);
            flush();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(document.body.querySelectorAll(`thy-notify-container`).length).toEqual(0);
        }));
    });

    describe('copy tooltip', () => {
        it('thyCopyTips should be default', fakeAsync(() => {
            fixture.detectChanges();
            const component = testComponent.copyDirective;
            expect(component.tooltipService.thyTooltipDirective.content as string).toBe('点击复制');
        }));

        it('thyCopyTips should be correct', fakeAsync(() => {
            testComponent.copyTooltip = '测试';
            fixture.detectChanges();
            const component = testComponent.copyDirective;
            expect(component.tooltipService.thyTooltipDirective.content as string).toBe(testComponent.copyTooltip);
        }));

        it('thyCopyTipOffset should be correct', fakeAsync(() => {
            testComponent.copyTipsOffset = 10;
            fixture.detectChanges();
            const component = testComponent.copyDirective;
            expect(component.tooltipService.thyTooltipDirective.tooltipOffset).toBe(10);
        }));
    });
});
@Component({
    template: `
        <p
            #copyContainer
            (thyCopy)="copy($event)"
            thyCopyContent="content"
            [thyCopyTipsOffset]="copyTipsOffset"
            [thyCopyTips]="copyTooltip"
            [thyShowNotify]="showNotify">
            点击
        </p>
    `
})
class ThyCopyComponent implements OnInit {
    copyTooltip: string;

    copyTipsOffset: number;

    showNotify = true;

    @ViewChild('copyContainer', { read: false }) copyContainer: ElementRef<Element>;

    @ViewChild(ThyCopyDirective, { static: true }) copyDirective: ThyCopyDirective;

    copy = jasmine.createSpy('thyCopy callback');

    ngOnInit() {}
}
