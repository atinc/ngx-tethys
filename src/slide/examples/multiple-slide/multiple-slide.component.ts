import { Component, TemplateRef } from '@angular/core';
import { ThySlideDemoContentComponent } from '../slide-content.component';
import { ThySlideService } from 'ngx-tethys/slide';

@Component({
    selector: 'thy-slide-multiple-slide-example',
    templateUrl: './multiple-slide.component.html'
})
export class ThySlideMultipleSlideExampleComponent {
    constructor(private thySlideNewService: ThySlideService) {}

    showSlideWithComponent() {
        this.thySlideNewService.open(ThySlideDemoContentComponent, {
            id: 'withComponent',
            hasBackdrop: false,
            backdropClosable: false
        });
    }

    showSlideWithTemplate(template: TemplateRef<any>) {
        this.thySlideNewService.open(template, {
            id: 'withTemplate',
            hasBackdrop: false,
            backdropClosable: false
        });
    }

    showSlideWithTemplateWithoutId(template: TemplateRef<any>) {
        this.thySlideNewService.open(template, {
            hasBackdrop: false,
            backdropClosable: false
        });
    }
}
