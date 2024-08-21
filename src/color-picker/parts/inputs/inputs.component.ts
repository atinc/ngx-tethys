import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
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
    standalone: true,
    imports: [ThyInputDirective, FormsModule, ThyEnterDirective, ThyInputNumber, ThyInputGroup]
})
export class ThyColorInputs {
    @HostBinding('class.thy-color-inputs') className = true;

    innerColor: ThyColor;

    hex: string;

    @Input()
    set color(value: ThyColor) {
        this.alpha = Math.round(value.rgba.alpha * 100);
        this.innerColor = value;
        this.hex = this.innerColor.toHexString(false).slice(1, 7);
    }

    get color() {
        return this.innerColor;
    }

    @Output()
    public colorChange = new EventEmitter<ThyColor>(false);

    alpha: number;

    onInputChange(event: Event, type: string) {
        let newColor;
        const alpha = this.alpha / 100;
        if (type === 'hex') {
            let finalDisplayValue = this.hex;
            if (this.hex.length === 3) {
                finalDisplayValue = this.hex
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
            newColor = new ThyColor().setRgba(this.innerColor.rgba.red, this.innerColor.rgba.green, this.innerColor.rgba.blue, alpha);
        }
        this.colorChange.emit(newColor);
    }
}
