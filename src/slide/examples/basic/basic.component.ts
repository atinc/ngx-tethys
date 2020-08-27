import { Component, Optional, SkipSelf } from '@angular/core';
import { ThySlideService } from 'ngx-tethys/slide';
import { ThySlideFromTypes, ThySlideMode, ThySlideConfig } from 'ngx-tethys/slide/slide.config';
import { ThySlideBasicLayoutExampleComponent } from '../basic-layout/basic-layout.component';

@Component({
    selector: 'thy-slide-basic-example',
    templateUrl: './basic.component.html'
})
export class ThySlideBasicExampleComponent {
    public thySlideFrom: ThySlideFromTypes = 'right';

    public hasBackdrop = true;

    public thySlideType = 'slide';

    public hasOffset = false;

    public hasDrawerContainer = false;

    public thySlideMode: ThySlideMode = 'over';

    constructor(private thySlideNewService: ThySlideService) {}

    showSlideById(id: string, originTrigger?: Event) {
        const config: ThySlideConfig = {
            id,
            from: this.thySlideFrom,
            hasBackdrop: this.hasBackdrop,
            panelClass: this.thySlideFrom === 'left' || this.thySlideFrom === 'right' ? 'thy-slide' : 'thy-slide-lg',
            offset: this.hasOffset ? 60 : 0,
            origin: originTrigger ? originTrigger.currentTarget : null,
            initialState: { name: 'slide', slideType: this.thySlideType },
            mode: this.thySlideMode
        };
        if (this.hasDrawerContainer) {
            config.drawerContainer = 'dg-channel';
        }
        this.thySlideNewService.open(ThySlideBasicLayoutExampleComponent, config);
    }
}
