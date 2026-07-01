import { Component } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { THY_GLOBAL_CONFIG } from 'ngx-tethys/core';
import { ThyPopover, ThyPopoverBody, ThyPopoverDirective, ThyPopoverHeader } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-popover-flexible-position-example',
    templateUrl: './flexible-position.component.html',
    styleUrls: ['./flexible-position.component.scss'],
    imports: [ThyButton, ThyPopoverDirective, ThyPopoverHeader, ThyPopoverBody],
    providers: [
        ThyPopover,
        {
            provide: THY_GLOBAL_CONFIG,
            useValue: {
                overlay: {
                    flexiblePosition: false
                }
            }
        }
    ]
})
export class ThyPopoverFlexiblePositionExampleComponent {}
