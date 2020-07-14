import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-action-menu-direction-example',
    templateUrl: './direction.component.html',
    styleUrls: ['./direction.component.scss']
})
export class ThyActionMenuDirectionExampleComponent implements OnInit {
    direction: 'left' | 'right' | 'auto' = 'auto';

    constructor() {}

    ngOnInit(): void {}
}
