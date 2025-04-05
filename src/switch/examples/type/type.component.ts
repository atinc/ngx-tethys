import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThySpace } from 'ngx-tethys/space';
import { ThySwitch } from 'ngx-tethys/switch';

@Component({
    selector: 'thy-switch-type-example',
    templateUrl: './type.component.html',
    imports: [ThySwitch, FormsModule, ThySpace]
})
export class ThySwitchTypeExampleComponent {
    isChecked: Boolean = true;

    constructor() {}
}
