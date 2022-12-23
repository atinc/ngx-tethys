import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { coerceCssPixelValue } from 'ngx-tethys/util';
import { Subject } from 'rxjs';
import { ThyGlobalMessageConfig, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';
import { ThyMessageService } from './message.service';

/**
 * @internal
 */
@Component({
    selector: 'thy-message-container',
    template: `
        <thy-message *ngFor="let message of service.queue$ | async" [thyOption]="message"></thy-message>
    `,
    host: {
        class: 'thy-message-container'
    }
})
export class ThyMessageContainerComponent implements OnInit, OnDestroy {
    @HostBinding('style.top') private top: string;

    readonly destroy$ = new Subject<void>();

    constructor(public service: ThyMessageService, @Inject(THY_MESSAGE_DEFAULT_CONFIG) defaultConfig: ThyGlobalMessageConfig) {
        this.top = coerceCssPixelValue(defaultConfig.offset);
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
