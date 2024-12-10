import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-radio-toggle-inline-example',
    templateUrl: './toggle-inline.component.html',
    standalone: false
})
export class ThyRadioToggleInlineExampleComponent implements OnInit {
    public inlineStatus = false;

    constructor() {}

    ngOnInit() {}
}
