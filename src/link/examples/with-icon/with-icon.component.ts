import { Component, OnInit } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-link-with-icon-example',
    templateUrl: './with-icon.component.html',
    styleUrls: ['./with-icon.component.scss'],
    imports: [ThyIcon]
})
export class ThyLinkWithIconExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
