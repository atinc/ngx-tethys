import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThyMenuDivider } from './divider/menu-divider.component';
import { ThyMenuGroup } from './group/menu-group.component';
import { ThyMenuItemAction } from './item/action/menu-item-action.component';
import { ThyMenuItemIcon } from './item/icon/menu-item-icon.component';
import { ThyMenuItem } from './item/menu-item.component';
import { ThyMenuItemName } from './item/name/menu-item-name.component';
import { ThyMenu } from './menu.component';

@NgModule({
    imports: [
        CommonModule,
        ThyIconModule,
        ThyPopoverModule,
        ThyMenu,
        ThyMenuGroup,
        ThyMenuItem,
        ThyMenuItemName,
        ThyMenuItemIcon,
        ThyMenuItemAction,
        ThyMenuDivider
    ],
    exports: [ThyMenu, ThyMenuGroup, ThyMenuItem, ThyMenuItemName, ThyMenuItemIcon, ThyMenuItemAction, ThyMenuDivider]
})
export class ThyMenuModule {}
