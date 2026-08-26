import { Component, OnInit } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-button-appearance-example',
    templateUrl: './appearance.component.html',
    imports: [ThyButton, ThySpace, ThySpaceItemDirective]
})
export class ThyButtonAppearanceExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
