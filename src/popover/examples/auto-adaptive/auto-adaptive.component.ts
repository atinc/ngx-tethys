import { ThyPopover, ThyPopoverConfig } from 'ngx-tethys/popover';
import { Component, OnInit, inject } from '@angular/core';
import { ThyPopoverAutoAdaptiveContentComponent } from './auto-adaptive-content.component';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-popover-auto-adaptive-example',
    templateUrl: './auto-adaptive.component.html',
    imports: [ThyButton]
})
export class ThyPopoverAutoAdaptiveExampleComponent implements OnInit {
    private thyPopover = inject(ThyPopover);

    config: Partial<ThyPopoverConfig<unknown>> = {
        hasBackdrop: true,
        backdropClosable: true,
        placement: 'top',
        originActiveClass: 'active'
    };

    content = ThyPopoverAutoAdaptiveContentComponent;

    ngOnInit(): void {}

    openPopover(event: Event) {
        this.thyPopover.open(ThyPopoverAutoAdaptiveContentComponent, {
            ...this.config,
            autoAdaptive: true,
            origin: event.currentTarget as HTMLElement,
            panelClass: 'demo-popover',
            width: '200px'
        });
    }
}
