import { Component } from '@angular/core';
import {
    ThyDropdownDirective,
    ThyDropdownMenuComponent,
    ThyDropdownMenuItemDirective,
    ThyDropdownMenuItemIconDirective,
    ThyDropdownMenuItemNameDirective
} from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dropdown-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [
        ThyDropdownDirective,
        ThyDropdownMenuComponent,
        ThyIcon,
        ThyDropdownMenuItemDirective,
        ThyButton,
        ThyDropdownMenuItemNameDirective,
        ThyDropdownMenuItemIconDirective
    ]
})
export class ThyDropdownDisabledExampleComponent {}
