import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { ThyMessageContainerComponent } from './message-container.component';
import { ThyMessageStore } from './message-queue.store';
import { ThyMessageConfig, ThyMessageOption, ThyMessageRef, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

@Injectable({
    providedIn: 'root'
})
export class ThyMessageService {
    private container: ThyMessageContainerComponent;

    private _lastMessageId = 0;

    constructor(
        private overlay: Overlay,
        private injector: Injector,
        private messageStore: ThyMessageStore,
        @Inject(THY_MESSAGE_DEFAULT_CONFIG) private defaultConfig: ThyMessageConfig
    ) {}

    success(content: string, option?: ThyMessageOption): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'success',
            content
        });
    }

    error(content: string, option?: ThyMessageOption): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'error',
            content
        });
    }

    info(content: string, option?: ThyMessageOption): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'info',
            content
        });
    }

    warning(content: string, option?: ThyMessageOption): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'warning',
            content
        });
    }

    loading(content: string, option?: ThyMessageOption): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'loading',
            content
        });
    }

    remove(id?: string): void {
        if (this.container) {
            this.messageStore.remove(id);
        }
    }

    show(option: ThyMessageOption): ThyMessageRef {
        const messageData = this.formatOptions(option);
        this.container = this.withContainer();
        this.messageStore.add(messageData);
        return messageData;
    }

    private withContainer(): ThyMessageContainerComponent {
        if (this.container) {
            return this.container;
        }

        const overlayRef = this.overlay.create({
            hasBackdrop: false,
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            positionStrategy: this.overlay
                .position()
                .global()
                .top('20')
        });
        const componentPortal = new ComponentPortal(ThyMessageContainerComponent, null, this.injector);
        const componentRef = overlayRef.attach(componentPortal);

        return componentRef.instance;
    }

    private formatOptions(option: ThyMessageOption): ThyMessageOption {
        const initData = {
            id: String(this._lastMessageId++),
            onClose: new Subject<void>()
        };
        return Object.assign({}, initData, this.defaultConfig, option);
    }
}
