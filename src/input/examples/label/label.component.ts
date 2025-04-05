import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyInput } from 'ngx-tethys/input';

@Component({
    selector: 'thy-input-label-example',
    templateUrl: './label.component.html',
    imports: [ThyInput, ThyRowDirective, ThyColDirective, ThyIcon, FormsModule]
})
export class ThyInputLabelExampleComponent implements OnInit {
    public value: string;

    constructor() {}

    ngOnInit() {}
}
