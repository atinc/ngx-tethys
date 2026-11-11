import { Component, OnInit } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-action-color-example',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.scss'],
    imports: [ThyAction]
})
export class ThyActionColorExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
