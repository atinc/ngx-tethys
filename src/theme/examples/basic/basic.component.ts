import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-theme-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySpace, ThySpaceItemDirective]
})
export class ThyThemeBasicExampleComponent {
    color = 'var(--gray-100)';
}
