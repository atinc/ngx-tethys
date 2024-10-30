import { ThyPopover } from 'ngx-tethys/popover';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';

@Component({
    selector: 'thy-popover-can-push-example',
    templateUrl: './can-push.component.html'
})
export class ThyPopoverCanPushExampleComponent implements OnInit {
    private thyPopover = inject(ThyPopover);
    private overlay = inject(Overlay);

    public config = {};

    ngOnInit(): void {
        this.config = {
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            canPush: false
        };
    }

    openTemplate(event: Event, template: TemplateRef<HTMLElement>) {
        this.thyPopover.open(
            template,
            Object.assign(
                {
                    origin: event.currentTarget as HTMLElement
                },
                this.config
            )
        );
    }
}
