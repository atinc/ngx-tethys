import { Component, OnInit } from '@angular/core';
import { ThyText } from 'ngx-tethys/typography';
import { ThySpace } from 'ngx-tethys/space';

@Component({
    selector: 'thy-typography-text-example',
    templateUrl: './text.component.html',
    imports: [ThyText, ThySpace]
})
export class ThyTypographyTextExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
