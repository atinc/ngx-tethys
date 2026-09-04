import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThySlideBody, ThySlideBodySection, ThySlideFooter, ThySlideHeader, ThySlideLayout } from 'ngx-tethys/slide';

@Component({
    selector: 'thy-slide-layout-example',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySlideLayout, ThySlideHeader, ThySlideBody, ThySlideFooter, ThySlideBodySection]
})
export class ThySlideLayoutExampleComponent {
    constructor() {}
}
