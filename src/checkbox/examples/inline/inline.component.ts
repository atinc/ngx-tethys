import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-checkbox-inline-example',
    templateUrl: './inline.component.html',
    standalone: false
})
export class ThyCheckboxInlineExampleComponent implements OnInit {
    public inlineStatus = true;

    constructor() {}

    ngOnInit() {}
}
