import { Component, OnInit } from '@angular/core';
import { ThyButtonIcon } from 'ngx-tethys/button';

@Component({
    selector: 'thy-button-btn-icon-example',
    templateUrl: './btn-icon.component.html',
    imports: [ThyButtonIcon]
})
export class ThyButtonBtnIconExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
