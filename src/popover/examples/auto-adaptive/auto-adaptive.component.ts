import { ThyPopoverConfig } from 'ngx-tethys/popover';
import { Component, OnInit } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyPopoverAutoAdaptiveContentComponent } from './auto-adaptive-content.component';

@Component({
    selector: 'thy-popover-auto-adaptive-example',
    templateUrl: './auto-adaptive.component.html'
})
export class ThyPopoverAutoAdaptiveExampleComponent implements OnInit {
    config: Partial<ThyPopoverConfig<unknown>> = {
        hasBackdrop: true,
        backdropClosable: true,
        placement: 'top',
        originActiveClass: 'active'
    };

    contentComponent = ThyPopoverAutoAdaptiveContentComponent;

    constructor(private thyPopover: ThyPopover) {}

    ngOnInit(): void {}

    openPopoverAsyncFetchData(event: Event) {
        this.thyPopover.open(ThyPopoverAutoAdaptiveContentComponent, {
            ...this.config,
            autoAdaptive: true,
            origin: event.currentTarget as HTMLElement,
            panelClass: 'demo-popover'
        });
    }
}
