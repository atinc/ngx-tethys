import { Component } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';

@Component({
    selector: 'app-tooltip-template-example',
    templateUrl: './template.component.html',
    imports: [ThyButton, ThyTooltipDirective]
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
