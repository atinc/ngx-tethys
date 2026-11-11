import { Component, OnInit } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-button-icon-example',
    templateUrl: './icon.component.html',
    imports: [ThyButton, ThyIcon, ThySpace, ThySpaceItemDirective]
})
export class ThyButtonIconExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
