import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThySwitch } from 'ngx-tethys/switch';

@Component({
    selector: 'thy-switch-color-example',
    templateUrl: './color.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySwitch, FormsModule, ThySpace, ThySpaceItemDirective]
})
export class ThySwitchColorExampleComponent {
    isChecked: boolean = true;

    constructor() {}
}
