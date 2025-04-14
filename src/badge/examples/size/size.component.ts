import { Component, OnInit } from '@angular/core';
import { ThyBadge } from 'ngx-tethys/badge';

@Component({
    selector: 'thy-badge-size-example',
    templateUrl: './size.component.html',
    styleUrls: ['./size.component.scss'],
    imports: [ThyBadge]
})
export class ThyBadgeSizeExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
