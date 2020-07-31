import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-card-basic-example', //app-demo-card-basic
    templateUrl: './basic.component.html'
})
export class ThyCardBasicExampleComponent implements OnInit {
    hasLeftRightPadding = true;

    headerSize = '';

    contentSize = '';

    contentAlignTitle = false;

    constructor() {}

    ngOnInit(): void {}
}
