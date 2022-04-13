import { Component } from '@angular/core';
import { ThyPlacement, THY_DROPDOWN_DEFAULT_WIDTH } from 'ngx-tethys';

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
        width: parseInt(THY_DROPDOWN_DEFAULT_WIDTH.replace('px', ''), 10),
        height: 108
    };
}
