import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThySpace } from 'ngx-tethys/space';
import { ThySwitch } from 'ngx-tethys/switch';

@Component({
    selector: 'thy-switch-loading-example',
    templateUrl: './loading.component.html',
    imports: [ThySwitch, FormsModule, ThySpace]
})
export class ThySwitchLoadingExampleComponent {
    isChecked: Boolean = true;
    noChecked: Boolean = false;
}
