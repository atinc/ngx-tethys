import { Component, OnInit, HostBinding, ElementRef } from '@angular/core';

@Component({
    selector: 'thy-menu,[thy-menu],[thyMenu]',
    templateUrl: './menu.component.html'
})
export class ThyMenuComponent implements OnInit {
    @HostBinding('class.thy-menu') isThyMenu = true;

    constructor() {}

    ngOnInit(): void {}
}
