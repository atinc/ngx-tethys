import { Component } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';

@Component({
    selector: 'thy-dropdown-options-example',
    templateUrl: './options.component.html',
    standalone: false
})
export class ThyDropdownOptionsExampleComponent {
    popoverOptions: {
        placement?: ThyPlacement;
        height?: string | number;
        minWidth?: string | number;
        outsideClosable?: boolean;
    } = {
        placement: 'bottom',
        height: 108,
        minWidth: '200px',
        outsideClosable: true
    };

    placement: ThyPlacement = 'bottomRight';

    insideClosable = true;

    panelClass = 'dropdown-panel-class';
}
