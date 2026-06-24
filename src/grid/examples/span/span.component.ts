import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyGridComponent, ThyGridItem } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-grid-span-example',
    templateUrl: './span.component.html',
    styleUrls: ['./span.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyGridComponent, ThyGridItem]
})
export class ThyGridSpanExampleComponent {}
