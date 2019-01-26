import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-menu-divider,[thy-menu-divider],[thyMenuDivider]',
    templateUrl: './menu-divider.component.html'
})
export class ThyMenuDividerComponent implements OnInit {
    @HostBinding('class.thy-menu-divider') isThyMenuDivider = true;

    constructor() {}

    ngOnInit(): void {}
}
