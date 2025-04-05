import { Component, OnInit } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThySpace } from 'ngx-tethys/space';

@Component({
    selector: 'thy-button-outline-example',
    templateUrl: './outline.component.html',
    imports: [ThyButton, ThySpace]
})
export class ThyButtonOutlineExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
