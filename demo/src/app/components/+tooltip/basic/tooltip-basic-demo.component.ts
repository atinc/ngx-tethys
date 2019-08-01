import { Component } from '@angular/core';

@Component({
    selector: 'app-tooltip-basic-demo',
    templateUrl: './tooltip-basic-demo.component.html'
})
export class TooltipBasicDemoComponent {
    tooltipConfig = {
        trigger: 'hover',
        placement: 'top',
        disabled: false,
        showDelay: 200,
        hideDelay: 100,
        offset: 4,
        thyTooltipPin: true
    };
}
