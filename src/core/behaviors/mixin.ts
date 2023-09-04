import { Constructor, MixinBase } from './constructor';
import { AbstractControlValueAccessor } from './control-value-accessor';
import { ThyCanDisable, mixinDisabled } from './disabled';
import { ThyHasTabIndex, mixinTabIndex } from './tabindex';
import { ThyUnsubscribe, mixinUnsubscribe } from './unsubscribe';

export const TabIndexDisabledControlValueAccessorMixin: Constructor<ThyHasTabIndex> &
    Constructor<ThyCanDisable> &
    typeof AbstractControlValueAccessor = mixinTabIndex(mixinDisabled(AbstractControlValueAccessor));

export const UnsubscribeMixin: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);
