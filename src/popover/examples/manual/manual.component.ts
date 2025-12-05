import { ThyPopoverBody, ThyPopoverConfig, ThyPopoverHeader , ThyPopover } from 'ngx-tethys/popover';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ThyPopoverManualContentComponent } from './popover-content.component';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-popover-manual-example',
    templateUrl: './manual.component.html',
    styleUrls: ['./manual.component.scss'],
    imports: [ThyButton, ThyPopoverHeader, ThyPopoverBody]
})
export class ThyPopoverManualExampleComponent implements OnInit {
    private thyPopover = inject(ThyPopover);

    config: Partial<ThyPopoverConfig<unknown>> = {
        hasBackdrop: true,
        backdropClosable: true,
        placement: 'bottom',
        originActiveClass: 'active'
    };

    content = ThyPopoverManualContentComponent;

    ngOnInit(): void {}

    openComponent(event: Event) {
        const popoverRef = this.thyPopover.open(ThyPopoverManualContentComponent, {
            ...this.config,
            origin: event.currentTarget as HTMLElement
        });
        popoverRef.afterOpened().subscribe(() => {});
    }

    openTemplate(event: Event, template: TemplateRef<HTMLElement>) {
        this.thyPopover.open(template, {
            ...this.config,
            origin: event.currentTarget as HTMLElement
        });
    }
}
