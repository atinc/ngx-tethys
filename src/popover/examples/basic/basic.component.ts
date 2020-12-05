import { ThyPopoverConfig } from 'ngx-tethys/popover';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyPopoverBasicContentComponent } from './popover-content.component';

@Component({
    selector: 'thy-popover-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyPopoverBasicExampleComponent implements OnInit {
    config: Partial<ThyPopoverConfig<unknown>> = {
        hasBackdrop: true,
        backdropClosable: true,
        placement: 'bottom',
        originActiveClass: 'active'
    };

    constructor(private thyPopover: ThyPopover) {}

    ngOnInit(): void {}

    openPopover(event: Event) {
        this.thyPopover.open(ThyPopoverBasicContentComponent, {
            ...this.config,
            origin: event.currentTarget as HTMLElement,
            panelClass: 'demo-popover'
        });
    }

    openPopoverOutsideClosable(event: Event) {
        this.thyPopover.open(ThyPopoverBasicContentComponent, {
            ...this.config,
            origin: event.currentTarget as HTMLElement,
            panelClass: 'demo-popover'
        });
    }

    openTemplatePopover(event: Event, template: TemplateRef<HTMLElement>) {
        this.thyPopover.open(template, {
            ...this.config,
            origin: event.currentTarget as HTMLElement,
            panelClass: 'demo-popover'
        });
    }

    close() {
        this.thyPopover.close();
    }
}
