import { Component } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-button-link-example',
    templateUrl: './link.component.html',
    imports: [ThyButton, ThySpace, ThySpaceItemDirective]
})
export class ThyButtonLinkExampleComponent {}
