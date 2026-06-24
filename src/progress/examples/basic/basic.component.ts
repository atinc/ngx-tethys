import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyProgress } from 'ngx-tethys/progress';

@Component({
    selector: 'thy-progress-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyProgress]
})
export class ThyProgressBasicExampleComponent {
    value = 40;
}
