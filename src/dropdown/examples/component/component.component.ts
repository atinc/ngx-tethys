import { Component } from '@angular/core';
import { CustomMenuComponent } from './custom-menu.component';

@Component({
    selector: 'thy-dropdown-component-example',
    templateUrl: './component.component.html',
    standalone: false
})
export class ThyDropdownComponentExampleComponent {
    menu = CustomMenuComponent;
}
