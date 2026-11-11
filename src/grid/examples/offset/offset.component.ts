import { Component } from '@angular/core';
import { ThyGridComponent, ThyGridItem } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-grid-offset-example',
    templateUrl: './offset.component.html',
    styleUrls: ['./offset.component.scss'],
    imports: [ThyGridComponent, ThyGridItem]
})
export class ThyGridOffsetExampleComponent {}
