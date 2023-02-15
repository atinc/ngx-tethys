import { isString } from 'ngx-tethys/util';
import { Inject, Injectable, Injector } from '@angular/core';
import { ThyGlobalNotifyConfig, ThyNotifyConfig, THY_NOTIFY_DEFAULT_CONFIG } from './notify.config';
import { Overlay } from '@angular/cdk/overlay';
import { ThyNotifyRef } from './notify-ref';
import { ThyNotifyContainerComponent } from './notify-container.component';
import { ThyNotifyQueue } from './notify-queue.service';
import { ThyAbstractMessageService } from 'ngx-tethys/message';
import { ComponentTypeOrTemplateRef } from 'ngx-tethys/core';

@Injectable({
    providedIn: 'root'
})
export class ThyNotifyService extends ThyAbstractMessageService<ThyNotifyContainerComponent> {
    private _lastNotifyId = 0;

    constructor(
        overlay: Overlay,
        injector: Injector,
        private notifyQueue: ThyNotifyQueue,
        @Inject(THY_NOTIFY_DEFAULT_CONFIG) protected defaultConfig: ThyGlobalNotifyConfig
    ) {
        super(overlay, injector, notifyQueue);
    }

    public show(config: ThyNotifyConfig): ThyNotifyRef {
        this.container = this.createContainer(ThyNotifyContainerComponent);

        const notifyConfig = this.formatOptions(config);
        const notifyRef = new ThyNotifyRef(notifyConfig, this.overlayRef, this.notifyQueue);
        this.notifyQueue.add(notifyRef);
        return notifyRef;
    }

    public success(title?: string, content?: string | ComponentTypeOrTemplateRef<any>, config?: ThyNotifyConfig) {
        return this.show({
            ...(config || {}),
            type: 'success',
            title: title || config?.title || '成功',
            content: content || config?.content
        });
    }

    public info(title?: string, content?: string | ComponentTypeOrTemplateRef<any>, config?: ThyNotifyConfig) {
        return this.show({
            ...(config || {}),
            type: 'info',
            title: title || config?.title || '提示',
            content: content || config?.content
        });
    }

    public warning(title?: string, content?: string | ComponentTypeOrTemplateRef<any>, config?: ThyNotifyConfig) {
        return this.show({
            ...(config || {}),
            type: 'warning',
            title: title || config?.title || '警告',
            content: content || config?.content
        });
    }

    public error(title?: string, content?: string | ComponentTypeOrTemplateRef<any>, config?: ThyNotifyConfig) {
        return this.show({
            ...(config || {}),
            type: 'error',
            title: title || config?.title || '警告',
            content: content || config?.content
        });
    }

    private formatOptions(config: ThyNotifyConfig) {
        if (isString(config.detail)) {
            config = { ...config, detail: { link: '[详情]', content: config.detail as string } };
        }
        return Object.assign({ type: 'blank' }, { id: String(this._lastNotifyId++) }, this.defaultConfig, config);
    }
}
