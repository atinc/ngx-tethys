import { Component, OnInit } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-button-block-example',
    templateUrl: './block.component.html',
    imports: [ThyButton]
})
export class ThyButtonBlockExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
