import { Component } from '@angular/core';
import { THY_DROPDOWN_DEFAULT_WIDTH } from 'ngx-tethys/dropdown';
import { ThyPlacement } from 'ngx-tethys/core';

@Component({
    selector: 'thy-dropdown-options-example',
    templateUrl: './options.component.html'
})
export class ThyDropdownOptionsExampleComponent {
    popoverOptions: {
        placement?: ThyPlacement;
        width?: string | number;
        height?: string | number;
        minWidth?: string | number;
    } = {
        placement: 'bottom',
        width: parseInt(THY_DROPDOWN_DEFAULT_WIDTH.replace('px', ''), 10),
        height: 108,
        minWidth: '200px'
    };

    placement: ThyPlacement = 'bottomRight';

    insideClosable = true;

    panelClass = 'dropdown-panel-class';
}
