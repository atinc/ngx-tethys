import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import ThyColor from '../../helpers/color.class';

/**
 * @internal
 */
@Component({
    selector: 'thy-color-inputs',
    templateUrl: './inputs.component.html'
})
export class ThyColorInputsComponent {
    @HostBinding('class.thy-color-inputs') className = true;

    innerColor: ThyColor;

    @Input()
    set color(value: ThyColor) {
        this.alpha = Math.round(value.rgba.alpha * 100);
        this.innerColor = value;
    }

    @Output()
    public colorChange = new EventEmitter<ThyColor>(false);

    alpha: number;

    onInputChange(event: Event, type: string) {
        let newColor;
        if (type === 'hex') {
            if (this.innerColor.displayValue.trim().slice(0, 1) !== '#') {
                this.innerColor.displayValue = `#${this.innerColor.displayValue}`;
            }
            newColor = new ThyColor(this.innerColor.displayValue);
        } else {
            newColor = new ThyColor().setRgba(
                this.innerColor.rgba.red,
                this.innerColor.rgba.green,
                this.innerColor.rgba.blue,
                this.alpha / 100
            );
        }
        this.colorChange.emit(newColor);
    }
}
