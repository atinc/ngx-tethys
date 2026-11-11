import { Component } from '@angular/core';
import { ThyGridComponent, ThyGridItem } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-grid-span-example',
    templateUrl: './span.component.html',
    styleUrls: ['./span.component.scss'],
    imports: [ThyGridComponent, ThyGridItem]
})
export class ThyGridSpanExampleComponent {}
