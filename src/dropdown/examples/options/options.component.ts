import { Component } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';

@Component({
    selector: 'thy-dropdown-options-example',
    templateUrl: './options.component.html'
})
export class ThyDropdownOptionsExampleComponent {
    popoverOptions: {
        placement?: ThyPlacement;
        height?: string | number;
        minWidth?: string | number;
    } = {
        placement: 'bottom',
        height: 108,
        minWidth: '200px'
    };

    placement: ThyPlacement = 'bottomRight';

    insideClosable = true;

    panelClass = 'dropdown-panel-class';
}
