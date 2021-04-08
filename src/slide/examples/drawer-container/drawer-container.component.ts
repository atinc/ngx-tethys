import { ThySlideService } from 'ngx-tethys/slide';

import { Component } from '@angular/core';

import { ThySlideDemoContentComponent } from '../slide-content.component';

@Component({
    selector: 'thy-slide-drawer-container-example',
    templateUrl: './drawer-container.component.html',
    styleUrls: ['./drawer-container.component.scss']
})
export class ThySlideDrawerContainerExampleComponent {
    constructor(private thySlideNewService: ThySlideService) {}

    open() {
        this.thySlideNewService.open(ThySlideDemoContentComponent, {
            id: 'has-container',
            drawerContainer: 'dg-channel'
        });
    }
}
