import { Component } from '@angular/core';
import {
    ThyDropdownDirective,
    ThyDropdownMenuComponent,
    ThyDropdownMenuItemDescDirective,
    ThyDropdownMenuItemDirective,
    ThyDropdownMenuItemMetaDirective,
    ThyDropdownMenuItemNameDirective
} from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dropdown-icon-example',
    templateUrl: './icon.component.html',
    imports: [
        ThyDropdownDirective,
        ThyIcon,
        ThyDivider,
        ThyButton,
        ThyDropdownMenuComponent,
        ThyDropdownMenuItemDirective,
        ThyDropdownMenuItemNameDirective,
        ThyDropdownMenuItemMetaDirective,
        ThyDropdownMenuItemDescDirective
    ]
})
export class ThyDropdownIconExampleComponent {}
