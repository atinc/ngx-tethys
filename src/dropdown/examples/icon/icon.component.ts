import { Component } from '@angular/core';
import { ThyDropdownDirective, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective } from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyDivider } from 'ngx-tethys/divider';

@Component({
    selector: 'thy-dropdown-icon-example',
    templateUrl: './icon.component.html',
    imports: [ThyDropdownDirective, ThyIcon, ThyDivider, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective]
})
export class ThyDropdownIconExampleComponent {}
