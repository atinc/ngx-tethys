import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThySwitch } from 'ngx-tethys/switch';

@Component({
    selector: 'thy-switch-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThySwitch, FormsModule]
})
export class ThySwitchBasicExampleComponent {
    isChecked: Boolean = true;

    switchChange() {}
}
