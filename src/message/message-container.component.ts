import { Component, HostBinding, Inject } from '@angular/core';
import { coerceCssPixelValue } from 'ngx-tethys/util';
import { ThyMessageStateService } from './message-state.service';
import { ThyGlobalMessageConfig, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

/**
 * @internal
 */
@Component({
    selector: 'thy-message-container',
    template: `
        <thy-message *ngFor="let message of messageStateService.messages$ | async" [thyOption]="message"></thy-message>
    `,
    host: {
        class: 'thy-message-container'
    }
})
export class ThyMessageContainerComponent {
    @HostBinding('style.top') private top: string;

    constructor(
        public messageStateService: ThyMessageStateService,
        @Inject(THY_MESSAGE_DEFAULT_CONFIG) defaultConfig: ThyGlobalMessageConfig
    ) {
        this.top = coerceCssPixelValue(defaultConfig.offset);
    }
}
