import { Component, OnInit } from '@angular/core';
import { async, TestBed, ComponentFixture, tick, fakeAsync, flush } from '@angular/core/testing';
import { ThyNotifyModule } from '../notify.module';
import { ThyNotifyService } from '../notify.service';

//#region test component

@Component({
    template: `
        <button class="btn1" (click)="openComponentNotify1()">Open</button>
        <button class="btn2" (click)="openComponentNotify2()">Open</button>
        <button class="btn3" (click)="openComponentNotify3()">Open placement</button>
    `
})
export class ThyNotifyBasicComponent implements OnInit {
    constructor(private notifyService: ThyNotifyService) {}
    ngOnInit() {}
    openComponentNotify1() {
        this.notifyService.show({
            title: '添加项目成功！',
            duration: 0
        });
    }
    openComponentNotify2() {
        this.notifyService.show({
            title: 'hhh！',
            duration: 200
        });
    }
    openComponentNotify3() {
        this.notifyService.show({
            title: '添加项目成功！',
            duration: 0,
            placement: 'topLeft'
        });
    }
}

describe('ThyNotify', () => {
    let bodyElement: Element;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ThyNotifyModule],
            declarations: [ThyNotifyBasicComponent],
            providers: []
        });
        TestBed.compileComponents();
        bodyElement = document.body;
    }));

    describe('basic', () => {
        let fixture: ComponentFixture<ThyNotifyBasicComponent>;
        let componentInstance: ThyNotifyBasicComponent;
        let btnElement1, btnElement3;
        let notifyContainer: NodeListOf<Element>, notifyTopLeftContainer: NodeListOf<Element>;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(ThyNotifyBasicComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        }));

        function fetchNotifyNum(container: NodeListOf<Element>) {
            const notifies = container[0].querySelectorAll(`thy-notify`);
            return notifies.length;
        }

        it('body should has thy-notify-container', fakeAsync(() => {
            btnElement1 = fixture.nativeElement.querySelector('.btn1');
            btnElement1.click();
            fixture.detectChanges();
            notifyContainer = bodyElement.querySelectorAll(`.thy-notify-topRight`);
            expect(fetchNotifyNum(notifyContainer) === 1).toBeTruthy();
            expect(notifyContainer.length === 1).toBeTruthy();
            btnElement1.click();
            fixture.detectChanges();
            expect(fetchNotifyNum(notifyContainer) === 2).toBeTruthy();
            expect(notifyContainer.length === 1).toBeTruthy();
            notifyContainer[0].remove();
        }));

        it('body should has thy-notify-topLeft', fakeAsync(() => {
            btnElement3 = fixture.nativeElement.querySelector('.btn3');
            btnElement3.click();
            fixture.detectChanges();
            notifyTopLeftContainer = bodyElement.querySelectorAll(`.thy-notify-topLeft`);
            expect(fetchNotifyNum(notifyTopLeftContainer) === 1).toBeTruthy();
            expect(notifyTopLeftContainer.length === 1).toBeTruthy();
            btnElement3.click();
            fixture.detectChanges();
            expect(fetchNotifyNum(notifyTopLeftContainer) === 2).toBeTruthy();
            expect(notifyTopLeftContainer.length === 1).toBeTruthy();
            notifyTopLeftContainer[0].remove();
        }));
    });
});
