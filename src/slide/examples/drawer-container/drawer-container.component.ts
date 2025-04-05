import { ThySlideService } from 'ngx-tethys/slide';
import { Component, inject } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThySlideDemoContentComponent } from '../slide-content.component';

@Component({
    selector: 'thy-slide-drawer-container-example',
    templateUrl: './drawer-container.component.html',
    styleUrls: ['./drawer-container.component.scss'],
    imports: [ThyButton]
})
export class ThySlideDrawerContainerExampleComponent {
    private thySlideNewService = inject(ThySlideService);

    open() {
        this.thySlideNewService.open(ThySlideDemoContentComponent, {
            id: 'has-container',
            drawerContainer: 'dg-channel'
        });
    }
}
