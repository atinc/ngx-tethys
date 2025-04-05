import { Component, OnInit } from '@angular/core';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';

@Component({
    selector: 'thy-nav-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyNav, ThyNavItemDirective]
})
export class ThyNavBasicExampleComponent implements OnInit {
    public activeIndex = 0;

    public navList = [
        { index: 0, name: 'Item 1', disabled: false },
        { index: 1, name: 'Item 2', disabled: false },
        { index: 2, name: 'Item 3', disabled: false },
        { index: 3, name: 'Item 4', disabled: true },
        { index: 4, name: 'Item 5', disabled: false }
    ];

    constructor() {}

    ngOnInit(): void {}
}
