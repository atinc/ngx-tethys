import { ChangeDetectionStrategy, Component, HostBinding, OnInit, WritableSignal, input, model, signal } from '@angular/core';
import { ThyColor } from './helpers/color.class';
import { ThyAlpha } from './parts/alpha/alpha.component';
import { ThyHue } from './parts/hue/hue.component';
import { ThyIndicator } from './parts/indicator/indicator.component';
import { ThyColorInputs } from './parts/inputs/inputs.component';
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

    readonly color = model<string>();

    colorInstance: WritableSignal<ThyColor> = signal<ThyColor>(null);

    readonly pickerColorChange = input<(color: string) => {}>();

    constructor() {}

    ngOnInit() {
        this.colorInstance.set(new ThyColor(this.color()));
    }

    colorChangeEvent($event: ThyColor) {
        this.colorInstance.set($event);
        this.color.set(this.colorInstance().displayValue);
        this.pickerColorChange()(this.color());
    }
}
