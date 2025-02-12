import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-input-autofocus-example',
    templateUrl: './autofocus.component.html',
    standalone: false
})
export class ThyInputAutofocusExampleComponent implements OnInit {
    autofocus = false;

    constructor() {}

    ngOnInit() {}
}
