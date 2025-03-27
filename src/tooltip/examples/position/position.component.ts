import { Component } from '@angular/core';

@Component({
    selector: 'app-tooltip-position-example',
    templateUrl: './position.component.html',
    standalone: false
})
export class ThyTooltipPositionExampleComponent {
    tooltipConfig = {
        trigger: 'hover',
        placement: 'top',
        disabled: false,
        showDelay: 200,
        hideDelay: 100,
        offset: 4
    };
}
