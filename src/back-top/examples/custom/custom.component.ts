import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-back-top-custom-example',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.scss']
})
export class ThyBackTopCustomExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    notify(): void {
        console.log('notify');
    }
}
