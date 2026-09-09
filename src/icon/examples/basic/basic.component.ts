import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-icon-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyIcon]
})
export class ThyIconBasicExampleComponent {}
