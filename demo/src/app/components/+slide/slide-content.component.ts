import { Component, ElementRef } from '@angular/core';
import { ThySlideService } from '../../../../../src/slide/slide.service';
import { ThySlideFromTypes } from 'ngx-tethys/slide/slide.config';
import { DemoSlideExampleComponent } from './slide-example.component';
import { coerceElement } from '@angular/cdk/coercion';

@Component({
    selector: 'demo-slide-content',
    templateUrl: './slide-content.component.html'
})
export class DemoSlideContentComponent {
    public thySlideFrom: ThySlideFromTypes = 'right';

    public thySlideClass = 'thy-slide';

    public hasBackdrop = true;

    public thySlideType = 'slide-layout-3';

    public hasOffset = false;

    constructor(private thySlideNewService: ThySlideService) {}

    showSlide(key: string, originTrigger?: Event) {
        this.thySlideNewService.open(DemoSlideExampleComponent, {
            key: key,
            from: this.thySlideFrom,
            hasBackdrop: this.hasBackdrop,
            panelClass: this.thySlideClass,
            offset: this.hasOffset ? 60 : 0,
            origin: originTrigger ? originTrigger.currentTarget : null,
            initialState: { name: 'slide', slideType: this.thySlideType }
        });
    }
}
