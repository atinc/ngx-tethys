import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyRadioGroup, ThyRadioButton } from 'ngx-tethys/radio';
import { FormsModule } from '@angular/forms';
import { ThySlider } from 'ngx-tethys/slider';
import { ThyInputDirective } from 'ngx-tethys/input';

@Component({
    selector: 'thy-slider-color',
    template: `
        <thy-radio-group [(ngModel)]="color" class="mb-2">
            @for (color of presetColors; track color) {
                <label thyRadioButton [thyLabelText]="color" [thyValue]="color"></label>
            }
        </thy-radio-group>
        <thy-slider [thyColor]="color" [(ngModel)]="value"></thy-slider>

        <input class="mt-4 mb-2" thyInput [(ngModel)]="customColor" />
        <thy-slider [thyColor]="customColor" [(ngModel)]="value"></thy-slider>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySlider, ThyRadioGroup, ThyRadioButton, FormsModule, ThyInputDirective]
})
export class ThySliderColorExampleComponent {
    public color = 'primary';

    public presetColors = ['primary', 'success', 'info', 'warning', 'danger'];

    public customColor = '#ccc';

    public value = 62;
}
