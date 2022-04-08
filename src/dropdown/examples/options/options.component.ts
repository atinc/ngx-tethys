import { Component } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys';

@Component({
    selector: 'thy-dropdown-options-example',
    templateUrl: './options.component.html'
})
export class ThyDropdownOptionsExampleComponent {
    popoverOptions: {
        placement?: ThyPlacement;
        width?: string | number;
        height?: string | number;
    } = {
        placement: 'bottom',
        width: 240,
        height: 108
    };
}
