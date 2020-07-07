import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'app-back-top-custom-example',
    templateUrl: './custom.component.html'
})
export class ThyBackTopCustomExampleComponent implements OnInit {
    @HostBinding('class.app-back-top-custom-example-custom') classNames = true;

    constructor() {}

    ngOnInit(): void {}

    notify(): void {
        console.log('notify');
    }
}
