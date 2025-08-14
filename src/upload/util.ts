import { isString, isArray } from 'ngx-tethys/util';
import { MIME_Map } from './constant';

export function mimeTypeConvert(value: string[] | string): string {
    let inputTypes: string[];
    const acceptTypes: string[] = [];
    if (isArray(value)) {
        inputTypes = value as string[];
    } else if (isString(value)) {
        inputTypes = value.split(',');
    } else {
        inputTypes = [];
    }

    if (inputTypes.length > 0) {
        inputTypes.forEach(n => {
            if (MIME_Map[n]) {
                acceptTypes.push(MIME_Map[n]);
            } else {
                acceptTypes.push(n);
            }
        });
    }
    return acceptTypes.join(',');
}
