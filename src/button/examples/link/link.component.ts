import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-button-link-example',
    templateUrl: './link.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyButton]
})
export class ThyButtonLinkExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
