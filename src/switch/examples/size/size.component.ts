import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThySwitch } from 'ngx-tethys/switch';

@Component({
    selector: 'thy-switch-size-example',
    templateUrl: './size.component.html',
    imports: [ThySwitch, FormsModule, ThySpace, ThySpaceItemDirective]
})
export class ThySwitchSizeExampleComponent {
    isChecked: boolean = true;
}
