import { Inject, Injectable } from '@angular/core';
import { ThyAbstractMessageQueue } from './abstract';
import { ThyMessageRef } from './message-ref';
import { ThyGlobalMessageConfig, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

/**
 * @internal
 */
@Injectable({
    providedIn: 'root'
})
export class ThyMessageQueue extends ThyAbstractMessageQueue<ThyMessageRef> {
    constructor(@Inject(THY_MESSAGE_DEFAULT_CONFIG) defaultConfig: ThyGlobalMessageConfig) {
        super(defaultConfig);
    }
}
