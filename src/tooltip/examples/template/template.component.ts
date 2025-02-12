import { Component } from '@angular/core';

@Component({
    selector: 'app-tooltip-template-example',
    templateUrl: './template.component.html',
    standalone: false
})
export class ThyTooltipTemplateExampleComponent {
    tooltipConfig = {
        trigger: 'hover',
        placement: 'top',
        disabled: false,
        showDelay: 200,
        hideDelay: 100,
        offset: 4
    };
}
