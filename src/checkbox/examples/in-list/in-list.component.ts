import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-checkbox-in-list-example',
    templateUrl: './in-list.component.html',
    standalone: false
})
export class ThyCheckboxInListExampleComponent implements OnInit {
    public inlineStatus = false;

    constructor() {}

    ngOnInit() {}
}
