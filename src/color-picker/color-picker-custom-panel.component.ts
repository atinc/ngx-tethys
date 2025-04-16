import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { ThyColor } from './helpers/color.class';
import { ThyColorInputs } from './parts/inputs/inputs.component';
import { ThyIndicator } from './parts/indicator/indicator.component';
import { ThyAlpha } from './parts/alpha/alpha.component';
import { ThyHue } from './parts/hue/hue.component';
import { ThySaturation } from './parts/saturation/saturation.component';

/**
 * @internal
 */
@Component({
    selector: 'thy-color-picker-custom-panel',
    templateUrl: './color-picker-custom-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThySaturation, ThyHue, ThyAlpha, ThyIndicator, ThyColorInputs]
})
export class ThyColorPickerCustomPanel implements OnInit {
    @HostBinding('class.thy-color-picker-custom-panel') className = true;

    colorInstance: ThyColor;

    @Input() color?: string;

    @Input() pickerColorChange: (color: string) => {};

    constructor() {}

    ngOnInit() {
        this.colorInstance = new ThyColor(this.color);
    }

    colorChangeEvent($event: ThyColor) {
        this.colorInstance = $event;
        this.color = this.colorInstance.displayValue;
        this.pickerColorChange(this.color);
    }
}
