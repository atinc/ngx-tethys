import { Component, OnInit } from '@angular/core';
import { ThyList, ThyListItem } from 'ngx-tethys/list';

@Component({
    selector: 'app-list-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyList, ThyListItem]
})
export class ThyListBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
