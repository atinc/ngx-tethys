import { Component } from '@angular/core';
import { ThyDropdownDirective, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective, ThyDropdownSubmenu } from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-dropdown-submenu-example',
    templateUrl: './submenu.component.html',
    imports: [ThyDropdownDirective, ThyDropdownMenuComponent, ThyIcon, ThyDropdownMenuItemDirective, ThyDropdownSubmenu]
})
export class ThyDropdownSubmenuExampleComponent {}
