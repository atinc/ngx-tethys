import { Component } from '@angular/core';
import { ThyDropdownDirective, ThyDropdownMenuComponent } from 'ngx-tethys/dropdown';
import { ThyListItem } from 'ngx-tethys/list';
import { ThyList } from 'ngx-tethys/list';

@Component({
    selector: 'thy-dropdown-active-example',
    templateUrl: './active.component.html',
    imports: [ThyDropdownDirective, ThyList, ThyListItem, ThyDropdownMenuComponent]
})
export class ThyDropdownActiveExampleComponent {}
