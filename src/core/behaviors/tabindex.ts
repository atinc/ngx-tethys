import { coerceNumberProperty } from '@angular/cdk/coercion';

import { Constructor, MixinBase } from './constructor';
import { mixinDisabled, ThyCanDisable } from './disabled';
import { AbstractControlValueAccessor } from './control-value-accessor';

export interface ThyHasTabIndex {
    tabIndex: number;

    defaultTabIndex: number;
}

type HasTabIndexCtor = Constructor<ThyHasTabIndex>;

/** Mixin to augment a directive with a `tabIndex` property. */
export function mixinTabIndex<T extends Constructor<ThyCanDisable>>(base: T, defaultTabIndex = 0): HasTabIndexCtor & T {
    return class extends base implements ThyHasTabIndex {
        private _tabIndex: number = defaultTabIndex;

        defaultTabIndex = defaultTabIndex;

        get tabIndex(): number {
            return this.thyDisabled ? -1 : this._tabIndex;
        }
        set tabIndex(value: number) {
            this._tabIndex = value != null ? coerceNumberProperty(value) : this.defaultTabIndex;
        }

        constructor(...args: any[]) {
            super(...args);
        }
    };
}

export const TabIndexMixinBase: Constructor<ThyHasTabIndex> & Constructor<ThyCanDisable> & typeof MixinBase = mixinTabIndex(
    mixinDisabled(MixinBase)
);

export const _MixinBase: Constructor<ThyHasTabIndex> & Constructor<ThyCanDisable> & typeof AbstractControlValueAccessor = mixinTabIndex(
    mixinDisabled(AbstractControlValueAccessor)
);
