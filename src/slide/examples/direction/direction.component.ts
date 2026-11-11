import { ThySlideConfig, ThySlideFromTypes, ThySlideService } from 'ngx-tethys/slide';
import { Component, inject } from '@angular/core';
import { ThyRadioGroup, ThyRadio } from 'ngx-tethys/radio';
import { FormsModule } from '@angular/forms';
import { ThySlideDemoContentComponent } from '../slide-content.component';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-slide-direction-example',
    templateUrl: './direction.component.html',
    imports: [ThyRadioGroup, FormsModule, ThyRadio, ThyButton]
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
