import { Component, OnInit } from '@angular/core';
import { ThyText } from 'ngx-tethys/typography';

@Component({
    selector: 'thy-typography-text-example',
    templateUrl: './text.component.html',
    imports: [ThyText]
})
export class ThyTypographyTextExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
