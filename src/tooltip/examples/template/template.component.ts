import { Component } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyOverlayTrigger } from 'ngx-tethys/core';
import { ThyTooltipConfig, ThyTooltipDirective } from 'ngx-tethys/tooltip';

@Component({
    selector: 'app-tooltip-template-example',
    templateUrl: './template.component.html',
    imports: [ThyButton, ThyTooltipDirective]
})
export class ThyTooltipTemplateExampleComponent {
    tooltipConfig: ThyTooltipConfig & { trigger: ThyOverlayTrigger; disabled: boolean } = {
        trigger: 'hover',
        placement: 'top',
        disabled: false,
        offset: 4
    };
}
