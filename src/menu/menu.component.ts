import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-menu,[thy-menu],[thyMenu]',
    templateUrl: './menu.component.html'
})
export class ThyMenuComponent implements OnInit {
    @HostBinding('class.thy-menu') isThyMenu = true;
    ngOnInit(): void {}
}
