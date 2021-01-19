import { Component, OnInit, DebugElement } from '@angular/core';
import { async, TestBed, ComponentFixture, tick, fakeAsync, flush } from '@angular/core/testing';
import { ThyNotifyModule } from '../notify.module';
import { ThyNotifyService } from '../notify.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyNotifyComponent } from '../notify.component';
import { By } from '@angular/platform-browser';

//#region test component

@Component({
    template: `
        <button class="btn1" (click)="openComponentNotify1()">Open</button>
        <button class="btn2" (click)="openComponentNotify2()">Open</button>
        <button class="btn3" (click)="openComponentNotify3()">Open placement</button>
        <button class="btn4" (click)="openComponentNotify4()">Open</button>
        <button class="btn5" (click)="openComponentNotify5()">Open</button>
        <button class="btn6" (click)="openComponentNotify6()">Open</button>
        <button class="btn7" (click)="openComponentNotify7()">Open</button>
    `
})
export class ThyNotifyBasicComponent implements OnInit {
    count = 0;
    openAction = () => {
        this.count++;
    };
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
    openComponentNotify4() {
        this.notifyService.show({
            type: 'success',
            title: '添加项目成功！',
            content: '获取数据成功！',
            detail: {
                link: '查看',
                action: this.openAction
            },
            duration: 0
        });
    }

    openComponentNotify5() {
        this.notifyService.show({
            type: 'success',
            title: '添加项目成功！',
            content: '获取数据成功！',
            detail: 'detail中content是文本',
            duration: 0
        });
    }

    openComponentNotify6() {
        this.notifyService.show({
            type: 'success',
            title: '添加项目成功！',
            content: '获取数据成功！',
            detail: {
                link: '查看',
                content: '查看的内容',
                action: this.openAction
            },
            duration: 0
        });
    }

    openComponentNotify7() {
        this.notifyService.success('成功的title', '成功的content', { detail: '我是成功的detail', duration: 0 });
    }
}

describe('ThyNotify', () => {
    let bodyElement: Element;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ThyNotifyModule, NoopAnimationsModule],
            declarations: [ThyNotifyBasicComponent],
            providers: []
        });
        TestBed.compileComponents();
        bodyElement = document.body;
    }));

    describe('basic', () => {
        let fixture: ComponentFixture<ThyNotifyBasicComponent>;
        let componentInstance: ThyNotifyBasicComponent;
        let btnElement1, btnElement3, btnElement4, btnElement5, btnElement6, btnElement7;
        let notifyContainer: NodeListOf<Element>, notifyTopLeftContainer: NodeListOf<Element>, linkContainer: NodeListOf<Element>;

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

        it('When detail is an object, it should be a clickable link', fakeAsync(() => {
            btnElement4 = fixture.nativeElement.querySelector('.btn4');
            btnElement4.click();
            fixture.detectChanges();
            const notifyOpenDetailContainer1 = bodyElement.querySelectorAll(`.thy-notify-topRight`);
            linkContainer = bodyElement.querySelectorAll(`.link-secondary`);
            expect(linkContainer[0].textContent === '查看').toBeTruthy();
            const openActionElement = linkContainer[0] as HTMLElement;
            openActionElement.click();
            fixture.detectChanges();
            expect(componentInstance.count === 1).toBeTruthy();
            notifyOpenDetailContainer1[0].remove();
        }));

        it('When detail is string, detail text should be displayed', fakeAsync(() => {
            btnElement5 = fixture.nativeElement.querySelector('.btn5');
            btnElement5.click();
            fixture.detectChanges();
            const notifyOpenDetailContainer2 = bodyElement.querySelectorAll(`.thy-notify-topRight`);
            linkContainer = bodyElement.querySelectorAll(`.link-secondary`);
            expect(linkContainer[1].textContent === '[详情]').toBeTruthy();
            const openDetailElement = linkContainer[1] as HTMLElement;
            openDetailElement.click();
            fixture.detectChanges();
            const detailContentContainer = bodyElement.querySelectorAll(`.thy-notify-detail`);
            expect(detailContentContainer[0].textContent === 'detail中content是文本').toBeTruthy();
            notifyOpenDetailContainer2[0].remove();
        }));

        it('When the parameters in the detail exist, they should all work', fakeAsync(() => {
            btnElement6 = fixture.nativeElement.querySelector('.btn6');
            btnElement6.click();
            fixture.detectChanges();
            const notifyOpenDetailContainer3 = bodyElement.querySelectorAll(`.thy-notify-topRight`);
            linkContainer = bodyElement.querySelectorAll(`.link-secondary`);
            expect(linkContainer[2].textContent === '查看').toBeTruthy();
            const openDetailElement = linkContainer[2] as HTMLElement;
            openDetailElement.click();
            fixture.detectChanges();
            expect(componentInstance.count === 1).toBeTruthy();
            const detailContentContainer = bodyElement.querySelectorAll(`.thy-notify-detail`);
            expect(detailContentContainer[0].textContent === '查看的内容').toBeTruthy();
            notifyOpenDetailContainer3[0].remove();
        }));

        it('When you click openComponentNotify7, the content should be "成功的title" and the detail should be"我是成功的detail"', fakeAsync(() => {
            btnElement7 = fixture.nativeElement.querySelector('.btn7');
            btnElement7.click();
            fixture.detectChanges();
            const notifyOpenDetailContainer4 = bodyElement.querySelectorAll(`.thy-notify-topRight`);
            linkContainer = bodyElement.querySelectorAll(`.link-secondary`);
            expect(linkContainer[3].textContent === '[详情]').toBeTruthy();
            const titleContainer = bodyElement.querySelectorAll(`.thy-notify-title`);
            expect(titleContainer[5].textContent === '成功的title').toBeTruthy();
            const openDetailElement = linkContainer[3] as HTMLElement;
            openDetailElement.click();
            fixture.detectChanges();
            const detailContentContainer = bodyElement.querySelectorAll(`.thy-notify-detail`);
            expect(detailContentContainer[0].textContent === '我是成功的detail').toBeTruthy();
            notifyOpenDetailContainer4[0].remove();
        }));
    });
});
