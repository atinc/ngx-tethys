import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyRadio } from 'ngx-tethys/radio';

@Component({
    selector: 'app-radio-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyRadio]
})
export class ThyRadioBasicExampleComponent {}
