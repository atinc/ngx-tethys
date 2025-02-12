import { Component } from '@angular/core';

@Component({
    selector: 'thy-tooltip-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyTooltipBasicExampleComponent {
    showTooltips = true;
    tooltipConfig = {
        trigger: 'hover',
        disabled: false,
        showDelay: 200,
        hideDelay: 100,
        offset: 1,
        tooltipPin: true
    };

    public offsetOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];

    public triggerOptions = ['hover', 'focus', 'click'];

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
