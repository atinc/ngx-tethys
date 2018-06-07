import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyActionMenuToggleDirective } from './action-menu-toggle.component';
import {
    ThyActionMenuComponent,
    ThyActionMenuDividerComponent,
    ThyActionMenuItemDirective,
    ThyActionMenuSubItemDirective,
    ThyActionMenuDividerTitleDirective,
    ThyActionMenuItemActiveDirective
} from './action-menu.component';

@NgModule({
    declarations: [
        ThyActionMenuToggleDirective,
        ThyActionMenuComponent,
        ThyActionMenuDividerComponent,
        ThyActionMenuItemDirective,
        ThyActionMenuSubItemDirective,
        ThyActionMenuDividerTitleDirective,
        ThyActionMenuItemActiveDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyActionMenuToggleDirective,
        ThyActionMenuComponent,
        ThyActionMenuDividerComponent,
        ThyActionMenuItemDirective,
        ThyActionMenuSubItemDirective,
        ThyActionMenuDividerTitleDirective,
        ThyActionMenuItemActiveDirective
    ]
})
export class ThyActionMenuModule {

}
