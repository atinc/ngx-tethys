import { Component, OnInit } from '@angular/core';
import { ThyDivider } from 'ngx-tethys/divider';

@Component({
    selector: 'thy-styles-borders-example',
    templateUrl: './borders.component.html',
    styleUrls: ['./borders.component.scss'],
    imports: [ThyDivider]
})
export class ThyStylesBordersExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
