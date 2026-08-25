import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyGridComponent, ThyGridItem } from 'ngx-tethys/grid';
import { ThyDivider } from 'ngx-tethys/divider';

@Component({
    selector: 'thy-grid-responsive-example',
    templateUrl: './responsive.component.html',
    styleUrls: ['./responsive.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyGridComponent, ThyGridItem, ThyDivider]
})
export class ThyGridResponsiveExampleComponent {}
