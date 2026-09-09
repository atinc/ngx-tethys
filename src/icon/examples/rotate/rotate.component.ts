import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-icon-rotate-example',
    templateUrl: './rotate.component.html',
    styleUrls: ['./rotate.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyIcon]
})
export class ThyIconRotateExampleComponent {}
