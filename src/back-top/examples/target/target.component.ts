import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'app-back-top-target-example',
    templateUrl: './target.component.html'
})
export class ThyBackTopTargetExampleComponent implements OnInit {
    @HostBinding('class.app-back-top-target-example-container') classNames = true;

    constructor() {}

    ngOnInit(): void {}
}
