import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyActionMenuToggleDirective } from './action-menu-toggle.component';
import {
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
} from './action-menu.component';
import { ThyPopBoxModule } from '../pop-box';
import { ThyPopoverModule } from '../popover';

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
