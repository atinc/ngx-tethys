import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-checkbox-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyCheckboxBasicExampleComponent implements OnInit {
    checked = false;

    constructor() {}

    ngOnInit() {}
}
