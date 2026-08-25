import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyInputDirective, ThyInputGroup } from 'ngx-tethys/input';
import { ThyRowDirective, ThyColDirective } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-input-group-example',
    templateUrl: './group.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyIcon, ThyRowDirective, ThyColDirective, ThyInputGroup, ThyInputDirective]
})
export class ThyInputGroupExampleComponent implements OnInit {
    public value: any;

    constructor() {}

    ngOnInit() {}
}
