import { Component } from '@angular/core';

@Component({
    selector: 'app-tooltip-template-data-demo',
    templateUrl: './tooltip-template-demo.component.html'
})
export class TooltipTemplateContextDemoComponent {
    tooltipConfig = {
        trigger: 'hover',
        placement: 'top',
        disabled: false,
        showDelay: 200,
        hideDelay: 100,
        offset: 4
    };
}
