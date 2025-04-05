import { Component } from '@angular/core';
import { ThyDropdownDirective, ThyDropdownMenuComponent } from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-dropdown-trigger-example',
    templateUrl: './trigger.component.html',
    imports: [ThyDropdownDirective, ThyDropdownMenuComponent, ThyIcon]
})
export class ThyDropdownTriggerExampleComponent {}
