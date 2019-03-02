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
} from './action-menu.component';
import { ThyPopBoxModule } from '../pop-box';

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
    ],
    imports: [
        CommonModule,
        ThyPopBoxModule
    ],
    providers: [
    ],
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
    ]
})
export class ThyActionMenuModule {

}
