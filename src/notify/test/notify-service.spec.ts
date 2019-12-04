import { Component, OnInit } from '@angular/core';
import { async, TestBed, ComponentFixture, tick, fakeAsync, flush } from '@angular/core/testing';
import { ThyNotifyModule } from '../notify.module';
import { ThyNotifyService } from '../notify.service';

//#region test component

@Component({
    template: `
        <button class="btn1" (click)="openComponentNotify1()">Open</button>
        <button class="btn2" (click)="openComponentNotify2()">Open</button>
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
        let btnElement1;
        let notifyContainer: NodeListOf<Element>;

        beforeEach(async(() => {
            fixture = TestBed.createComponent(ThyNotifyBasicComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        }));

        function fetchNotifyNum() {
            const notifies = notifyContainer[0].querySelectorAll(`thy-notify`);
            return notifies.length;
        }

        it('body should has thy-notify-container', fakeAsync(() => {
            btnElement1 = fixture.nativeElement.querySelector('.btn1');
            btnElement1.click();
            notifyContainer = bodyElement.querySelectorAll(`thy-notify-container`);
            expect(fetchNotifyNum() === 1).toBeTruthy();
            expect(notifyContainer.length === 1).toBeTruthy();
            btnElement1.click();
            expect(fetchNotifyNum() === 2).toBeTruthy();
            expect(notifyContainer.length === 1).toBeTruthy();
            notifyContainer[0].remove();
        }));
    });
});
