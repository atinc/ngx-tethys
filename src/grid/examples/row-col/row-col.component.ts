import { Component } from '@angular/core';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-grid-row-col-example',
    templateUrl: './row-col.component.html',
    styleUrls: ['./row-col.component.scss'],
    imports: [ThyRowDirective, ThyColDirective]
})
export class ThyGridRowColExampleComponent {}
