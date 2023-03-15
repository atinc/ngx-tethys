import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThySelectModule } from 'ngx-tethys/select';
import {
    ThyActionMenuItemActiveDirective,
    ThyActionMenuItemDirective,
    ThyActionMenuItemExtendIconDirective,
    ThyActionMenuItemIconDirective,
    ThyActionMenuItemInfoDirective,
    ThyActionMenuItemMetaDirective,
    ThyActionMenuItemNameDirective
} from './action-menu-item.directive';
import { ThyActionMenuSubItemDirective } from './action-menu-sub-item.directive';
import { ThyActionMenuToggleDirective } from './action-menu-toggle.component';
import {
    ThyActionMenuComponent,
    ThyActionMenuDividerComponent,
    ThyActionMenuDividerTitleDirective,
    ThyActionMenuGroupComponent
} from './action-menu.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyPopoverModule,
        ThySelectModule,
        ThyFormModule,
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
