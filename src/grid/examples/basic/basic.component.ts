import { Component } from '@angular/core';
import { ThyGridComponent, ThyGridItem } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-grid-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyGridComponent, ThyGridItem]
})
export class ThyGridBasicExampleComponent {}
