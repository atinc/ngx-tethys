import { Component } from '@angular/core';

@Component({
    selector: 'thy-tooltip-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyTooltipBasicExampleComponent {
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

    refreshTooltips() {
        this.showTooltips = false;

        setTimeout(() => {
            this.showTooltips = true;
        }, 10);
    }

    triggerChange() {
        this.refreshTooltips();
    }
}
