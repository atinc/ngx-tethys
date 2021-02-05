import { Component, ViewEncapsulation } from '@angular/core';
import { ThyDividerStyle, ThyDividerTextDirection } from 'ngx-tethys/divider';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'thy-divider-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyDividerBasicExampleComponent {
    public thyStyleMode: ThyDividerStyle = 'solid';
    public thyTextDirectionMode: ThyDividerTextDirection = 'center';
    public thyHeavyMode = false;

    constructor() {}
}
