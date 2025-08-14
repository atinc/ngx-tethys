import { Component, effect, HostBinding, input, OnInit, output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInputDirective, ThyInputGroup } from 'ngx-tethys/input';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { ThyEnterDirective } from 'ngx-tethys/shared';
import { ThyColor } from '../../helpers/color.class';

/**
 * @internal
 */
@Component({
    selector: 'thy-color-inputs',
    templateUrl: './inputs.component.html',
    imports: [ThyInputDirective, FormsModule, ThyEnterDirective, ThyInputNumber, ThyInputGroup]
})
export class ThyColorInputs implements OnInit {
    @HostBinding('class.thy-color-inputs') className = true;

    readonly color = input<ThyColor>();

    readonly colorChange = output<ThyColor>();

    readonly hex: WritableSignal<string> = signal('');

    readonly alpha: WritableSignal<number> = signal(100);

    constructor() {
        effect(() => {
            this.hex.set(this.color()?.toHexString(false).slice(1, 7) || '');
            this.alpha.set(Math.round(this.color()?.rgba.alpha * 100) || 100);
        });
    }

    ngOnInit(): void {}

    onInputChange(event: Event, type: string) {
        let newColor: ThyColor | undefined = undefined;
        const alpha = this.alpha() / 100;
        if (type === 'hex') {
            let finalDisplayValue = this.hex();
            if (this.hex().length === 3) {
                finalDisplayValue = this.hex()
                    .split('')
                    .map(value => value + value)
                    .join('');
            }
            finalDisplayValue = `#${finalDisplayValue}`;
            if (alpha !== 1) {
                finalDisplayValue += ((1 << 8) | Math.round(alpha * 255)).toString(16).substr(1);
            }
            newColor = new ThyColor(finalDisplayValue);
        } else {
            newColor = new ThyColor().setRgba(this.color().rgba.red, this.color().rgba.green, this.color().rgba.blue, alpha);
        }
        this.colorChange.emit(newColor);
    }
}
