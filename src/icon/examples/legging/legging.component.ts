import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-icon-legging-example',
    templateUrl: './legging.component.html',
    styleUrls: ['./legging.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyIcon]
})
export class ThyIconLeggingExampleComponent {
    fontSizeClass = 'font-size-xlg';
}
