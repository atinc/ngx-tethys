import { Component } from '@angular/core';
import { ThyProgress } from 'ngx-tethys/progress';
import { ThySpace } from 'ngx-tethys/space';

@Component({
    selector: 'thy-progress-circle-example',
    templateUrl: './circle.component.html',
    styleUrls: ['./circle.component.scss'],
    imports: [ThyProgress, ThySpace]
})
export class ThyProgressCircleExampleComponent {
    value = 70;
}
