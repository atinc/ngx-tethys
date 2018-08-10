import { Constructor } from './constructor';
import { inputValueToBoolean } from '../../util/helpers';

export interface ThyCanDisable {
    thyDisable: boolean;
}

/** Mixin to augment a directive with a `disableRipple` property. */
export function mixinDisable<T extends Constructor<{}>>(base: T)
    : Constructor<ThyCanDisable> & T {
    return class extends base {
        private _thyDisable = false;

        get thyDisable() {
            return this._thyDisable;
        }
        set thyDisable(value: any) {
            this._thyDisable = inputValueToBoolean(value);
        }

        constructor(...args: any[]) { super(...args); }
    };
}

