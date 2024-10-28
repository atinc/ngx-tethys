import { ThyPopover } from 'ngx-tethys/popover';
import { Component, TemplateRef, inject } from '@angular/core';

@Component({
    selector: 'thy-popover-disabled-animation-example',
    templateUrl: './disabled-animation.component.html'
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
