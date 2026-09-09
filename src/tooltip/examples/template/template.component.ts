import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';

@Component({
    selector: 'app-tooltip-template-example',
    templateUrl: './template.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
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
