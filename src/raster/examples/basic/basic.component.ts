import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-raster-basic-example',
    templateUrl: './basic.component.html',
    host: {
        class: 'rester-section'
    }
})
export class ThyRasterBasicExampleComponent implements OnInit {
    list = new Array(10);

    constructor() { }

    ngOnInit() { }
}
