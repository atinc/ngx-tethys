import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-slider-type',
    template: `
        <thy-radio-group [(ngModel)]="typeValue" class="mb-2">
            <label *ngFor="let type of types" thyRadioButton [thyLabelText]="type" [thyValue]="type"></label>
        </thy-radio-group>
        <thy-slider [thyType]="typeValue" [(ngModel)]="value"></thy-slider>

        <input class="mt-4 mb-2" thyInput [(ngModel)]="customColor" />
        <thy-slider [thyColor]="customColor" [(ngModel)]="value"></thy-slider>
    `
})
export class ThySliderTypeExampleComponent implements OnInit {
    public typeValue = 'primary';

    public types = ['primary', 'success', 'info', 'warning', 'danger'];

    public customColor = '#ccc';

    public value = 62;

    constructor() {}

    ngOnInit() {}
}
