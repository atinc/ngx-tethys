import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-action-hover-example',
    templateUrl: './hover.component.html',
    styleUrls: ['./hover.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAction]
})
export class ThyActionHoverExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
