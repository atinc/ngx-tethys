import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'thy-menu-item-name,[thy-menu-item-name],[thyMenuItemName]',
    templateUrl: './menu-item-name.component.html'
})
export class ThyMenuItemNameComponent implements OnInit {
    @HostBinding('class.thy-menu-item-name') isThyMenuItemName = true;

    @HostBinding('class.thy-menu-item-name-ellipsis')
    @Input()
    thyOverflowEllipsis = true;

    constructor() {}

    ngOnInit(): void {}
}
