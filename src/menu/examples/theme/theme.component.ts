import { Component, OnInit, TemplateRef } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-menu-theme-example',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss']
})
export class ThyMenuThemeExampleComponent implements OnInit {
    theme: string = 'loose';

    constructor(private popover: ThyPopover) {}

    coll: boolean;

    ngOnInit(): void {}

    openActionMenu(event: Event, menuTpl: TemplateRef<any>) {
        this.popover.open(menuTpl, {
            origin: event.currentTarget as HTMLElement,
            placement: 'bottomLeft',
            insideClosable: true,
            originActiveClass: 'active'
        });
    }
}
