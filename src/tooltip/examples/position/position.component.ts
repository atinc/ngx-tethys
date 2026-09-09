import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThySpaceItemDirective, ThySpace } from 'ngx-tethys/space';
import { ThyButton } from 'ngx-tethys/button';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';

@Component({
    selector: 'app-tooltip-position-example',
    templateUrl: './position.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySpace, ThySpaceItemDirective, ThyButton, ThyTooltipDirective]
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
