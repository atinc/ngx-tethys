import { Component, input, OnInit } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 菜单项名称
 * @name thy-menu-item-name,[thy-menu-item-name],[thyMenuItemName]
 * @order 20
 */
@Component({
    selector: 'thy-menu-item-name,[thy-menu-item-name],[thyMenuItemName]',
    templateUrl: './menu-item-name.component.html',
    host: {
        class: 'thy-menu-item-name',
        '[class.thy-menu-item-name-ellipsis]': 'thyOverflowEllipsis()'
    }
})
export class ThyMenuItemName implements OnInit {
    /**
     * 是否 ellipsis
     */
    readonly thyOverflowEllipsis = input(true, { transform: coerceBooleanProperty });

    constructor() {}

    ngOnInit(): void {}
}
