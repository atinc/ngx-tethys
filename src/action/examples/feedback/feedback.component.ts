import { Component, OnInit } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-action-feedback-example',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss'],
    imports: [ThyAction]
})
export class ThyActionFeedbackExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
