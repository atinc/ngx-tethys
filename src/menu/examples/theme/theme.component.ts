import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyMenu, ThyMenuItem, ThyMenuItemAction, ThyMenuGroup, ThyMenuItemName, ThyMenuItemIcon } from 'ngx-tethys/menu';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyRadio, ThyRadioGroup } from 'ngx-tethys/radio';
import { FormsModule } from '@angular/forms';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyDropdownMenuComponent, ThyDropdownMenuItemIconDirective, ThyDropdownMenuItemNameDirective } from 'ngx-tethys/dropdown';

@Component({
    selector: 'thy-menu-theme-example',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss'],
    imports: [
        ThyMenu,
        ThyMenuItem,
        ThyDropdownMenuComponent,
        ThyDropdownMenuItemNameDirective,
        ThyDropdownMenuItemIconDirective,
        ThyDivider,
        ThyMenuGroup,
        ThyIcon,
        ThyRadioGroup,
        ThyRadio,
        FormsModule,
        ThyMenuItemAction,
        ThyMenuItemName,
        ThyMenuItemIcon
    ]
})
export class ThyMenuThemeExampleComponent implements OnInit {
    private popover = inject(ThyPopover);

    theme: string = 'loose';

    coll!: boolean;

    ngOnInit(): void {}

    openActionMenu(event: Event, menuTpl: TemplateRef<any>) {
        this.popover.open(menuTpl, {
            origin: event.currentTarget as HTMLElement,
            placement: 'bottomLeft',
            insideClosable: true,
            originActiveClass: 'active'
        });
    }
}
