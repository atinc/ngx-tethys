import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-action-text-example',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAction]
})
export class ThyActionTextExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
