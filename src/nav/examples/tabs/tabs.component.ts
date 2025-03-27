import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-nav-tabs-example',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    standalone: false
})
export class ThyNavTabsExampleComponent implements OnInit {
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
