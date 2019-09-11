import { Component } from '@angular/core';
import { ThySlideService } from '../../../../../src/slide/slide.service';
import { ThySlideFromTypes } from 'ngx-tethys/slide/slide.config';
import { DemoSlideExampleComponent } from './slide-example.component';

@Component({
    selector: 'demo-slide-content',
    templateUrl: './slide-content.component.html'
})
export class DemoSlideContentComponent {
    public thySlideFrom: ThySlideFromTypes = 'right';

    public thySlideClass = 'thy-slide';

    public hasBackdrop = true;

    public thySlideType = 'slide-layout-3';

    constructor(private thySlideNewService: ThySlideService) {}

    showSlide(key: string) {
        this.thySlideNewService.open(DemoSlideExampleComponent, {
            id: key,
            from: this.thySlideFrom, // 'left','right','top','bottom'
            class: this.thySlideClass,
            hasBackdrop: this.hasBackdrop,
            containerClass: 'slide-container-class',
            panelClass: this.thySlideClass,
            initialState: { name: 'slide', slideType: this.thySlideType }
        });
    }
}
