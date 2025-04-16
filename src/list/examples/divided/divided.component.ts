import { Component, OnInit } from '@angular/core';
import { ThyList, ThyListItem } from 'ngx-tethys/list';

@Component({
    selector: 'app-list-divided-example',
    templateUrl: './divided.component.html',
    imports: [ThyList, ThyListItem]
})
export class ThyListDividedExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
