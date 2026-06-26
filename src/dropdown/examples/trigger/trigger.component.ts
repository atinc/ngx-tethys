import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyDropdownDirective, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective } from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dropdown-trigger-example',
    templateUrl: './trigger.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDropdownDirective, ThyDropdownMenuComponent, ThyIcon, ThyButton, ThyDropdownMenuItemDirective]
})
export class ThyDropdownTriggerExampleComponent {}
