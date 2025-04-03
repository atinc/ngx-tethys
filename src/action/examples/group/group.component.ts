import { Component, OnInit } from '@angular/core';
import { ThyAction } from 'ngx-tethys/action';
import { ThyActions } from 'ngx-tethys/action';

@Component({
    selector: 'thy-action-group-example',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
    imports: [ThyActions, ThyAction]
})
export class ThyActionGroupExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
