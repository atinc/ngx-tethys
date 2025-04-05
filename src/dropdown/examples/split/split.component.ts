import { Component } from '@angular/core';
import { ThyDropdownDirective, ThyDropdownMenuComponent } from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyButtonGroup } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dropdown-split-example',
    templateUrl: './split.component.html',
    imports: [ThyDropdownDirective, ThyDropdownMenuComponent, ThyIcon, ThyButtonGroup]
})
export class ThyDropdownSplitExampleComponent {}
