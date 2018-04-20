import { Injectable, TemplateRef } from '@angular/core';
import { ThyNotifyOption } from './notify-option.interface';

const NOTIFY_OPTION_DEFAULT = {
    duration: 4500,
    pauseOnHover: true,
    maxStack: 8
};

@Injectable()
export class ThyNotifyService {

    notifyQueue: ThyNotifyOption[] = [];

    private _option: ThyNotifyOption;

    private _lastNotifyId = 0;

    constructor(
    ) { }

    show(option: ThyNotifyOption) {
        if (this.notifyQueue.length > NOTIFY_OPTION_DEFAULT.maxStack) {
            this.notifyQueue.shift();
        }
        this.notifyQueue.push(this._formatOption(option));
    }

    removeItemById(id: number) {
        this.notifyQueue = this.notifyQueue.filter(item => {
            return item.id !== id;
        });
        console.log(this.notifyQueue);
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
