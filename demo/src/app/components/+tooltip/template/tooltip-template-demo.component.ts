import { Component } from '@angular/core';

@Component({
    selector: 'app-tooltip-template-demo',
    templateUrl: './tooltip-template-demo.component.html'
})
export class TooltipTemplateDemoComponent {
    tooltipConfig = {
        trigger: 'hover',
        placement: 'top',
        disabled: false,
        showDelay: 200,
        hideDelay: 100
    };
}
