import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-card-basic',
    templateUrl: './basic.component.html'
})
export class DemoCardBasicComponent implements OnInit {
    hasLeftRightPadding = true;

    headerSize = '';

    contentSize = '';

    contentAlignTitle = false;

    constructor() {}

    ngOnInit(): void {}
}
