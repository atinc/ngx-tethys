import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyActionMenuToggleDirective } from './action-menu-toggle.component';
import {
    ThyActionMenuComponent,
    ThyActionMenuDividerComponent,
    ThyActionMenuDividerTitleDirective,
    ThyActionMenuGroupComponent
} from './action-menu.component';
import {
    ThyActionMenuItemDirective,
    ThyActionMenuItemIconDirective,
    ThyActionMenuItemNameDirective,
    ThyActionMenuItemExtendIconDirective,
    ThyActionMenuItemMetaDirective,
    ThyActionMenuItemInfoDirective,
    ThyActionMenuItemActiveDirective
} from './action-menu-item.directive';
import { ThyActionMenuSubItemDirective } from './action-menu-sub-item.directive';
import { ThyPopoverModule } from 'ngx-tethys/popover';

@NgModule({
    declarations: [
        ThyActionMenuToggleDirective,
        ThyActionMenuComponent,
        ThyActionMenuDividerComponent,
        ThyActionMenuItemDirective,
        ThyActionMenuItemIconDirective,
        ThyActionMenuItemNameDirective,
        ThyActionMenuItemExtendIconDirective,
        ThyActionMenuItemMetaDirective,
        ThyActionMenuItemInfoDirective,
        ThyActionMenuSubItemDirective,
        ThyActionMenuDividerTitleDirective,
        ThyActionMenuItemActiveDirective,
        ThyActionMenuGroupComponent
    ],
    imports: [CommonModule, ThyPopoverModule],
    providers: [],
    exports: [
        ThyActionMenuToggleDirective,
        ThyActionMenuComponent,
        ThyActionMenuDividerComponent,
        ThyActionMenuItemDirective,
        ThyActionMenuItemIconDirective,
        ThyActionMenuItemNameDirective,
        ThyActionMenuItemExtendIconDirective,
        ThyActionMenuItemMetaDirective,
        ThyActionMenuItemInfoDirective,
        ThyActionMenuSubItemDirective,
        ThyActionMenuDividerTitleDirective,
        ThyActionMenuItemActiveDirective,
        ThyActionMenuGroupComponent
    ]
})
export class ThyActionMenuModule {}
