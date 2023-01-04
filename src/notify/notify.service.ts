import { isString } from 'ngx-tethys/util';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector, OnDestroy } from '@angular/core';
import { ThyGlobalNotifyConfig, ThyNotifyConfig, THY_NOTIFY_DEFAULT_CONFIG } from './notify.config';
import { Overlay } from '@angular/cdk/overlay';
import { ThyNotifyRef } from './notify-ref';
import { ThyNotifyContainerComponent } from './notify-container.component';
import { ThyNotifyQueue } from './notify-queue.service';

@Injectable({
    providedIn: 'root'
})
export class ThyNotifyService implements OnDestroy {
    private _lastNotifyId = 0;

    container: ThyNotifyContainerComponent;

    constructor(
        protected overlay: Overlay,
        private notifyQueue: ThyNotifyQueue,
        private injector: Injector,
        @Inject(THY_NOTIFY_DEFAULT_CONFIG) protected defaultConfig: ThyGlobalNotifyConfig
    ) {}

    private createContainer(): ThyNotifyContainerComponent {
        if (this.container) {
            return this.container;
        }

        const overlayRef = this.overlay.create({
            hasBackdrop: false,
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            positionStrategy: this.overlay.position().global()
        });
        const componentPortal = new ComponentPortal(ThyNotifyContainerComponent, null, this.injector);
        const componentRef = overlayRef.attach(componentPortal);

        return componentRef.instance;
    }

    public show(config: ThyNotifyConfig): ThyNotifyRef {
        this.container = this.createContainer();

        const notifyConfig = this.formatOptions(config);
        const notifyRef = new ThyNotifyRef(notifyConfig);
        this.notifyQueue.add(notifyRef);
        return notifyRef;
    }

    public success(title?: string, content?: string, config?: ThyNotifyConfig) {
        return this.show({
            ...(config || {}),
            type: 'success',
            title: title || config?.title || '成功',
            content: content || config?.content
        });
    }

    public info(title?: string, content?: string, config?: ThyNotifyConfig) {
        return this.show({
            ...(config || {}),
            type: 'info',
            title: title || config?.title || '提示',
            content: content || config?.content
        });
    }

    public warning(title?: string, content?: string, config?: ThyNotifyConfig) {
        return this.show({
            ...(config || {}),
            type: 'warning',
            title: title || config?.title || '警告',
            content: content || config?.content
        });
    }

    public error(title?: string, content?: string, config?: ThyNotifyConfig) {
        return this.show({
            ...(config || {}),
            type: 'error',
            title: title || config?.title || '警告',
            content: content || config?.content
        });
    }

    public remove(id: string) {
        this.notifyQueue.remove(id);
    }

    private formatOptions(config: ThyNotifyConfig) {
        if (isString(config.detail)) {
            config = { ...config, detail: { link: '[详情]', content: config.detail as string } };
        }
        return Object.assign({}, { id: String(this._lastNotifyId++) }, this.defaultConfig, config);
    }

    ngOnDestroy(): void {}
}
