import { Component, OnInit } from '@angular/core';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';

@Component({
    selector: 'thy-nav-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyNav, ThyNavItemDirective]
})
export class ThyNavBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
