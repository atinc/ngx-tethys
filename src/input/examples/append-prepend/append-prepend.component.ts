import { Component, OnInit } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyInput } from 'ngx-tethys/input';
import { ThyTag } from 'ngx-tethys/tag';
import { ThyRowDirective, ThyColDirective } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-input-append-prepend-example',
    templateUrl: './append-prepend.component.html',
    imports: [ThyIcon, ThyTag, ThyRowDirective, ThyColDirective, ThyInput]
})
export class ThyInputAppendPrependExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
