import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyText, ThyTextColorDirective } from 'ngx-tethys/typography';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-typography-text-example',
    templateUrl: './text.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyText, ThySpace, ThySpaceItemDirective, ThyTextColorDirective]
})
export class ThyTypographyTextExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
