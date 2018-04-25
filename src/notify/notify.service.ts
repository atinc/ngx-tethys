import { Injectable, TemplateRef } from '@angular/core';
import { ThyNotifyOption } from './notify-option.interface';
import { ThyNotifyContainerComponent } from './notify.container.component';
import { ComponentLoaderFactory, ComponentLoader } from 'ngx-bootstrap/component-loader';
import { Subject } from 'rxjs';

const NOTIFY_OPTION_DEFAULT = {
    duration: 4500,
    pauseOnHover: true,
    maxStack: 8
};

@Injectable()
export class ThyNotifyService {

    notifyQueue$: Subject<any> = new Subject();

    private _notifyQueue: ThyNotifyOption[] = [];

    private _option: ThyNotifyOption;

    private _lastNotifyId = 0;

    private _notifyLoader: ComponentLoader<ThyNotifyContainerComponent>;


    constructor(
        private clf: ComponentLoaderFactory
    ) { }

    show(option: ThyNotifyOption) {
        this._loadNotifyContainerComponent();
        if (this._notifyQueue.length > NOTIFY_OPTION_DEFAULT.maxStack) {
            this._notifyQueue.shift();
        }
        this._notifyQueue.push(this._formatOption(option));
        this.notifyQueue$.next(this._notifyQueue);
    }

    success(title?: string, content?: string, detail?: string) {
        this.show({
            type: 'success',
            title: title || '成功',
            content: content,
            detail: detail,
        });
    }

    info(title?: string, content?: string, detail?: string) {
        this.show({
            type: 'info',
            title: title || '提示',
            content: content,
            detail: detail,
        });
    }

    warning(title?: string, content?: string, detail?: string) {
        this.show({
            type: 'warning',
            title: title || '警告',
            content: content,
            detail: detail,
        });
    }

    error(title?: string, content?: string, detail?: string) {
        this.show({
            type: 'error',
            title: title || '错误',
            content: content,
            detail: detail,
        });
    }

    removeItemById(id: number) {
        this._notifyQueue = this._notifyQueue.filter(item => {
            return item.id !== id;
        });
        this.notifyQueue$.next(this._notifyQueue);
    }

    private _loadNotifyContainerComponent() {
        if (!this._notifyLoader) {
            this._notifyLoader = this.clf.createLoader<ThyNotifyContainerComponent>(
                null,
                null,
                null
            );
            this._notifyLoader
                .attach(ThyNotifyContainerComponent)
                .to('body')
                .show({
                    initialState: {
                        notifyQueue$: this.notifyQueue$
                    }
                });
        }
    }

    private _formatOption(option: ThyNotifyOption) {
        return Object.assign(
            {},
            NOTIFY_OPTION_DEFAULT,
            { id: this._lastNotifyId++ },
            option
        );
    }
}
