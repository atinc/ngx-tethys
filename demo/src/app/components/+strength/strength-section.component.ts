import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-strength-section',
    templateUrl: 'strength-section.component.html'
})
export class DemoStrengthComponent implements OnInit {
    strength = 2;
    constructor() {}

    ngOnInit() {}
}
