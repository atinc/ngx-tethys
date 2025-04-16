import { Component } from '@angular/core';
import { ThyDropdownDirective } from 'ngx-tethys/dropdown';
import { CustomMenuComponent } from './custom-menu.component';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-dropdown-component-example',
    templateUrl: './component.component.html',
    imports: [ThyIcon, ThyDropdownDirective, ThyButton]
})
export class ThyDropdownComponentExampleComponent {
    menu = CustomMenuComponent;
}
