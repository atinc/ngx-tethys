import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyCard, ThyCardContent, ThyCardHeader } from 'ngx-tethys/card';
import { ThyButtonIcon } from 'ngx-tethys/button';

@Component({
    selector: 'thy-card-divided-example', // app-demo-card-divided
    templateUrl: './divided.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCard, ThyCardHeader, ThyButtonIcon, ThyCardContent]
})
export class ThyCardDividedExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
