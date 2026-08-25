import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-action-feedback-example',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAction]
})
export class ThyActionFeedbackExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
