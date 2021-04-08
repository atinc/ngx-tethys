import { ThySlideService } from 'ngx-tethys/slide';

import { Component, TemplateRef } from '@angular/core';

@Component({
    selector: 'thy-slide-template-example',
    templateUrl: './template.component.html'
})
export class ThySlideTemplateExampleComponent {
    constructor(private thySlideNewService: ThySlideService) {}

    showSlide(template: TemplateRef<any>) {
        this.thySlideNewService.open(template, {
            id: 'basic'
        });
    }
}
