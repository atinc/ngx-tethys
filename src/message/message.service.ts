import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { ThyMessageContainerComponent } from './message-container.component';
import { ThyMessageStateService } from './message-state.service';
import { ThyGlobalMessageConfig, ThyMessageConfig, ThyMessageRef, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

@Injectable({
    providedIn: 'root'
})
export class ThyMessageService {
    private container: ThyMessageContainerComponent;

    private _lastMessageId = 0;

    private messageRefs: ThyMessageRef[] = [];

    constructor(
        private overlay: Overlay,
        private injector: Injector,
        private messageStateService: ThyMessageStateService,
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
    remove(id?: string): void {
        if (this.container) {
            this.messageStateService.remove(id);
            if (!id) {
                this.messageRefs.forEach(messageRef => {
                    messageRef.close();
                });

                this.messageRefs = [];
            } else {
                let messageRef = this.messageRefs.find(item => item.id === id);
                messageRef?.close();
                this.messageRefs = this.messageRefs.filter(item => item.id !== id);
            }
        }
    }

    protected show(option: ThyMessageConfig): ThyMessageRef {
        const messageConfig = this.formatOptions(option);
        this.container = this.withContainer();

        this.messageStateService.add(messageConfig);
        const messageRef = new ThyMessageRef(messageConfig.id);
        if (this.messageRefs.length >= this.defaultConfig.maxStack) {
            const closedRef = this.messageRefs.shift();
            closedRef.close();
        }
        this.messageRefs = [...this.messageRefs, messageRef];
        return messageRef;
    }

    private withContainer(): ThyMessageContainerComponent {
        if (this.container) {
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
