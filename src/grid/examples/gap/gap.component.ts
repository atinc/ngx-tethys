import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyGridComponent, ThyGridItem } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-grid-gap-example',
    templateUrl: './gap.component.html',
    styleUrls: ['./gap.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyGridComponent, ThyGridItem]
})
export class ThyGridGapExampleComponent {}
