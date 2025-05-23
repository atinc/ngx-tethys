import { Component, OnInit } from '@angular/core';
import { ThyRadioGroup, ThyRadioButton } from 'ngx-tethys/radio';
import { FormsModule } from '@angular/forms';
import { ThySlider } from 'ngx-tethys/slider';
import { ThyInputDirective } from 'ngx-tethys/input';

@Component({
    selector: 'thy-slider-type',
    template: `
        <thy-radio-group [(ngModel)]="typeValue" class="mb-2">
            @for (type of types; track type) {
                <label thyRadioButton [thyLabelText]="type" [thyValue]="type"></label>
            }
        </thy-radio-group>
        <thy-slider [thyType]="typeValue" [(ngModel)]="value"></thy-slider>

        <input class="mt-4 mb-2" thyInput [(ngModel)]="customColor" />
        <thy-slider [thyColor]="customColor" [(ngModel)]="value"></thy-slider>
    `,
    imports: [ThySlider, ThyRadioGroup, ThyRadioButton, FormsModule, ThyInputDirective]
})
export class ThySliderTypeExampleComponent implements OnInit {
    public typeValue = 'primary';

    public types = ['primary', 'success', 'info', 'warning', 'danger'];

    public customColor = '#ccc';

    public value = 62;

    constructor() {}

    ngOnInit() {}
}
