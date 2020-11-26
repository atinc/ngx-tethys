import { Constructor } from './constructor';
import { coerceBooleanProperty } from 'ngx-tethys/util/helpers';

export interface ThyCanDisable {
    thyDisabled: boolean;
}

export type ThyCanDisableCtor = Constructor<ThyCanDisable>;

/** Mixin to augment a directive with a `disable` property. */
export function mixinDisabled<T extends Constructor<{}>>(base: T): ThyCanDisableCtor & T {
    return class extends base {
        private _thyDisabled = false;

        get thyDisabled() {
            return this._thyDisabled;
        }

        set thyDisabled(value: any) {
            this._thyDisabled = coerceBooleanProperty(value);
        }

        constructor(...args: any[]) {
            super(...args);
        }
    };
}
