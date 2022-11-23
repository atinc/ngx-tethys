import { ThySlideService } from 'ngx-tethys/slide';

import { Component, TemplateRef } from '@angular/core';

import { ThySlideDemoContentComponent } from '../slide-content.component';

@Component({
    selector: 'thy-slide-basic-example',
    templateUrl: './basic.component.html'
})
export class ThySlideBasicExampleComponent {
    constructor(private thySlideNewService: ThySlideService) {}

    showSlideWithComponent() {
        this.thySlideNewService.open(ThySlideDemoContentComponent, {
            id: 'withComponent'
        });
    }

    showSlideWithTemplate(template: TemplateRef<any>) {
        this.thySlideNewService.open(template, {
            id: 'withTemplate'
        });
    }

    showSlideWithoutBackdrop() {
        this.thySlideNewService.open(ThySlideDemoContentComponent, {
            hasBackdrop: false
        });
    }

    showSlideNotCloseLatest() {
        this.thySlideNewService.open(ThySlideDemoContentComponent, {
            hasBackdrop: false,
            disableCloseLatest: true
        });
    }
}
