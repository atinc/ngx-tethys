import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-button-pair-example',
    templateUrl: './pair.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyButton]
})
export class ThyButtonPairExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
