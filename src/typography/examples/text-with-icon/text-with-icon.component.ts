import { Component, OnInit } from '@angular/core';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyText } from 'ngx-tethys/typography';

@Component({
    selector: 'thy-typography-text-with-icon-example',
    templateUrl: './text-with-icon.component.html',
    styleUrls: ['./text-with-icon.component.scss'],
    imports: [ThyText, ThyIcon, ThyDivider]
})
export class ThyTypographyTextWithIconExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
