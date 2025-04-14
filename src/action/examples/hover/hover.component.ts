import { Component, OnInit } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-action-hover-example',
    templateUrl: './hover.component.html',
    styleUrls: ['./hover.component.scss'],
    imports: [ThyAction]
})
export class ThyActionHoverExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
