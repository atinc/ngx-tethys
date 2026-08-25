import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThySwitch } from 'ngx-tethys/switch';

@Component({
    selector: 'thy-switch-loading-example',
    templateUrl: './loading.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySwitch, FormsModule, ThySpace, ThySpaceItemDirective]
})
export class ThySwitchLoadingExampleComponent {
    isChecked: boolean = true;
    noChecked: boolean = false;
}
