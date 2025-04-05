import { Component } from '@angular/core';
import { ThySlideLayout, ThySlideHeader, ThySlideBody } from 'ngx-tethys/slide';

@Component({
    selector: 'thy-slide-demo-content',
    templateUrl: './slide-content.component.html',
    imports: [ThySlideLayout, ThySlideHeader, ThySlideBody]
})
export class ThySlideDemoContentComponent {
    constructor() {}
}
