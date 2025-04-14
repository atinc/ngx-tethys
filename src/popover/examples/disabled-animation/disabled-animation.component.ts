import { ThyPopover, ThyPopoverDirective, ThyPopoverHeader, ThyPopoverBody } from 'ngx-tethys/popover';
import { Component, TemplateRef, inject } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-popover-disabled-animation-example',
    templateUrl: './disabled-animation.component.html',
    imports: [ThyButton, ThyPopoverDirective, ThyPopoverHeader, ThyPopoverBody]
})
export class ThyPopoverDisabledAnimationExampleComponent {
    private thyPopover = inject(ThyPopover);

    openTemplate(event: Event, template: TemplateRef<HTMLElement>) {
        this.thyPopover.open(template, {
            origin: event.currentTarget as HTMLElement,
            animationDisabled: true
        });
    }
}
