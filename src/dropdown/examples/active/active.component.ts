import { Component, ChangeDetectionStrategy } from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.Eager,
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
