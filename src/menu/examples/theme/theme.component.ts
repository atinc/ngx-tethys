import { Component, ChangeDetectionStrategy } from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.Eager,
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
export class ThyMenuThemeExampleComponent {
    theme: string = 'light';
}
