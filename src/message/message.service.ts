import { Overlay } from '@angular/cdk/overlay';
import { Inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { ThyMessageContainerComponent } from './message-container.component';
import { ThyMessageRef } from './message-ref';
import { ThyMessageQueue } from './message-queue.service';
import { ThyGlobalMessageConfig, ThyMessageConfig, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';
import { ThyMessageBaseService } from './base';
import { ComponentTypeOrTemplateRef } from 'ngx-tethys/core';

@Injectable({
    providedIn: 'root'
})
export class ThyMessageService extends ThyMessageBaseService<ThyMessageContainerComponent> {
    private _lastMessageId = 0;

    constructor(
        overlay: Overlay,
        injector: Injector,
        private messageQueue: ThyMessageQueue,
        @Inject(THY_MESSAGE_DEFAULT_CONFIG) private defaultConfig: ThyGlobalMessageConfig
    ) {
        super(overlay, injector, messageQueue);
    }

    /**
     * 打开 success 类型的 Message
     */
    success(content: string | ComponentTypeOrTemplateRef<any>, config?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(config || {}),
            type: 'success',
            content
        });
    }

    /**
     * 打开 error 类型的 Message
     */
    error(content: string | ComponentTypeOrTemplateRef<any>, config?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(config || {}),
            type: 'error',
            content
        });
    }

    /**
     * 打开 info 类型的 Message
     */
    info(content: string | ComponentTypeOrTemplateRef<any>, config?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(config || {}),
            type: 'info',
            content
        });
    }

    /**
     * 打开 warning 类型的 Message
     */
    warning(content: string | ComponentTypeOrTemplateRef<any>, config?: ThyMessageConfig): ThyMessageRef {
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
        this.container = this.createContainer(ThyMessageContainerComponent);

        const messageConfig = this.formatOptions(config);
        const messageRef = new ThyMessageRef(messageConfig);
        this.messageQueue.add(messageRef);
        return messageRef;
    }

    private formatOptions(config: ThyMessageConfig) {
        return Object.assign({ id: String(this._lastMessageId++) }, this.defaultConfig, config);
    }
}
