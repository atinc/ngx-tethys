import { Component, OnInit, TemplateRef, ViewChild, inject as coreInject } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, flush, inject, tick } from '@angular/core/testing';
import { ThyMessageConfig, ThyMessageService, ThyMessageModule } from 'ngx-tethys/message';
import { OverlayContainer } from '@angular/cdk/overlay';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

const DEFAULT_DURATION_TIME = 4500;

@Component({
    template: `
        <button class="close-btn" (click)="closeAllMessage()">close</button>
        <button class="success-btn" (click)="openMessage('success')">success</button>
        <button class="info-btn" (click)="openMessage('info')">info</button>
        <button class="warning-btn" (click)="openMessage('warning')">warning</button>
        <button class="error-btn" (click)="openMessage('error')">error</button>
        <button class="loading-btn" (click)="openMessage('loading')">loading</button>
    `,
    imports: [ThyMessageModule]
})
export class ThyMessageTestComponent implements OnInit {
    messageService = coreInject(ThyMessageService);

    @ViewChild('content') contentTemplate: TemplateRef<any>;

    config: ThyMessageConfig = {
        hostClass: 'test'
    };

    ngOnInit() {}

    openMessage(type: string) {
        this.messageService[type](type, this.config);
    }

    closeAllMessage() {
        this.messageService.remove();
    }
}

describe('ThyMessage', () => {
    let overlayContainer!: OverlayContainer;
    let overlayContainerElement!: HTMLElement;
    let fixture!: ComponentFixture<ThyMessageTestComponent>;
    let componentInstance!: ThyMessageTestComponent;
    let successButton!: HTMLElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyMessageModule],
            providers: [provideHttpClient(), provideNoopAnimations()]
        });
        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();
        TestBed.compileComponents();
    }));

    beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(ThyMessageTestComponent);
        componentInstance = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        successButton = document.querySelector('.success-btn');
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    it(`should add host class correctly`, fakeAsync(() => {
        successButton.click();
        fixture.detectChanges();
        tick();
        const messageElement: HTMLElement = overlayContainerElement.querySelector('.thy-message-container .thy-message');
        expect(messageElement.classList.contains(`test`)).toBeTruthy();
        tick(DEFAULT_DURATION_TIME);
        fixture.detectChanges();
        flush();
    }));

    it(`should show success message correctly`, fakeAsync(() => {
        successButton.click();
        fixture.detectChanges();
        tick();
        const messageElement: HTMLElement = overlayContainerElement.querySelector('.thy-message-container .thy-message');
        expect(messageElement).toBeTruthy();
        expect(messageElement.innerText).toContain('success');
        expect(messageElement.querySelector('.thy-icon-check-circle-fill')).toBeTruthy();
        tick(DEFAULT_DURATION_TIME);
        fixture.detectChanges();
        flush();
    }));

    it(`should show error message correctly`, fakeAsync(() => {
        const button: HTMLElement = document.querySelector('.error-btn');
        button.click();
        fixture.detectChanges();
        tick();
        const messageElement: HTMLElement = overlayContainerElement.querySelector('.thy-message-container .thy-message');
        expect(messageElement).toBeTruthy();
        expect(messageElement.innerText).toContain('error');
        expect(messageElement.querySelector('.thy-icon-close-circle-fill')).toBeTruthy();
        tick(DEFAULT_DURATION_TIME);
        fixture.detectChanges();
        flush();
    }));

    it(`should show info message correctly`, fakeAsync(() => {
        const button: HTMLElement = document.querySelector('.info-btn');
        button.click();
        fixture.detectChanges();
        tick();
        const messageElement: HTMLElement = overlayContainerElement.querySelector('.thy-message-container .thy-message');
        expect(messageElement).toBeTruthy();
        expect(messageElement.innerText).toContain('info');
        expect(messageElement.querySelector('.thy-icon-info-circle-fill')).toBeTruthy();
        tick(DEFAULT_DURATION_TIME);
        fixture.detectChanges();
        flush();
    }));

    it(`should show warning message correctly`, fakeAsync(() => {
        const button: HTMLElement = document.querySelector('.warning-btn');
        button.click();
        fixture.detectChanges();
        tick();
        const messageElement: HTMLElement = overlayContainerElement.querySelector('.thy-message-container .thy-message');
        expect(messageElement).toBeTruthy();
        expect(messageElement.innerText).toContain('warning');
        expect(messageElement.querySelector('.thy-icon-waring-fill')).toBeTruthy();
        tick(DEFAULT_DURATION_TIME);
        fixture.detectChanges();
        flush();
    }));

    it(`should show loading message correctly`, fakeAsync(() => {
        const button: HTMLElement = document.querySelector('.loading-btn');
        button.click();
        fixture.detectChanges();
        tick();
        const messageElement: HTMLElement = overlayContainerElement.querySelector('.thy-message-container .thy-message');
        expect(messageElement).toBeTruthy();
        expect(messageElement.innerText).toContain('loading');
        expect(messageElement.querySelector('.thy-message-icon.loading-icon')).toBeTruthy();
        tick(DEFAULT_DURATION_TIME);
        fixture.detectChanges();
        flush();
    }));

    it('should remove message when click close btn', fakeAsync(() => {
        successButton.click();
        fixture.detectChanges();
        tick();
        const messageElement: HTMLElement = overlayContainerElement.querySelector('.thy-message-container .thy-message');
        const closeBtn = messageElement.querySelector('.thy-message-close');
        dispatchFakeEvent(closeBtn, 'click');
        tick();
        fixture.detectChanges();
        flush();
        const message: HTMLElement = messageElement;
        expect(message.style.opacity).toBe('');
        fixture.detectChanges();
        flush();
    }));

    it(`should maxStack worked correctly`, fakeAsync(() => {
        const maxStack = 8;
        new Array(10).fill(1).forEach(() => successButton.click());
        fixture.detectChanges();
        tick();
        const messageElement = overlayContainerElement.querySelectorAll('.thy-message-container .thy-message');
        expect(messageElement.length).toBe(maxStack);
        tick(DEFAULT_DURATION_TIME);
        fixture.detectChanges();
        flush();
    }));

    it(`should removeAll worked correctly`, fakeAsync(() => {
        const closeButton: HTMLElement = document.querySelector('.close-btn');

        new Array(2).fill(1).forEach(() => successButton.click());
        fixture.detectChanges();
        tick();
        const messageElement = overlayContainerElement.querySelectorAll('.thy-message-container .thy-message');
        expect(messageElement.length).toBe(2);

        closeButton.click();
        fixture.detectChanges();
        tick();
        expect(overlayContainerElement.querySelectorAll('.thy-message-container .thy-message').length).toBe(0);

        tick(DEFAULT_DURATION_TIME);
        fixture.detectChanges();
        flush();
    }));

    it(`should custom pauseOnHover worked`, fakeAsync(() => {
        successButton.click();
        fixture.detectChanges();
        tick();

        const messageElement: HTMLElement = overlayContainerElement.querySelector('.thy-message-container .thy-message');
        dispatchMouseEvent(messageElement, 'mouseenter');
        fixture.detectChanges();
        tick(DEFAULT_DURATION_TIME + 1000);
        expect(messageElement.style.opacity).toBe('1');

        componentInstance.config = {
            pauseOnHover: false
        };
        fixture.detectChanges();
        successButton.click();
        fixture.detectChanges();
        tick();
        const notHasCloseIconMessageElement = overlayContainerElement.querySelectorAll('.thy-message-container .thy-message')[1];
        dispatchMouseEvent(notHasCloseIconMessageElement, 'mouseenter');
        fixture.detectChanges();
        tick(DEFAULT_DURATION_TIME + 1000);
        expect((notHasCloseIconMessageElement as HTMLElement).style.opacity).toBe('');

        tick(DEFAULT_DURATION_TIME);
        fixture.detectChanges();
        flush();
    }));

    it(`should showClose worked`, fakeAsync(() => {
        successButton.click();
        fixture.detectChanges();
        tick();

        const messageElement: HTMLElement = overlayContainerElement.querySelector('.thy-message-container .thy-message');
        expect(messageElement.querySelector('.thy-message-close')).toBeTruthy();

        componentInstance.config = {
            showClose: false
        };
        fixture.detectChanges();
        successButton.click();
        fixture.detectChanges();
        tick();
        const notHasCloseIconMessageElement = overlayContainerElement.querySelectorAll('.thy-message-container .thy-message')[1];
        expect(notHasCloseIconMessageElement.querySelector('.thy-message-close')).toBeFalsy();

        tick(DEFAULT_DURATION_TIME);
        fixture.detectChanges();
        flush();
    }));

    it(`should close by ref`, fakeAsync(() => {
        const ref = componentInstance.messageService.success('test ref', {
            duration: 0
        });
        fixture.detectChanges();
        expect(ref.config.duration).toBe(0);
        expect(overlayContainerElement.querySelector('.thy-message-container .thy-message-success')).toBeTruthy();

        const closeSpy = jasmine.createSpy();
        ref.afterClosed().subscribe(() => {
            closeSpy();
        });
        ref.close();
        fixture.detectChanges();
        expect(closeSpy).toHaveBeenCalled();
        expect(overlayContainerElement.querySelector('.thy-message-container .thy-message-success')).toBeFalsy();
    }));
});
