import { Injectable, inject } from '@angular/core';
import { ThyAbstractMessageQueue } from './abstract';
import { ThyMessageRef } from './message-ref';
import { THY_MESSAGE_DEFAULT_CONFIG, THY_MESSAGE_DEFAULT_CONFIG_VALUE } from './message.config';

/**
 * @internal
 */
@Injectable({
    providedIn: 'root'
})
export class ThyMessageQueue extends ThyAbstractMessageQueue<ThyMessageRef> {
    constructor() {
        const defaultConfig = inject(THY_MESSAGE_DEFAULT_CONFIG);

        super({
            ...THY_MESSAGE_DEFAULT_CONFIG_VALUE,
            ...defaultConfig
        });
    }
}
