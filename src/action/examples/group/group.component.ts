import { Component, OnInit } from '@angular/core';
import { ThyAction, ThyActions } from 'ngx-tethys/action';

@Component({
    selector: 'thy-action-group-example',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
    imports: [ThyAction, ThyActions]
})
export class ThyActionGroupExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
