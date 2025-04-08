import { Component, OnInit } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-button-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyButton, ThySpace, ThySpaceItemDirective, ThyIcon]
})
export class ThyButtonBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
