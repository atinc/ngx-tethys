import { Pipe, PipeTransform } from '@angular/core';
import { helpers } from 'ngx-tethys/util';

// @Pipe({ name: 'thyNotifyDetailIsString' })
// export class ThyNotifyDetailIsString implements PipeTransform {
//     constructor() {}
//     transform(detail: any) {
//         return helpers.isString(detail);
//     }
// }

@Pipe({ name: 'thyNotifyDetailIsObject' })
export class ThyNotifyDetailIsObject implements PipeTransform {
    constructor() {}
    transform(detail: any) {
        return helpers.isObject(detail);
    }
}

// @Pipe({ name: 'thyNotifyDetailIsFunction' })
// export class ThyNotifyDetailIsFunction implements PipeTransform {
//     constructor() {}
//     transform(detail: any) {
//         return helpers.isFunction(detail);
//     }
// }

export const NotifyPipes = [ThyNotifyDetailIsObject];
