import { Component } from '@angular/core';
import { ThyDropdownDirective, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective } from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-dropdown-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyDropdownDirective, ThyDropdownMenuComponent, ThyIcon, ThyDropdownMenuItemDirective]
})
export class ThyDropdownDisabledExampleComponent {}
