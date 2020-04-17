import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-raster-basic',
    templateUrl: './basic.component.html'
})
export class DemoRasterBasicComponent implements OnInit {
    list = new Array(10);

    constructor() {}

    ngOnInit() {}
}
