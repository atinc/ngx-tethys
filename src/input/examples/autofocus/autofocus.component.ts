import { Component, OnInit } from '@angular/core';
import { ThyInput } from 'ngx-tethys/input';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-input-autofocus-example',
    templateUrl: './autofocus.component.html',
    imports: [ThyInput, ThyColDirective, ThyRowDirective, ThyButton]
})
export class ThyInputAutofocusExampleComponent implements OnInit {
    autofocus = false;

    constructor() {}

    ngOnInit() {}
}
