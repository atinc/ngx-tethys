import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-strength-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyStrengthBasicExampleComponent implements OnInit {
    public strength = 2;

    constructor() {}

    ngOnInit() {}
}
