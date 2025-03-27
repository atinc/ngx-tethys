import { ThySlideConfig, ThySlideFromTypes, ThySlideService } from 'ngx-tethys/slide';

import { Component, inject } from '@angular/core';

import { ThySlideDemoContentComponent } from '../slide-content.component';

@Component({
    selector: 'thy-slide-direction-example',
    templateUrl: './direction.component.html',
    standalone: false
})
export class ThySlideDirectionExampleComponent {
    private thySlideNewService = inject(ThySlideService);

    position: ThySlideFromTypes = 'right';

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
