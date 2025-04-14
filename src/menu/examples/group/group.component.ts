import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyMenu, ThyMenuItemName, ThyMenuGroup, ThyMenuItem, ThyMenuItemAction } from 'ngx-tethys/menu';

@Component({
    selector: 'thy-menu-group-example',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
    imports: [ThyMenu, ThyColDirective, ThyRowDirective, ThyDivider, ThyMenuGroup, ThyMenuItem, ThyMenuItemAction, ThyMenuItemName]
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
