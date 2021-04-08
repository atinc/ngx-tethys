import { ThySlideService } from 'ngx-tethys/slide';

import { Component } from '@angular/core';

import { ThySlideDemoContentComponent } from '../slide-content.component';

@Component({
    selector: 'thy-slide-basic-example',
    templateUrl: './basic.component.html'
})
export class ThySlideBasicExampleComponent {
    constructor(private thySlideNewService: ThySlideService) {}

    showSlide() {
        this.thySlideNewService.open(ThySlideDemoContentComponent, {
            id: 'basic'
        });
    }
}
