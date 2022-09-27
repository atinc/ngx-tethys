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

    @Input()
    public color: ThyColor;

    @Output()
    public colorChange = new EventEmitter<ThyColor>(false);

    onInputChange(event: Event, type: string) {
        let newColor;
        if (type === 'hex') {
            if (this.color.displayValue.trim().slice(0, 1) !== '#') {
                this.color.displayValue = `#${this.color.displayValue}`;
            }
            newColor = new ThyColor(this.color.displayValue);
        } else {
            newColor = new ThyColor().setRgba(this.color.rgba.red, this.color.rgba.green, this.color.rgba.blue, this.color.rgba.alpha);
        }
        this.colorChange.emit(newColor);
    }
}
