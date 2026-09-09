import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyTimePicker } from 'ngx-tethys/time-picker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-time-picker-step-example',
    templateUrl: './step.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTimePicker, FormsModule]
})
export class ThyTimePickerStepExampleComponent implements OnInit {
    date!: Date;

    constructor() {}

    ngOnInit() {}
}
