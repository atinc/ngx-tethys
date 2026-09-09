import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-action-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAction, ThyIcon]
})
export class ThyActionBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
