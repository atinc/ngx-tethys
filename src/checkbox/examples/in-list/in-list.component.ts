import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { ThyList, ThyListItem } from 'ngx-tethys/list';

@Component({
    selector: 'thy-checkbox-in-list-example',
    templateUrl: './in-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCheckbox, ThyList, ThyListItem]
})
export class ThyCheckboxInListExampleComponent implements OnInit {
    public inlineStatus = false;

    constructor() {}

    ngOnInit() {}
}
