import { ThySlideConfig, ThySlideFromTypes, ThySlideService } from 'ngx-tethys/slide';

import { Component } from '@angular/core';

import { ThySlideDemoContentComponent } from '../slide-content.component';

@Component({
    selector: 'thy-slide-direction-example',
    templateUrl: './direction.component.html'
})
export class ThySlideDirectionExampleComponent {
    position: ThySlideFromTypes = 'right';

    constructor(private thySlideNewService: ThySlideService) {}

    showSlide() {
        const config: ThySlideConfig = {
            id: 'basic',
            from: this.position
        };
        if (this.position === 'top' || this.position === 'bottom') {
            config.height = '200px';
        }
        this.thySlideNewService.open(ThySlideDemoContentComponent, config);
    }
}
