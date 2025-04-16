import { Component } from '@angular/core';
import { ThyDropdownDirective, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective } from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dropdown-split-example',
    templateUrl: './split.component.html',
    imports: [ThyDropdownDirective, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective, ThyIcon, ThyButtonGroup, ThyButton]
})
export class ThyDropdownSplitExampleComponent {}
