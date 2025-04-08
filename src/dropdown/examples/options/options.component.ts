import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyPlacement } from 'ngx-tethys/core';
import { ThyDropdownMenuComponent, ThyDropdownMenuItemDirective, ThyDropdownDirective } from 'ngx-tethys/dropdown';
import { ThyFormGroup } from 'ngx-tethys/form';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { ThySelect } from 'ngx-tethys/select';
import { ThySwitch } from 'ngx-tethys/switch';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyButton } from 'ngx-tethys/button';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyOption } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-dropdown-options-example',
    templateUrl: './options.component.html',
    imports: [
        ThyDropdownMenuComponent,
        FormsModule,
        ThyDropdownMenuItemDirective,
        ThyFormGroup,
        ThySelect,
        ThyOption,
        ThyInputNumber,
        ThySwitch,
        ThyIcon,
        ThyButton,
        ThyDropdownDirective,
        ThyDropdownMenuComponent,
        ThyDropdownMenuItemDirective,
        ThyDivider,
        ThyInputDirective
    ]
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
