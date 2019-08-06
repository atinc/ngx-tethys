import { OnInit, Component } from '@angular/core';
import { apiParameters } from './api-parameters';

@Component({
    selector: 'app-demo-tooltip-section',
    templateUrl: './tooltip-section.component.html'
})
export class DemoTooltipSectionComponent implements OnInit {
    showTooltips = true;

    tooltipConfig = {
        trigger: 'hover',
        placement: 'top',
        disabled: false,
        showDelay: 200,
        hideDelay: 100,
        offset: 4,
        thyTooltipPin: true
    };

    basicCodeExample = require('!!raw-loader!./basic/tooltip-basic-demo.component.html');

    templateCodeExample = require('!!raw-loader!./template/tooltip-template-demo.component.html');

    templateContextCodeExample = require('!!raw-loader!./template-data/tooltip-template-demo.component.html');

    apiParameters = apiParameters;

    ngOnInit() {}

    triggerChange() {
        this.refreshTooltips();
    }

    refreshTooltips() {
        this.showTooltips = false;

        setTimeout(() => {
            this.showTooltips = true;
        }, 10);
    }
}
