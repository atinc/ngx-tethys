import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyList, ThyListItem } from 'ngx-tethys/list';

@Component({
    selector: 'app-list-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyList, ThyListItem]
})
export class ThyListBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
