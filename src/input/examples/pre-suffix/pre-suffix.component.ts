import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInputDirective, ThyInputGroup } from 'ngx-tethys/input';
import { ThyRowDirective, ThyColDirective } from 'ngx-tethys/grid';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyTag } from 'ngx-tethys/tag';

@Component({
    selector: 'thy-input-pre-suffix-example',
    templateUrl: './pre-suffix.component.html',
    imports: [ThyInputGroup, ThyInputDirective, ThyTag, ThyDivider, ThyRowDirective, ThyColDirective, ThyIcon, FormsModule]
})
export class ThyInputPreSuffixExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
