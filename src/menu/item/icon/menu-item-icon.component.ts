import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-menu-item-icon,[thy-menu-item-icon],[thyMenuItemIcon]',
    templateUrl: './menu-item-icon.component.html'
})
export class ThyMenuItemIconComponent implements OnInit {
    @HostBinding('class.thy-menu-item-icon') isThyMenuItemIcon = true;
    constructor() {}

    ngOnInit(): void {}
}
