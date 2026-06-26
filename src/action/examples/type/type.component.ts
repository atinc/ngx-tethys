import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-action-type-example',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAction]
})
export class ThyActionTypeExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
