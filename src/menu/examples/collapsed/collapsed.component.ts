import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-menu-collapsed-example',
    templateUrl: './collapsed.component.html',
    styleUrls: ['./collapsed.component.scss']
})
export class ThyMenuCollapsedExampleComponent implements OnInit {
    collapsed = true;

    constructor() {}

    ngOnInit(): void {}
}
