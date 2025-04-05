import { Component, OnInit } from '@angular/core';
import { ThyButton, ThyButtonIcon } from 'ngx-tethys/button';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-button-btn-icon-example',
    templateUrl: './btn-icon.component.html',
    imports: [ThyButtonIcon]
})
export class ThyButtonBtnIconExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
