import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThyMenuDividerComponent } from './divider/menu-divider.component';
import { ThyMenuGroupComponent } from './group/menu-group.component';
import { ThyMenuItemActionComponent } from './item/action/menu-item-action.component';
import { ThyMenuItemIconComponent } from './item/icon/menu-item-icon.component';
import { ThyMenuItemComponent } from './item/menu-item.component';
import { ThyMenuItemNameComponent } from './item/name/menu-item-name.component';
import { ThyMenuComponent } from './menu.component';

@NgModule({
    declarations: [
        ThyMenuComponent,
        ThyMenuGroupComponent,
        ThyMenuItemComponent,
        ThyMenuItemNameComponent,
        ThyMenuItemIconComponent,
        ThyMenuItemActionComponent,
        ThyMenuDividerComponent
    ],
    imports: [CommonModule, ThyIconModule, ThyPopoverModule],
    exports: [
        ThyMenuComponent,
        ThyMenuGroupComponent,
        ThyMenuItemComponent,
        ThyMenuItemNameComponent,
        ThyMenuItemIconComponent,
        ThyMenuItemActionComponent,
        ThyMenuDividerComponent
    ]
})
export class ThyMenuModule {}
