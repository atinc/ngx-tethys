import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyStrength } from 'ngx-tethys/strength';

@Component({
    selector: 'app-strength-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyStrength, FormsModule]
})
export class ThyStrengthBasicExampleComponent implements OnInit {
    public strength = 2;

    constructor() {}

    ngOnInit() {}
}
