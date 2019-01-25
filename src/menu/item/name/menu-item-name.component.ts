import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-menu-item-name,[thy-menu-item-name],[thyMenuItemName]',
    templateUrl: './menu-item-name.component.html'
})
export class ThyMenuItemNameComponent implements OnInit {
    @HostBinding('class.thy-menu-item-name') isThyMenuItemName = true;

    constructor() {}

    ngOnInit(): void {}
}
