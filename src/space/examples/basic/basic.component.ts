import { Component, OnInit } from '@angular/core';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-space-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    host: {},
    imports: [ThySpace, ThySpaceItemDirective, ThyButton]
})
export class ThySpaceBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
