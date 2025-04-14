import { ThySlideService } from 'ngx-tethys/slide';
import { Component, inject } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThySlideDemoContentComponent } from '../slide-content.component';

@Component({
    selector: 'thy-slide-mode-example',
    templateUrl: './mode.component.html',
    imports: [ThyButton]
})
export class ThySlideModeExampleComponent {
    private thySlideNewService = inject(ThySlideService);

    push() {
        this.thySlideNewService.open(ThySlideDemoContentComponent, {
            id: 'push',
            mode: 'push',
            drawerContainer: 'dg-channel'
        });
    }

    over() {
        this.thySlideNewService.open(ThySlideDemoContentComponent, {
            id: 'over',
            mode: 'over',
            drawerContainer: 'dg-channel'
        });
    }

    side() {
        this.thySlideNewService.open(ThySlideDemoContentComponent, {
            id: 'slide',
            mode: 'side',
            drawerContainer: 'dg-channel'
        });
    }
}
