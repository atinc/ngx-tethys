import { Component, OnInit } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-button-link-example',
    templateUrl: './link.component.html',
    imports: [ThyButton]
})
export class ThyButtonLinkExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
