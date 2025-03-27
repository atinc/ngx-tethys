import { Component } from '@angular/core';

@Component({
    selector: 'thy-switch-loading-example',
    templateUrl: './loading.component.html',
    standalone: false
})
export class ThySwitchLoadingExampleComponent {
    isChecked: Boolean = true;
    noChecked: Boolean = false;
}
