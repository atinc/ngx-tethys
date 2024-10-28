import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-menu-group-example',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class ThyMenuGroupExampleComponent implements OnInit {
    private popover = inject(ThyPopover);


    ngOnInit(): void {}

    openActionMenu(event: Event, template: TemplateRef<any>) {
        this.popover.open(template, {
            origin: event.currentTarget as HTMLElement,
            insideClosable: true
        });
    }
}
