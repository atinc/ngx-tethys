import { ThyMessageRef } from 'ngx-tethys/message';
import { ThyNotifyConfig } from './notify.config';

export class ThyNotifyRef extends ThyMessageRef {
    config: ThyNotifyConfig;

    constructor(config: ThyNotifyConfig) {
        super(config);
    }
}
