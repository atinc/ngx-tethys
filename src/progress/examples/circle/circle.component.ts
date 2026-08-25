import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyProgress } from 'ngx-tethys/progress';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-progress-circle-example',
    templateUrl: './circle.component.html',
    styleUrls: ['./circle.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyProgress, ThySpace, ThySpaceItemDirective]
})
export class ThyProgressCircleExampleComponent {
    value = 70;
}
