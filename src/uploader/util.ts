import { helpers } from '../util';
import { MIME_Map } from './constant';


export function mimeTypeConvert(value: Array<string> | string) {
    let valueArray: any;
    const _acceptTypeArray: any = [];
    if (helpers.isArray(value)) {
        valueArray = (value as Array<string>);
    } else if (helpers.isString(value)) {
        valueArray = (value as string).split(',');
    } else {
        valueArray = [];
    }

    if (valueArray.length > 0) {
        valueArray.forEach((n: any) => {
            if (MIME_Map[n]) {
                _acceptTypeArray.push(MIME_Map[n]);
            } else {
                console.error('ngx-tethys Error: Uploaded files that do not support extensions.');
            }
        });
    }

    return _acceptTypeArray.join(',');
}
