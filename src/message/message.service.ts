import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ThyMessageContainerComponent } from './message-container.component';
import { ThyGlobalMessageConfig, ThyMessageConfig, ThyMessageRef, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

@Injectable({
    providedIn: 'root'
})
export class ThyMessageService {
    private container: ThyMessageContainerComponent;

    private _lastMessageId = 0;

    /**
     * 已打开 Message 列表
     */
    queue$ = new BehaviorSubject<ThyMessageConfig[]>([]);

    get queue() {
        return this.queue$.getValue();
    }

    constructor(
        private overlay: Overlay,
        private injector: Injector,
        @Inject(THY_MESSAGE_DEFAULT_CONFIG) private defaultConfig: ThyGlobalMessageConfig
    ) {}

    /**
     * 打开 success 类型的 Message
     */
    success(content: string, option?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'success',
            content
        });
    }

    /**
     * 打开 error 类型的 Message
     */
    error(content: string, option?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'error',
            content
        });
    }

    /**
     * 打开 info 类型的 Message
     */
    info(content: string, option?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'info',
            content
        });
    }

    /**
     * 打开 warning 类型的 Message
     */
    warning(content: string, option?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'warning',
            content
        });
    }

    /**
     * 打开 loading 类型的 Message
     */
    loading(content: string, option?: ThyMessageConfig): ThyMessageRef {
        return this.show({
            ...(option || {}),
            type: 'loading',
            content
        });
    }

    /**
     * 移除指定 Message
     */
    remove(id?: string): void {
        if (this.container) {
            const notRemoveItems: ThyMessageConfig[] = [];
            this.queue.forEach(item => {
                if (!id || item.id === id) {
                    item.onClose.next();
                    item.onClose.complete();
                } else {
                    notRemoveItems.push(item);
                }
            });

            this.queue$.next(notRemoveItems);
        }
    }

    protected show(option: ThyMessageConfig): ThyMessageRef {
        const messageData = this.formatOptions(option);
        this.container = this.withContainer();
        this.queue$.next([...(this.queue.length >= this.defaultConfig.maxStack ? this.queue.slice(1) : this.queue), messageData]);
        return messageData;
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

    private formatOptions(option: ThyMessageConfig): ThyMessageConfig {
        const initData = {
            id: String(this._lastMessageId++),
            onClose: new Subject<void>()
        };
        return Object.assign({}, initData, this.defaultConfig, option);
    }
}
