import { Component, OnInit } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, flush, inject, tick } from '@angular/core/testing';
import { ThyNotifyModule } from '../module';
import { ThyNotifyService } from '../notify.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyNotifyConfig } from '../notify.config';
import { OverlayContainer } from '@angular/cdk/overlay';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';

//#region test component

@Component({
    template: `
        <ng-container *ngFor="let option of options; let i = index">
            <button class="btn-{{ i }}" (click)="openComponentNotify(option)">Open</button>
        </ng-container>

        <button class="successBtn" (click)="openComponentSuccessNotify()">Open</button>
    `
})
export class ThyNotifyBasicComponent implements OnInit {
    count = 0;

    options = [
        {
            title: '添加项目成功！',
            duration: 0
        },
        {
            title: 'will disappear in 200ms',
            placement: 'bottomRight',
            duration: 200
        },
        {
            title: '添加项目成功！',
            duration: 0,
            placement: 'topLeft'
        },
        {
            type: 'success',
            title: '添加项目成功！',
            content: '获取数据成功！',
            detail: {
                link: '查看',
                action: () => {
                    this.count++;
                }
            },
            duration: 0
        },
        {
            type: 'success',
            title: '添加项目成功！',
            content: '获取数据成功！',
            detail: 'detail中content是文本',
            duration: 0
        },
        {
            type: 'success',
            title: '添加项目成功！',
            content: '获取数据成功！',
            detail: {
                link: '查看',
                content: '查看的内容',
                action: () => {
                    this.count++;
                }
            },
            duration: 0
        },
        {
            title: 'Placement is bottomLeft！',
            duration: 0,
            placement: 'bottomLeft'
        },
        {
            title: 'Placement is bottomRight',
            duration: 0,
            placement: 'bottomRight'
        },
        {
            title: 'mouseenter event',
            duration: 200,
            placement: 'bottomRight',
            pauseOnHover: true
        }
    ];

    openAction = () => {
        this.count++;
    };

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    openComponentNotify(options: ThyNotifyConfig) {
        this.notifyService.show(options);
    }

    openComponentSuccessNotify() {
        this.notifyService.success('成功的title', '成功的content', { detail: '我是成功的detail', duration: 0 });
    }
}

describe('ThyNotify', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyNotifyModule, NoopAnimationsModule],
            declarations: [ThyNotifyBasicComponent],
            providers: []
        });
        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();
        TestBed.compileComponents();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('basic', () => {
        let fixture: ComponentFixture<ThyNotifyBasicComponent>;
        let componentInstance: ThyNotifyBasicComponent;
        let btnElement, successElement;
        let notifyContainer: NodeListOf<Element>, notifyTopLeftContainer: NodeListOf<Element>, linkContainer: NodeListOf<Element>;

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(ThyNotifyBasicComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        }));

        function fetchNotifyNum(container: NodeListOf<Element>) {
            const notifies = container[0].querySelectorAll(`thy-notify`);
            return notifies.length;
        }

        it('body should has thy-notify-container', fakeAsync(() => {
            btnElement = fixture.nativeElement.querySelector('.btn-0');
            btnElement.click();
            fixture.detectChanges();
            flush();
            notifyContainer = overlayContainerElement.querySelectorAll('.thy-notify-topRight');

            expect(fetchNotifyNum(notifyContainer) === 1).toBeTruthy();
            expect(notifyContainer.length === 1).toBeTruthy();
            btnElement.click();
            fixture.detectChanges();
            expect(fetchNotifyNum(notifyContainer) === 2).toBeTruthy();
            expect(notifyContainer.length === 1).toBeTruthy();
            notifyContainer[0].remove();
        }));

        it('body should has thy-notify-topLeft', fakeAsync(() => {
            btnElement = fixture.nativeElement.querySelector('.btn-2');
            btnElement.click();
            fixture.detectChanges();
            notifyTopLeftContainer = overlayContainerElement.querySelectorAll('.thy-notify-topLeft');
            expect(fetchNotifyNum(notifyTopLeftContainer) === 1).toBeTruthy();
            expect(notifyTopLeftContainer.length === 1).toBeTruthy();
            btnElement.click();
            fixture.detectChanges();
            expect(fetchNotifyNum(notifyTopLeftContainer) === 2).toBeTruthy();
            expect(notifyTopLeftContainer.length === 1).toBeTruthy();
            notifyTopLeftContainer[0].remove();
        }));

        it('When detail is an object, it should be a clickable link', fakeAsync(() => {
            btnElement = fixture.nativeElement.querySelector('.btn-3');
            btnElement.click();
            fixture.detectChanges();

            const notifyOpenDetailContainer1 = overlayContainerElement.querySelectorAll(`.thy-notify-topRight`);
            linkContainer = overlayContainerElement.querySelectorAll(`.link-secondary`);
            expect(linkContainer[0].textContent === '查看').toBeTruthy();
            const openActionElement = linkContainer[0] as HTMLElement;
            openActionElement.click();
            fixture.detectChanges();
            expect(componentInstance.count === 1).toBeTruthy();
            notifyOpenDetailContainer1[0].remove();
        }));

        it('When detail is string, detail text should be displayed', fakeAsync(() => {
            btnElement = fixture.nativeElement.querySelector('.btn-4');
            btnElement.click();
            fixture.detectChanges();
            const notifyOpenDetailContainer2 = overlayContainerElement.querySelectorAll(`.thy-notify-topRight`);
            linkContainer = overlayContainerElement.querySelectorAll(`.link-secondary`);
            expect(linkContainer[1].textContent === '[详情]').toBeTruthy();
            const openDetailElement = linkContainer[1] as HTMLElement;
            openDetailElement.click();
            fixture.detectChanges();
            const detailContentContainer = overlayContainerElement.querySelectorAll(`.thy-notify-detail`);
            expect(detailContentContainer[0].textContent === 'detail中content是文本').toBeTruthy();
            notifyOpenDetailContainer2[0].remove();
        }));

        it('When the parameters in the detail exist, they should all work', fakeAsync(() => {
            btnElement = fixture.nativeElement.querySelector('.btn-5');
            btnElement.click();
            fixture.detectChanges();
            const notifyOpenDetailContainer3 = overlayContainerElement.querySelectorAll(`.thy-notify-topRight`);
            linkContainer = overlayContainerElement.querySelectorAll(`.link-secondary`);
            expect(linkContainer[2].textContent === '查看').toBeTruthy();
            const openDetailElement = linkContainer[2] as HTMLElement;
            openDetailElement.click();
            fixture.detectChanges();
            expect(componentInstance.count === 1).toBeTruthy();
            const detailContentContainer = overlayContainerElement.querySelectorAll(`.thy-notify-detail`);
            expect(detailContentContainer[0].textContent === '查看的内容').toBeTruthy();
            notifyOpenDetailContainer3[0].remove();
        }));

        it('When detail is Object,it should be description is correct', fakeAsync(() => {
            successElement = fixture.nativeElement.querySelector('.successBtn');
            successElement.click();
            fixture.detectChanges();
            const notifyOpenDetailContainer4 = overlayContainerElement.querySelectorAll(`.thy-notify-topRight`);
            linkContainer = overlayContainerElement.querySelectorAll(`.link-secondary`);
            expect(linkContainer[3].textContent === '[详情]').toBeTruthy();
            const titleContainer = overlayContainerElement.querySelectorAll(`.thy-notify-title`);
            expect(titleContainer[5].textContent === '成功的title').toBeTruthy();
            const openDetailElement = linkContainer[3] as HTMLElement;
            openDetailElement.click();
            fixture.detectChanges();
            const detailContentContainer = overlayContainerElement.querySelectorAll(`.thy-notify-detail`);
            expect(detailContentContainer[0].textContent === '我是成功的detail').toBeTruthy();
            notifyOpenDetailContainer4[0].remove();
        }));

        it('body should has thy-notify-bottomLeft', fakeAsync(() => {
            btnElement = fixture.nativeElement.querySelector('.btn-6');
            btnElement.click();
            fixture.detectChanges();
            const notifyContainer = overlayContainerElement.querySelectorAll('.thy-notify-bottomLeft');
            expect(fetchNotifyNum(notifyContainer) === 1).toBeTruthy();
            expect(notifyContainer.length === 1).toBeTruthy();
        }));

        it('body should has thy-notify-bottomRight', fakeAsync(() => {
            btnElement = fixture.nativeElement.querySelector('.btn-7');
            btnElement.click();
            fixture.detectChanges();
            const notifyContainer = overlayContainerElement.querySelectorAll('.thy-notify-bottomRight');
            expect(fetchNotifyNum(notifyContainer) === 1).toBeTruthy();
            expect(notifyContainer.length === 1).toBeTruthy();
        }));

        it('should remove notify when click close btn', fakeAsync(() => {
            btnElement = fixture.nativeElement.querySelector('.btn-7');
            btnElement.click();
            fixture.detectChanges();
            const notifyContainer = overlayContainerElement.querySelector('.thy-notify-bottomRight');
            const closeBtn = notifyContainer.querySelector('.thy-notify-close');
            dispatchFakeEvent(closeBtn, 'click');
            fixture.detectChanges();
            flush();
            expect(notifyContainer).toBeTruthy();
        }));

        it('should not remove when trigger mouseenter', fakeAsync(() => {
            // normal
            btnElement = fixture.nativeElement.querySelector('.btn-1');
            btnElement.click();
            fixture.detectChanges();
            flush();
            const notifyContainer = overlayContainerElement.querySelector('.thy-notify-bottomRight');
            const notify = notifyContainer.querySelector('.thy-notify') as HTMLElement;
            expect(notify.style.opacity === '1').toBe(true);
            tick(300);
            fixture.detectChanges();
            expect(notify.style.opacity === '0').toBe(true);
            flush();
            // mouseenter
            btnElement = fixture.nativeElement.querySelector('.btn-8');
            btnElement.click();
            fixture.detectChanges();
            tick(100);
            const notify1 = notifyContainer.querySelector('.thy-notify') as HTMLElement;
            expect(notify1.style.opacity === '1').toBe(true);
            dispatchMouseEvent(notify1, 'mouseenter');
            tick(300);
            fixture.detectChanges();
            expect(notify1.style.opacity === '1').toBe(true);
            flush();
        }));
    });
});
