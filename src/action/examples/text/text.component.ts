import { Component, OnInit } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-action-text-example',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
    imports: [ThyAction]
})
export class ThyActionTextExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
