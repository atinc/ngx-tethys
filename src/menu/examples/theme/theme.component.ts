import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyMenu, ThyMenuItem, ThyMenuItemAction, ThyMenuGroup } from 'ngx-tethys/menu';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyRadioGroup } from 'ngx-tethys/radio';
import { ThyRadio } from 'ngx-tethys/radio';
import { FormsModule } from '@angular/forms';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyDropdownMenuComponent } from 'ngx-tethys/dropdown';

@Component({
    selector: 'thy-menu-theme-example',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss'],
    imports: [
        ThyMenu,
        ThyMenuItem,
        ThyDropdownMenuComponent,
        ThyDivider,
        ThyMenuGroup,
        ThyIcon,
        ThyRadioGroup,
        ThyRadio,
        FormsModule,
        ThyMenuItemAction
    ]
})
export class ThyMenuThemeExampleComponent implements OnInit {
    private popover = inject(ThyPopover);

    theme: string = 'loose';

    coll: boolean;

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
