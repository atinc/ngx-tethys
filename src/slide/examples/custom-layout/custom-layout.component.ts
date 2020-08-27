import { Component, TemplateRef } from '@angular/core';

@Component({
    selector: 'thy-slide-custom-layout-example',
    templateUrl: './custom-layout.component.html',
    styleUrls: ['./custom-layout.component.scss']
})
export class ThySlideCustomLayoutExampleComponent {
    public name: string;

    public slideType = '';

    constructor() {}
}
