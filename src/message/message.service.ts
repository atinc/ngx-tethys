import { Overlay } from '@angular/cdk/overlay';
import { Inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { ThyMessageContainer } from './message-container.component';
import { ThyMessageRef } from './message-ref';
import { ThyMessageQueue } from './message-queue.service';
import { ThyGlobalMessageConfig, ThyMessageConfig, THY_MESSAGE_DEFAULT_CONFIG, THY_MESSAGE_DEFAULT_CONFIG_VALUE } from './message.config';
import { ThyAbstractMessageService } from './abstract';

@Injectable({
    providedIn: 'root'
})
export class ThyMessageService extends ThyAbstractMessageService<ThyMessageContainer> {
    private _lastMessageId = 0;

    private defaultConfig: ThyGlobalMessageConfig;

    constructor(
        overlay: Overlay,
        injector: Injector,
        private messageQueue: ThyMessageQueue,
        @Inject(THY_MESSAGE_DEFAULT_CONFIG) config: ThyGlobalMessageConfig
    ) {
        super(overlay, injector, messageQueue);
        this.defaultConfig = {
            ...THY_MESSAGE_DEFAULT_CONFIG_VALUE,
            ...config
        };
    }

    /**
     * 打开 success 类型的 Message
     */
    success(content: string | TemplateRef<any>, config?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(config || {}),
            type: 'success',
            content
        });
    }

    /**
     * 打开 error 类型的 Message
     */
    error(content: string | TemplateRef<any>, config?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(config || {}),
            type: 'error',
            content
        });
    }

    /**
     * 打开 info 类型的 Message
     */
    info(content: string | TemplateRef<any>, config?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(config || {}),
            type: 'info',
            content
        });
    }

    /**
     * 打开 warning 类型的 Message
     */
    warning(content: string | TemplateRef<any>, config?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(config || {}),
            type: 'warning',
            content
        });
    }

    /**
     * 打开 loading 类型的 Message
     */
    loading(content: string | TemplateRef<any>, config?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(config || {}),
            type: 'loading',
            content
        });
    }

    protected show(config: ThyMessageConfig): ThyMessageRef {
        this.container = this.createContainer(ThyMessageContainer);

        const messageConfig = this.formatOptions(config);
        const messageRef = new ThyMessageRef(messageConfig, this.overlayRef, this.messageQueue);
        this.messageQueue.add(messageRef);
        return messageRef;
    }

    private formatOptions(config: ThyMessageConfig) {
        return Object.assign({ id: String(this._lastMessageId++) }, this.defaultConfig, config);
    }
}
