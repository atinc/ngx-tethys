import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import {
    ThyDropdownDirective,
    ThyDropdownMenuComponent,
    ThyDropdownMenuItemDirective,
    ThyDropdownMenuGroup,
    ThyDropdownMenuItemNameDirective,
    ThyDropdownMenuItemIconDirective
} from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-dropdown-group-example',
    templateUrl: './group.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        ThyDropdownDirective,
        ThyDropdownMenuComponent,
        ThyDropdownMenuItemDirective,
        ThyIcon,
        ThyDropdownMenuGroup,
        ThyButton,
        ThyDropdownMenuItemNameDirective,
        ThyDropdownMenuItemIconDirective
    ]
})
export class ThyDropdownGroupExampleComponent {}
