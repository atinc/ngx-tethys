import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyActionMenuToggleDirective } from './action-menu-toggle.component';
import {
    ThyActionMenuDirective,
    ThyActionMenuDividerDirective,
    ThyActionMenuItemDirective,
    ThyActionMenuSubItemDirective,
    ThyActionMenuDividerTitleDirective,
} from './action-menu.component';

@NgModule({
    declarations: [
        ThyActionMenuToggleDirective,
        ThyActionMenuDirective,
        ThyActionMenuDividerDirective,
        ThyActionMenuItemDirective,
        ThyActionMenuSubItemDirective,
        ThyActionMenuDividerTitleDirective,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyActionMenuToggleDirective,
        ThyActionMenuDirective,
        ThyActionMenuDividerDirective,
        ThyActionMenuItemDirective,
        ThyActionMenuSubItemDirective,
        ThyActionMenuDividerTitleDirective,
    ]
})
export class ThyActionMenuModule {

}
