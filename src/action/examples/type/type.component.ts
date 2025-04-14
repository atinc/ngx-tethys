import { Component, OnInit } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-action-type-example',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.scss'],
    imports: [ThyAction]
})
export class ThyActionTypeExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
