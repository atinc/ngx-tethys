import { Component } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-button-fill-example',
    templateUrl: './fill.component.html',
    imports: [ThyButton, ThySpace, ThySpaceItemDirective]
})
export class ThyButtonFillExampleComponent {}
