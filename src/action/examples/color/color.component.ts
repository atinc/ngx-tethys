import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-action-color-example',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAction]
})
export class ThyActionColorExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
