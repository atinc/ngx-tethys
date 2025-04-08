import { Component, OnInit } from '@angular/core';
import { ThyInput, ThyInputDirective } from 'ngx-tethys/input';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-input-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyInput, ThyInputDirective, ThyColDirective, ThyRowDirective, FormsModule]
})
export class ThyInputBasicExampleComponent implements OnInit {
    public value: any;

    constructor() {}

    ngOnInit() {}

    public enter() {
        console.log('enter', this.value);
    }
}
