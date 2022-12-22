import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, flush, inject, tick } from '@angular/core/testing';
import { ThyMessageModule } from '../module';
import { ThyMessageService } from '../message.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyMessageOption } from '../message.config';
import { OverlayContainer } from '@angular/cdk/overlay';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';

const DEFAULT_DURATION_TIME = 4500;

@Component({
    template: `
        <button class="open-btn" (click)="openCustomMessage(option)">Open</button>
        <button class="success-btn" (click)="openMessage('success')">success</button>
        <button class="info-btn" (click)="openMessage('info')">info</button>
        <button class="warning-btn" (click)="openMessage('warning')">warning</button>
        <button class="error-btn" (click)="openMessage('error')">error</button>
        <button class="close-btn" (click)="closeMessage()">Open</button>
    `
})
export class ThyMessageTestComponent implements OnInit {
    @ViewChild('content') contentTemplate: TemplateRef<any>;

    option: ThyMessageOption;

    constructor(private messageService: ThyMessageService) {}

    ngOnInit() {}

    openCustomMessage(options: ThyMessageOption) {
        this.messageService.show(options);
    }

    openMessage(type: string) {
        this.messageService[type](`type is ${type}`, 'some content', { detail: 'this is detail' });
    }

    closeMessage() {
        this.messageService.remove('close');
    }
}

describe('ThyMessage', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyMessageModule, NoopAnimationsModule],
            declarations: [ThyMessageTestComponent],
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
        let fixture: ComponentFixture<ThyMessageTestComponent>;
        let componentInstance: ThyMessageTestComponent;
        let btnElement: HTMLElement;

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(ThyMessageTestComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            btnElement = fixture.nativeElement.querySelector('.open-btn');
        }));
    });
});

function fetchMessageNum(container: NodeListOf<Element>) {
    const notifies = container[0].querySelectorAll(`thy-message`);
    return notifies.length;
}
