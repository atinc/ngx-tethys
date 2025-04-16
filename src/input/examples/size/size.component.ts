import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInput, ThyInputDirective } from 'ngx-tethys/input';
import { ThyRowDirective, ThyColDirective } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-input-size-example',
    templateUrl: './size.component.html',
    imports: [ThyInput, ThyInputDirective, ThyRowDirective, ThyColDirective, FormsModule]
})
export class ThyInputSizeExampleComponent implements OnInit {
    public value: any;

    constructor() {}

    ngOnInit() {}

    public enter() {
        console.log('enter', this.value);
    }
}
