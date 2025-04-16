import { Component, OnInit } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-link-active-example',
    templateUrl: './active.component.html',
    styleUrls: ['./active.component.scss'],
    imports: [ThyIcon]
})
export class ThyLinkActiveExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
