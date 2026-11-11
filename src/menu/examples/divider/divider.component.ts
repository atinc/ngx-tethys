import { Component, OnInit } from '@angular/core';
import { ThyMenu, ThyMenuGroup, ThyMenuItem, ThyMenuItemIcon, ThyMenuItemName, ThyMenuItemAction } from 'ngx-tethys/menu';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-menu-divider-example',
    templateUrl: './divider.component.html',
    styleUrls: ['./divider.component.scss'],
    imports: [ThyMenu, ThyMenuGroup, ThyMenuItem, ThyDivider, ThyIcon, ThyMenuItemIcon, ThyMenuItemName, ThyMenuItemAction]
})
export class ThyMenuDividerExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
