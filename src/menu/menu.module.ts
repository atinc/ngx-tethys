import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyMenuComponent } from './menu.component';
import { ThyMenuItemComponent } from './item/menu-item.component';
import { ThyMenuGroupComponent } from './group/menu-group.component';
import { ThyMenuItemNameComponent } from './item/name/menu-item-name.component';
import { ThyMenuItemIconComponent } from './item/icon/menu-item-icon.component';
import { ThyMenuItemActionComponent } from './item/action/menu-item-action.component';
import { ThyMenuDividerComponent } from './divider/menu-divider.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyPopoverModule } from 'ngx-tethys/popover';

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
