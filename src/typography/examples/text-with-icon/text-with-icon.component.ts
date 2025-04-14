import { Component, OnInit } from '@angular/core';
import { ThyDivider } from 'ngx-tethys/divider';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyText, ThyTextColorDirective } from 'ngx-tethys/typography';

@Component({
    selector: 'thy-typography-text-with-icon-example',
    templateUrl: './text-with-icon.component.html',
    styleUrls: ['./text-with-icon.component.scss'],
    imports: [ThyText, ThyIcon, ThyDivider, ThyTextColorDirective, ThyFlexibleText]
})
export class ThyTypographyTextWithIconExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
