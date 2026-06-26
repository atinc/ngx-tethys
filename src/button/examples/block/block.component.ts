import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-button-block-example',
    templateUrl: './block.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyButton]
})
export class ThyButtonBlockExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
