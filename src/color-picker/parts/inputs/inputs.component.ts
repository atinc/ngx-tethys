import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyInputNumberComponent } from 'ngx-tethys/input-number';
import { ThyEnterDirective } from 'ngx-tethys/shared';
import { ThyColor } from '../../helpers/color.class';

/**
 * @internal
 */
@Component({
    selector: 'thy-color-inputs',
    templateUrl: './inputs.component.html',
    standalone: true,
    imports: [ThyInputDirective, FormsModule, ThyEnterDirective, ThyInputNumberComponent]
})
export class ThyColorInputsComponent {
    @HostBinding('class.thy-color-inputs') className = true;

    innerColor: ThyColor;

    @Input()
    set color(value: ThyColor) {
        this.alpha = Math.round(value.rgba.alpha * 100);
        this.innerColor = value;
    }

    get color() {
        return this.innerColor;
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
