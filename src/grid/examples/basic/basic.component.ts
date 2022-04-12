import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-grid-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    host: {
        class: 'grid-section'
    }
})
export class ThyGridBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
