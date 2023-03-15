import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThyDropdownDirective } from './dropdown.directive';
import { ThyDropdownMenuComponent, ThyDropdownMenuDividerComponent, ThyDropdownMenuGroupComponent } from './dropdown-menu.component';
import {
    ThyDropdownMenuItemDirective,
    ThyDropdownMenuItemNameDirective,
    ThyDropdownMenuItemIconDirective,
    ThyDropdownMenuItemMetaDirective,
    ThyDropdownMenuItemDescDirective,
    ThyDropdownMenuItemExtendIconDirective,
    ThyDropdownMenuItemActiveDirective
} from './dropdown-menu-item.directive';
import { ThyDropdownSubmenuComponent } from './dropdown-submenu.component';
import { ThyDropdownActiveDirective } from './dropdown-active.directive';

@NgModule({
    imports: [
        CommonModule,
        ThyPopoverModule,
        ThyDropdownDirective,
        ThyDropdownActiveDirective,
        ThyDropdownMenuComponent,
        ThyDropdownSubmenuComponent,
        ThyDropdownMenuGroupComponent,
        ThyDropdownMenuDividerComponent,
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
        ThyDropdownSubmenuComponent,
        ThyDropdownMenuGroupComponent,
        ThyDropdownMenuDividerComponent,
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
