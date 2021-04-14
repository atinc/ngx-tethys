import { ThySlideService } from 'ngx-tethys/slide';

import { Component } from '@angular/core';

import { ThySlideDemoContentComponent } from '../slide-content.component';

@Component({
    selector: 'thy-slide-mode-example',
    templateUrl: './mode.component.html'
})
export class ThySlideModeExampleComponent {
    constructor(private thySlideNewService: ThySlideService) {}

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
