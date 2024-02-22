import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThyDropdownDirective } from './dropdown.directive';
import { ThyDropdownMenuComponent, ThyDropdownMenuDivider, ThyDropdownMenuGroup } from './dropdown-menu.component';
import {
    ThyDropdownMenuItemDirective,
    ThyDropdownMenuItemNameDirective,
    ThyDropdownMenuItemIconDirective,
    ThyDropdownMenuItemMetaDirective,
    ThyDropdownMenuItemDescDirective,
    ThyDropdownMenuItemExtendIconDirective,
    ThyDropdownMenuItemActiveDirective
} from './dropdown-menu-item.directive';
import { ThyDropdownSubmenu } from './dropdown-submenu.component';
import { ThyDropdownActiveDirective } from './dropdown-active.directive';

@NgModule({
    imports: [
        CommonModule,
        ThyPopoverModule,
        ThyDropdownDirective,
        ThyDropdownActiveDirective,
        ThyDropdownMenuComponent,
        ThyDropdownSubmenu,
        ThyDropdownMenuGroup,
        ThyDropdownMenuDivider,
        ThyDropdownMenuItemDirective,
        ThyDropdownMenuItemNameDirective,
        ThyDropdownMenuItemIconDirective,
        ThyDropdownMenuItemMetaDirective,
        ThyDropdownMenuItemDescDirective,
        ThyDropdownMenuItemExtendIconDirective,
        ThyDropdownMenuItemActiveDirective
    ],
    exports: [
        ThyDropdownDirective,
        ThyDropdownActiveDirective,
        ThyDropdownMenuComponent,
        ThyDropdownSubmenu,
        ThyDropdownMenuGroup,
        ThyDropdownMenuDivider,
        ThyDropdownMenuItemDirective,
        ThyDropdownMenuItemNameDirective,
        ThyDropdownMenuItemIconDirective,
        ThyDropdownMenuItemMetaDirective,
        ThyDropdownMenuItemDescDirective,
        ThyDropdownMenuItemExtendIconDirective,
        ThyDropdownMenuItemActiveDirective
    ]
})
export class ThyDropdownModule {}
