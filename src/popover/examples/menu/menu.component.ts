import { Component, OnInit } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyDropdownMenuComponent, ThyDropdownMenuItemDirective } from 'ngx-tethys/dropdown';
import { ThyPopoverDirective } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-popover-menu-example',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    imports: [ThyButton, ThyDropdownMenuComponent, ThyDropdownMenuItemDirective, ThyPopoverDirective]
})
export class ThyPopoverMenuExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
