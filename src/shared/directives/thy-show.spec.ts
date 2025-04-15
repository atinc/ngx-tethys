import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ThyShowDirective } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-show-test',
    template: ` <div class="thy-show-test" [thyShow]="isShow">测试 ThyShow 指令</div> `,
    imports: [ThyShowDirective]
})
class ThyShowTestComponent {
    isShow = false;
}

describe('ThyShowDirective', () => {
    let fixture: ComponentFixture<ThyShowTestComponent>;
    let testComponent: ThyShowTestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyShowTestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should not display when isShow is false', fakeAsync(() => {
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector('.thy-show-test').style.display).toBe('none');
    }));

    it('should display when isShow is true', fakeAsync(() => {
        testComponent.isShow = true;
        fixture.detectChanges();
        tick(16);
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector('.thy-show-test').style.display).toBe('block');
    }));
});
