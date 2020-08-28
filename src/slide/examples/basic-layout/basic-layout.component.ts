import { Component, TemplateRef } from '@angular/core';
import { ThyPopover } from 'ngx-tethys';

@Component({
    selector: 'thy-slide-basic-layout-example',
    templateUrl: './basic-layout.component.html',
    styleUrls: ['./basic-layout.component.scss']
})
export class ThySlideBasicLayoutExampleComponent {
    public name: string;

    public slideType = '';

    constructor(public thyPopover: ThyPopover) {}

    addPopOver(event: Event, template: TemplateRef<HTMLElement>) {
        this.thyPopover.open(template, {
            origin: event.currentTarget as HTMLElement,
            panelClass: 'slide-inner-popover'
        });
    }
}
