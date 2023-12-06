import { ThyPopover } from 'ngx-tethys/popover';
import { Component, TemplateRef } from '@angular/core';

@Component({
    selector: 'thy-popover-disabled-animation-example',
    templateUrl: './disabled-animation.component.html'
})
export class ThyPopoverDisabledAnimationExampleComponent {
    constructor(private thyPopover: ThyPopover) {}

    openTemplate(event: Event, template: TemplateRef<HTMLElement>) {
        this.thyPopover.open(template, {
            origin: event.currentTarget as HTMLElement,
            disabledAnimation: true
        });
    }
}
