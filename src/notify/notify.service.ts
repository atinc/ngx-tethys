import { isString } from 'ngx-tethys/util';
import { Injectable, Injector, Signal, inject } from '@angular/core';
import { ThyGlobalNotifyConfig, ThyNotifyConfig, THY_NOTIFY_DEFAULT_CONFIG, THY_NOTIFY_DEFAULT_CONFIG_VALUE } from './notify.config';
import { Overlay } from '@angular/cdk/overlay';
import { ThyNotifyRef } from './notify-ref';
import { ThyNotifyContainer } from './notify-container.component';
import { ThyNotifyQueue } from './notify-queue.service';
import { ThyAbstractMessageService } from 'ngx-tethys/message';
import { ComponentTypeOrTemplateRef } from 'ngx-tethys/core';
import { injectLocale, ThyNotifyLocale } from 'ngx-tethys/i18n';

/**
 * @order 20
 */
@Injectable({
    providedIn: 'root'
})
export class ThyNotifyService extends ThyAbstractMessageService<ThyNotifyContainer> {
    private notifyQueue: ThyNotifyQueue;
    protected config = inject(THY_NOTIFY_DEFAULT_CONFIG);
    public locale: Signal<ThyNotifyLocale> = injectLocale('notify');

    private _lastNotifyId = 0;

    private defaultConfig: ThyGlobalNotifyConfig;

    constructor() {
        const overlay = inject(Overlay);
        const injector = inject(Injector);
        const notifyQueue = inject(ThyNotifyQueue);

        super(overlay, injector, notifyQueue);
        this.notifyQueue = notifyQueue;
        const config = this.config;

        this.defaultConfig = {
            ...THY_NOTIFY_DEFAULT_CONFIG_VALUE,
            ...config
        };
    }

    /**
     * 打开自定义配置的 Notify
     */
    public show(config: ThyNotifyConfig): ThyNotifyRef {
        this.container = this.createContainer(ThyNotifyContainer);

        const notifyConfig = this.formatOptions(config);
        const notifyRef = new ThyNotifyRef(notifyConfig, this.overlayRef, this.notifyQueue);
        this.notifyQueue.add(notifyRef);
        return notifyRef;
    }

    /**
     * 打开类型为"success"的 Notify
     */
    public success(title?: string, content?: string | ComponentTypeOrTemplateRef<any>, config?: ThyNotifyConfig) {
        return this.show({
            ...(config || {}),
            type: 'success',
            title: title || config?.title || this.locale().success,
            content: content || config?.content
        });
    }

    /**
     * 打开类型为"info"的 Notify
     */
    public info(title?: string, content?: string | ComponentTypeOrTemplateRef<any>, config?: ThyNotifyConfig) {
        return this.show({
            ...(config || {}),
            type: 'info',
            title: title || config?.title || this.locale().info,
            content: content || config?.content
        });
    }

    /**
     * 打开类型为"warning"的 Notify
     */
    public warning(title?: string, content?: string | ComponentTypeOrTemplateRef<any>, config?: ThyNotifyConfig) {
        return this.show({
            ...(config || {}),
            type: 'warning',
            title: title || config?.title || this.locale().warning,
            content: content || config?.content
        });
    }

    /**
     * 打开类型为"error"的 Notify
     */
    public error(title?: string, content?: string | ComponentTypeOrTemplateRef<any>, config?: ThyNotifyConfig) {
        return this.show({
            ...(config || {}),
            type: 'error',
            title: title || config?.title || this.locale().error,
            content: content || config?.content
        });
    }

    private formatOptions(config: ThyNotifyConfig) {
        if (isString(config.detail)) {
            config = { ...config, detail: { link: `[${this.locale().detail}]`, content: config.detail as string } };
        }
        return Object.assign({ type: 'blank' }, { id: String(this._lastNotifyId++) }, this.defaultConfig, config);
    }
}
