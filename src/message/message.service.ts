import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { ThyMessageContainerComponent } from './message-container.component';
import { ThyMessageRef } from './message-ref';
import { ThyMessageQueue } from './message-queue.service';
import { ThyGlobalMessageConfig, ThyMessageConfig, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

@Injectable({
    providedIn: 'root'
})
export class ThyMessageService {
    private container: ThyMessageContainerComponent;

    private _lastMessageId = 0;

    constructor(
        private overlay: Overlay,
        private injector: Injector,
        private messageQueue: ThyMessageQueue,
        @Inject(THY_MESSAGE_DEFAULT_CONFIG) private defaultConfig: ThyGlobalMessageConfig
    ) {}

    /**
     * 打开 success 类型的 Message
     */
    success(content: string | TemplateRef<any>, option?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'success',
            content
        });
    }

    /**
     * 打开 error 类型的 Message
     */
    error(content: string | TemplateRef<any>, option?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'error',
            content
        });
    }

    /**
     * 打开 info 类型的 Message
     */
    info(content: string | TemplateRef<any>, option?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'info',
            content
        });
    }

    /**
     * 打开 warning 类型的 Message
     */
    warning(content: string | TemplateRef<any>, option?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'warning',
            content
        });
    }

    /**
     * 打开 loading 类型的 Message
     */
    loading(content: string | TemplateRef<any>, option?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'loading',
            content
        });
    }

    /**
     * 移除指定 Message
     * @param id 不传则移除所有
     */
    remove(id?: string) {
        this.messageQueue.remove(id);
    }

    protected show(option: ThyMessageConfig): ThyMessageRef {
        this.container = this.createContainer();

        const messageConfig = this.formatOptions(option);
        const messageRef = new ThyMessageRef(messageConfig);
        this.messageQueue.add(messageRef);
        return messageRef;
    }

    private createContainer(): ThyMessageContainerComponent {
        if (this.container) {
            this.container.toOverlayTop();
            return this.container;
        }

        const overlayRef = this.overlay.create({
            hasBackdrop: false,
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            positionStrategy: this.overlay.position().global()
        });
        const componentPortal = new ComponentPortal(ThyMessageContainerComponent, null, this.injector);
        const componentRef = overlayRef.attach(componentPortal);
        return componentRef.instance;
    }

    private formatOptions(option: ThyMessageConfig) {
        return Object.assign({ id: String(this._lastMessageId++) }, this.defaultConfig, option);
    }
}
