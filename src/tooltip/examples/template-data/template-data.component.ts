import { Component } from '@angular/core';

@Component({
    selector: 'app-tooltip-template-data-example',
    templateUrl: './template-data.component.html'
})
export class ThyTooltipTemplateDataExampleComponent {
    tooltipConfig = {
        trigger: 'hover',
        placement: 'top',
        disabled: false,
        showDelay: 200,
        hideDelay: 100,
        offset: 4
    };
}
