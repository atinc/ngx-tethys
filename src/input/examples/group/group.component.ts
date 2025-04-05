import { Component, OnInit } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyInputGroup } from 'ngx-tethys/input';
import { ThyRowDirective, ThyColDirective } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-input-group-example',
    templateUrl: './group.component.html',
    imports: [ThyIcon, ThyRowDirective, ThyColDirective, ThyInputGroup]
})
export class ThyInputGroupExampleComponent implements OnInit {
    public value: any;

    constructor() {}

    ngOnInit() {}
}
