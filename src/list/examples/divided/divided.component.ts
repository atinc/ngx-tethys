import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyList, ThyListItem } from 'ngx-tethys/list';

@Component({
    selector: 'app-list-divided-example',
    templateUrl: './divided.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyList, ThyListItem]
})
export class ThyListDividedExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
