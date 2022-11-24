import { Component, OnInit } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, flush, inject, tick } from '@angular/core/testing';
import { ThyMessageModule } from '../module';
import { ThyMessageService } from '../message.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyMessageConfig, THY_NOTIFY_DEFAULT_OPTIONS } from '../message.config';
import { OverlayContainer } from '@angular/cdk/overlay';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';

//#region test component
const DEFAULT_DURATION_TIME = 4500;

@Component({
    template: `
        <button class="open-btn" (click)="openComponentMessage(option)">Open</button>
        <button class="success-btn" (click)="openComponentSuccessMessage('success')">success</button>
        <button class="info-btn" (click)="openComponentSuccessMessage('info')">info</button>
        <button class="warning-btn" (click)="openComponentSuccessMessage('warning')">warning</button>
        <button class="error-btn" (click)="openComponentSuccessMessage('error')">error</button>
        <button class="close-btn" (click)="closeMessage()">Open</button>
    `
})
export class ThyMessageBasicComponent implements OnInit {
    option: ThyMessageConfig;

    constructor(private messageService: ThyMessageService) {}

    ngOnInit() {}

    openComponentMessage(options: ThyMessageConfig) {
        this.messageService.show(options);
    }

    openComponentSuccessMessage(type: string) {
        this.messageService[type](`type is ${type}`, 'some content', { detail: 'this is detail' });
    }

    closeMessage() {
        // create message with id is close
        this.messageService.removeMessageById('close');
    }
}

describe('ThyMessage', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyMessageModule, NoopAnimationsModule],
            declarations: [ThyMessageBasicComponent],
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
        let fixture: ComponentFixture<ThyMessageBasicComponent>;
        let componentInstance: ThyMessageBasicComponent;
        let btnElement: HTMLElement;
        let messageContainer: NodeListOf<Element>, messageTopLeftContainer: NodeListOf<Element>;

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(ThyMessageBasicComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            btnElement = fixture.nativeElement.querySelector('.open-btn');
        }));

        it('should has thy-message-container and default is topRight', fakeAsync(() => {
            componentInstance.option = {
                title: 'ngx tethys message'
            };
            fixture.detectChanges();
            flush();
            btnElement.click();
            fixture.detectChanges();
            tick();

            messageContainer = overlayContainerElement.querySelectorAll('.thy-message-topRight');
            expect(fetchMessageNum(messageContainer) === 1).toBeTruthy();
            expect(messageContainer.length === 1).toBeTruthy();
            btnElement.click();
            fixture.detectChanges();
            expect(fetchMessageNum(messageContainer) === 2).toBeTruthy();
            expect(messageContainer.length === 1).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should has thy-message-topLeft when set placement is topLeft', fakeAsync(() => {
            componentInstance.option = {
                title: 'ngx tethys message'
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();

            messageTopLeftContainer = overlayContainerElement.querySelectorAll('.thy-message-topLeft');
            expect(fetchMessageNum(messageTopLeftContainer) === 1).toBeTruthy();
            expect(messageTopLeftContainer.length === 1).toBeTruthy();
            btnElement.click();
            fixture.detectChanges();
            expect(fetchMessageNum(messageTopLeftContainer) === 2).toBeTruthy();
            expect(messageTopLeftContainer.length === 1).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should auto disappear when not set duration', fakeAsync(() => {
            componentInstance.option = {
                title: 'ngx tethys message'
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const messageContainer = overlayContainerElement.querySelector('.thy-message-topRight');
            const message = messageContainer.querySelector('.thy-message') as HTMLElement;
            expect(message.style.opacity === '1').toBe(true);
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
            expect(message.style.opacity === '0').toBe(true);
        }));

        it('should not auto disappear when duration is 0', fakeAsync(() => {
            componentInstance.option = {
                title: 'ngx tethys message',
                duration: 0
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const messageContainer = overlayContainerElement.querySelector('.thy-message-topRight');
            const message = messageContainer.querySelector('.thy-message') as HTMLElement;
            expect(message.style.opacity === '1').toBe(true);
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
            expect(message.style.opacity === '0').toBe(false);
            const closeBtn = messageContainer.querySelector('.thy-message-close');
            dispatchFakeEvent(closeBtn, 'click');
            fixture.detectChanges();
            flush();
        }));

        it('When detail is an object, it should be a clickable link', fakeAsync(() => {
            const actionSpy = jasmine.createSpy('inside event');
            const detail = {
                link: 'Preview',
                content: 'Preview Content'
            };
            componentInstance.option = {
                type: 'info',
                title: 'ngx tethys message',
                content: 'ngx tethys message content',
                detail: {
                    ...detail,
                    action: () => {
                        actionSpy();
                    }
                }
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const messageContainer = overlayContainerElement.querySelector(`.thy-message-topRight`);
            const linkContainer: HTMLElement = messageContainer.querySelector(`.link-secondary`);
            expect(linkContainer.textContent).toBe(detail.link);
            linkContainer.click();
            fixture.detectChanges();
            expect(actionSpy).toHaveBeenCalled();
            const detailContentContainer = messageContainer.querySelector(`.thy-message-detail`);
            expect(detailContentContainer.textContent).toBe(detail.content);
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('When detail is string, detail text should be displayed', fakeAsync(() => {
            const detailText = 'ngx tethys message detail content';
            componentInstance.option = {
                type: 'warning',
                title: 'Warning',
                content: 'Something is wrong',
                detail: detailText
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const messageContainer = overlayContainerElement.querySelector(`.thy-message-topRight`);
            const linkContainer: HTMLElement = messageContainer.querySelector(`.link-secondary`);
            expect(linkContainer.textContent).toEqual('[详情]');
            linkContainer.click();
            fixture.detectChanges();
            const detailContentContainer = messageContainer.querySelector(`.thy-message-detail`);
            expect(detailContentContainer.textContent).toBe(detailText);
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should show error type when config.type is error', fakeAsync(() => {
            componentInstance.option = {
                type: 'error',
                title: 'Error'
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const messageContainer: HTMLElement = overlayContainerElement.querySelector(`.thy-message-topRight`);
            const message = messageContainer.querySelector('.thy-message');
            expect(message.classList.contains('thy-message-error')).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should show success type when invoke success method', fakeAsync(() => {
            const typeElement = fixture.nativeElement.querySelector('.success-btn');
            typeElement.click();
            fixture.detectChanges();
            tick();
            const messageContainer: HTMLElement = overlayContainerElement.querySelector(`.thy-message-topRight`);
            const message = messageContainer.querySelector('.thy-message');
            expect(message.classList.contains('thy-message-success')).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should show info type when invoke info method', fakeAsync(() => {
            const typeElement = fixture.nativeElement.querySelector('.info-btn');
            typeElement.click();
            fixture.detectChanges();
            tick();
            const messageContainer: HTMLElement = overlayContainerElement.querySelector(`.thy-message-topRight`);
            const message = messageContainer.querySelector('.thy-message');
            expect(message.classList.contains('thy-message-info')).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should show warning type when invoke warning method', fakeAsync(() => {
            const typeElement = fixture.nativeElement.querySelector('.warning-btn');
            typeElement.click();
            fixture.detectChanges();
            tick();
            const messageContainer: HTMLElement = overlayContainerElement.querySelector(`.thy-message-topRight`);
            const message = messageContainer.querySelector('.thy-message');
            expect(message.classList.contains('thy-message-warning')).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should show error type when invoke error method', fakeAsync(() => {
            const typeElement = fixture.nativeElement.querySelector('.error-btn');
            typeElement.click();
            fixture.detectChanges();
            tick();
            const messageContainer: HTMLElement = overlayContainerElement.querySelector(`.thy-message-topRight`);
            const message = messageContainer.querySelector('.thy-message');
            expect(message.classList.contains('thy-message-error')).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should remove message when click close btn', fakeAsync(() => {
            componentInstance.option = {
                title: 'ngx tethys message'
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const messageContainer = overlayContainerElement.querySelector('.thy-message-topRight');
            const closeBtn = messageContainer.querySelector('.thy-message-close');
            dispatchFakeEvent(closeBtn, 'click');
            tick();
            fixture.detectChanges();
            flush();
            const message: HTMLElement = messageContainer.querySelector('.thy-message');
            expect(message.style.opacity).toBe('0');
            fixture.detectChanges();
            flush();
        }));

        it('should close message when invoke close method', fakeAsync(() => {
            componentInstance.option = {
                id: 'close',
                title: 'Close Message'
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const messageContainer = overlayContainerElement.querySelector('.thy-message-topRight');
            const message = messageContainer.querySelector('.thy-message') as HTMLElement;
            expect(message.style.opacity).toBe('1');
            const closeBtn = fixture.nativeElement.querySelector('.close-btn');
            closeBtn.click();
            fixture.detectChanges();
            flush();
            expect(messageContainer.querySelector('.thy-message')).toBeNull();
        }));

        it('should not remove when trigger mouseenter', fakeAsync(() => {
            componentInstance.option = {
                title: 'ngx tethys message',
                pauseOnHover: true
            };
            fixture.detectChanges();
            // mouseenter
            btnElement.click();
            fixture.detectChanges();
            tick();
            const messageContainer = overlayContainerElement.querySelector('.thy-message-topRight');

            const message = messageContainer.querySelector('.thy-message') as HTMLElement;
            expect(message.style.opacity).toBe('1');
            dispatchMouseEvent(message, 'mouseenter');
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            expect(message.style.opacity === '0').toBeFalsy();
            flush();
        }));
    });
});

describe('ThyMessage with provider', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyMessageModule, NoopAnimationsModule],
            declarations: [ThyMessageBasicComponent],
            providers: [
                {
                    provide: THY_NOTIFY_DEFAULT_OPTIONS,
                    useValue: {
                        placement: 'bottomLeft'
                    }
                }
            ]
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
        let fixture: ComponentFixture<ThyMessageBasicComponent>;
        let componentInstance: ThyMessageBasicComponent;
        let btnElement: HTMLElement;

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(ThyMessageBasicComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            btnElement = fixture.nativeElement.querySelector('.open-btn');
        }));

        it('should has thy-message-bottomLeft', fakeAsync(() => {
            // or can test config with invoke function
            componentInstance.option = {
                title: 'ngx tethys message'
            };
            btnElement.click();
            fixture.detectChanges();
            flush();

            const messageContainer = overlayContainerElement.querySelector('.thy-message-bottomLeft');
            const message = messageContainer.querySelector('.thy-message') as HTMLElement;
            expect(message.style.opacity === '1').toBe(true);
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            expect(message.style.opacity === '0').toBe(true);
            flush();
        }));
    });
});

function fetchMessageNum(container: NodeListOf<Element>) {
    const notifies = container[0].querySelectorAll(`thy-message`);
    return notifies.length;
}
