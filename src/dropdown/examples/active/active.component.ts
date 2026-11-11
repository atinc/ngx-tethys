import { Component } from '@angular/core';
import {
    ThyDropdownActiveDirective,
    ThyDropdownDirective,
    ThyDropdownMenuComponent,
    ThyDropdownMenuItemDirective
} from 'ngx-tethys/dropdown';
import { ThyList, ThyListItem } from 'ngx-tethys/list';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-dropdown-active-example',
    templateUrl: './active.component.html',
    imports: [
        ThyDropdownDirective,
        ThyList,
        ThyListItem,
        ThyAction,
        ThyDropdownMenuComponent,
        ThyDropdownMenuItemDirective,
        ThyDropdownActiveDirective
    ]
})
export class ThyDropdownActiveExampleComponent {}
