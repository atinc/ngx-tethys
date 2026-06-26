import { Component, computed, HostBinding, input, Signal, ChangeDetectionStrategy } from '@angular/core';
import { ThyColor } from '../../helpers/color.class';

/**
 * @internal
 */
@Component({
    selector: 'thy-indicator',
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './indicator.component.html'
})
export class ThyIndicator {
    @HostBinding('class.thy-indicator') className = true;

    readonly color = input<ThyColor>();

    readonly backgroundColor: Signal<string> = computed(() => {
        return this.color()?.rgba.toString() || '';
    });
}
