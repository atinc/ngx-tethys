import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { ThyColor } from './helpers/color.class';
import { ThyColorInputsComponent } from './parts/inputs/inputs.component';
import { ThyIndicatorComponent } from './parts/indicator/indicator.component';
import { ThyAlphaComponent } from './parts/alpha/alpha.component';
import { ThyHueComponent } from './parts/hue/hue.component';
import { ThySaturationComponent } from './parts/saturation/saturation.component';

/**
 * @internal
 */
@Component({
    selector: 'thy-color-picker-custom-panel',
    templateUrl: './color-picker-custom-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ThySaturationComponent, ThyHueComponent, ThyAlphaComponent, ThyIndicatorComponent, ThyColorInputsComponent]
})
export class ThyColorPickerCustomPanelComponent implements OnInit {
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
