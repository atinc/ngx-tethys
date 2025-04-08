import { Component, OnInit } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyMenu, ThyMenuItem, ThyMenuItemIcon } from 'ngx-tethys/menu';

@Component({
    selector: 'thy-menu-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyMenu, ThyMenuItem, ThyMenuItemIcon, ThyDivider, ThyIcon]
})
export class ThyMenuBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
