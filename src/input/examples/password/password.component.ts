import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRowDirective, ThyColDirective } from 'ngx-tethys/grid';
import { ThyInput } from 'ngx-tethys/input';

@Component({
    selector: 'thy-input-password-example',
    templateUrl: './password.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyInput, ThyRowDirective, ThyColDirective, FormsModule]
})
export class ThyInputPasswordExampleComponent implements OnInit {
    public value = '123456';

    constructor() {}

    ngOnInit() {}
}
