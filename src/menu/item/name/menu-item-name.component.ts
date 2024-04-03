import { Component, OnInit, HostBinding, Input, booleanAttribute } from '@angular/core';

/**
 * 菜单项名称
 * @name thy-menu-item-name,[thy-menu-item-name],[thyMenuItemName]
 * @order 20
 */
@Component({
    selector: 'thy-menu-item-name,[thy-menu-item-name],[thyMenuItemName]',
    templateUrl: './menu-item-name.component.html',
    host: {
        class: 'thy-menu-item-name'
    },
    standalone: true
})
export class ThyMenuItemName implements OnInit {
    /**
     * 是否 ellipsis
     */
    @HostBinding('class.thy-menu-item-name-ellipsis')
    @Input({ transform: booleanAttribute })
    thyOverflowEllipsis = true;

    constructor() {}

    ngOnInit(): void {}
}
