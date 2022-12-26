import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThyGlobalMessageConfig, ThyMessageConfig, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

/**
 * 维护已打开 message 列表的 service
 */
@Injectable({
    providedIn: 'root'
})
export class ThyMessageStateService {
    /**
     * 已打开 Message 列表的流
     */
    messages$ = new BehaviorSubject<ThyMessageConfig[]>([]);

    /**
     * 已打开 Message 列表的流
     */
    get messages() {
        return this.messages$.getValue();
    }

    constructor(@Inject(THY_MESSAGE_DEFAULT_CONFIG) private defaultConfig: ThyGlobalMessageConfig) {}

    /**
     * 新增 message
     */
    add(config: ThyMessageConfig) {
        const messages = this.messages$.getValue();
        if (this.messages.length >= this.defaultConfig.maxStack) {
            messages.shift();
        }
        this.messages$.next([...messages, config]);
    }

    /**
     * 删除 message
     * @param id 不传则删除所有
     */
    remove(id?: string) {
        if (!id) {
            this.messages$.next([]);
        } else {
            const message = this.messages$.getValue().filter(item => item.id !== id);
            this.messages$.next(message);
        }
    }
}
