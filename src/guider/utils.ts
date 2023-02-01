import { SafeAny } from 'ngx-tethys/types';
import { isArray, isNumber, isObject } from 'ngx-tethys/util';

export function isPositionDataType(target: any): target is { x: number; y: number } {
    if (isObject(target) && !isArray(target)) {
        if (isNumber((target as SafeAny).x) && isNumber((target as SafeAny).y)) {
            return true;
        }
    }
    return false;
}
