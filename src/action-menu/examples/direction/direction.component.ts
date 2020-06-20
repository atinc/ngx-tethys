import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-action-menu-direction-example',
    templateUrl: './direction.component.html'
})
export class ThyActionMenuDirectionExampleComponent implements OnInit {
    direction: 'left' | 'right' | 'auto' = 'auto';

    constructor() {}

    ngOnInit(): void {}
}
