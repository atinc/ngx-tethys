import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton } from 'ngx-tethys/button';
import { ThyFormGroup, ThyFormDirective } from 'ngx-tethys/form';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { ThyOption } from 'ngx-tethys/shared';
import { ThySelect } from 'ngx-tethys/select';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { ThyCheckbox } from 'ngx-tethys/checkbox';

@Component({
    selector: 'thy-tooltip-basic-example',
    templateUrl: './basic.component.html',
    imports: [
        FormsModule,
        ThyFormDirective,
        ThyFormGroup,
        ThySelect,
        ThyOption,
        ThyInputNumber,
        ThyTooltipDirective,
        ThyButton,
        ThyCheckbox
    ]
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
