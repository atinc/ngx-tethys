import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[thyAlertActionItem]' })
export class ThyAlertActionItemDirective {
    @HostBinding('class.thy-alert-action') class = true;

    constructor() {}
}
