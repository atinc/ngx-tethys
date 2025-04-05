import { Component } from '@angular/core';
import { ThyDropdownDirective, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective, ThyDropdownMenuGroup } from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-dropdown-group-example',
    templateUrl: './group.component.html',
    imports: [ThyDropdownDirective, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective, ThyIcon, ThyDropdownMenuGroup]
})
export class ThyDropdownGroupExampleComponent {}
