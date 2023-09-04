import { Constructor } from './constructor';
import { AbstractControlValueAccessor } from './control-value-accessor';
import { ThyCanDisable, mixinDisabled } from './disabled';
import { ThyHasTabIndex, mixinTabIndex } from './tabindex';

export const TabIndexDisabledControlValueAccessorMixin: Constructor<ThyHasTabIndex> &
    Constructor<ThyCanDisable> &
    typeof AbstractControlValueAccessor = mixinTabIndex(mixinDisabled(AbstractControlValueAccessor));
