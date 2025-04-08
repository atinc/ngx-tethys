import { Component } from '@angular/core';
import {
    ThyDropdownDirective,
    ThyDropdownMenuComponent,
    ThyDropdownMenuItemDirective,
    ThyDropdownSubmenu,
    ThyDropdownMenuItemNameDirective,
    ThyDropdownMenuItemIconDirective,
    ThyDropdownMenuItemExtendIconDirective
} from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dropdown-submenu-example',
    templateUrl: './submenu.component.html',
    imports: [
        ThyDropdownDirective,
        ThyDropdownMenuComponent,
        ThyIcon,
        ThyButton,
        ThyDropdownMenuItemDirective,
        ThyDropdownSubmenu,
        ThyDropdownMenuItemNameDirective,
        ThyDropdownMenuItemIconDirective,
        ThyDropdownMenuItemExtendIconDirective
    ]
})
export class ThyDropdownSubmenuExampleComponent {}
