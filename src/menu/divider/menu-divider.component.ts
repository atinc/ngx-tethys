import { Component, OnInit, HostBinding } from '@angular/core';

/**
 * @name thy-menu-divider,[thy-menu-divider],[thyMenuDivider]
 */
@Component({
    selector: 'thy-menu-divider,[thy-menu-divider],[thyMenuDivider]',
    templateUrl: './menu-divider.component.html'
})
export class ThyMenuDivider implements OnInit {
    @HostBinding('class.thy-menu-divider') isThyMenuDivider = true;

    constructor() {}

    ngOnInit(): void {}
}
