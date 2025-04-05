import { ThySlideBody, ThySlideHeader, ThySlideLayout, ThySlideService } from 'ngx-tethys/slide';
import { Component, TemplateRef, inject } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThySlideDemoContentComponent } from '../slide-content.component';

@Component({
    selector: 'thy-slide-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyButton, ThySlideLayout, ThySlideHeader, ThySlideBody]
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
