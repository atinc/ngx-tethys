import { Component } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';

@Component({
    selector: 'thy-icon-twotone-example',
    templateUrl: './twotone.component.html',
    styleUrls: ['./twotone.component.scss'],
    imports: [ThyIcon, ThyTooltipDirective]
})
export class ThyIconTwotoneExampleComponent {
    ttColor = '#52c41a';

    changeColor() {
        this.ttColor = '#ff5b57';
    }
}
