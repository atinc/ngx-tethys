import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-back-top-custom-example',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.scss'],
    standalone: false
})
export class ThyBackTopCustomExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    notify(): void {
        console.log('notify');
    }
}
