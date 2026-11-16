import { Component } from '@angular/core';
import { ThyGridComponent, ThyGridItem } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-grid-gap-example',
    templateUrl: './gap.component.html',
    styleUrls: ['./gap.component.scss'],
    imports: [ThyGridComponent, ThyGridItem]
})
export class ThyGridGapExampleComponent {}
