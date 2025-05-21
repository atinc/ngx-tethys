import { Component, computed, HostBinding, input, Signal } from '@angular/core';
import { ThyColor } from '../../helpers/color.class';

/**
 * @internal
 */
@Component({
    selector: 'thy-indicator',
    templateUrl: './indicator.component.html'
})
export class ThyIndicator {
    @HostBinding('class.thy-indicator') className = true;

    readonly color = input<ThyColor>();

    readonly backgroundColor: Signal<string> = computed(() => {
        return this.color()?.rgba.toString() || '';
    });
}
