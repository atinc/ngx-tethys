import { isArray, isNumber } from 'ngx-tethys/util';

export function isPositionDataType(target: any): target is [number, number] {
    if (isArray(target)) {
        if (target.length !== 2) {
            return false;
        }
        if (isNumber(target[0]) && isNumber(target[1])) {
            return true;
        }
        return false;
    }
    return false;
}
