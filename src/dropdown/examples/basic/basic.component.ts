import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyDropdownDirective, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective } from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dropdown-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyDropdownDirective, ThyIcon, ThyButton, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective]
})
export class ThyDropdownBasicExampleComponent {}
