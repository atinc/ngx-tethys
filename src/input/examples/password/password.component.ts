import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRowDirective, ThyColDirective } from 'ngx-tethys/grid';
import { ThyInput } from 'ngx-tethys/input';

@Component({
    selector: 'thy-input-password-example',
    templateUrl: './password.component.html',
    imports: [ThyInput, ThyRowDirective, ThyColDirective, FormsModule]
})
export class ThyInputPasswordExampleComponent implements OnInit {
    public value = '123456';

    constructor() {}

    ngOnInit() {}
}
