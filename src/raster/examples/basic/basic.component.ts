import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-raster-basic-example',
    templateUrl: './basic.component.html',
    styleUrls:['./basic.component.scss'],
    host: {
        class: 'rester-section'
    }
})
export class ThyRasterBasicExampleComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
