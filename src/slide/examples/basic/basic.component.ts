import { ThySlideService } from 'ngx-tethys/slide';

import { Component, TemplateRef, inject } from '@angular/core';

import { ThySlideDemoContentComponent } from '../slide-content.component';

@Component({
    selector: 'thy-slide-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThySlideBasicExampleComponent {
    private thySlideNewService = inject(ThySlideService);

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
