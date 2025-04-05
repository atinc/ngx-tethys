import { Component, OnInit } from '@angular/core';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThyText } from 'ngx-tethys/typography';

@Component({
    selector: 'thy-typography-background-example',
    templateUrl: './background.component.html',
    imports: [ThySpace, ThySpaceItemDirective, ThyText]
})
export class ThyTypographyBackgroundExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
