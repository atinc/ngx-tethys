import { Component, Optional, SkipSelf } from '@angular/core';
import { ThySlideService } from '../../../../../src/slide/slide.service';
import { ThyDrawerContainerDirective } from '../../../../../src/slide/drawer/drawer-container.directive';
import { ThySlideFromTypes, ThySlideMode } from 'ngx-tethys/slide/slide.config';
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

    public hasOffset = false;

    public thySlideMode: ThySlideMode = 'over';

    constructor(
        private thySlideNewService: ThySlideService,
        @Optional() @SkipSelf() private thyDrawerContainer: ThyDrawerContainerDirective
    ) {}

    showSlideById(key: string, originTrigger?: Event) {
        this.thySlideNewService.open(DemoSlideExampleComponent, {
            key: key,
            from: this.thySlideFrom,
            hasBackdrop: this.hasBackdrop,
            panelClass: this.thySlideClass,
            offset: this.hasOffset ? 60 : 0,
            origin: originTrigger ? originTrigger.currentTarget : null,
            initialState: { name: 'slide', slideType: this.thySlideType },
            mode: this.thySlideMode,
            width: '300',
            drawerContainer: '#demo-content'
        });
    }

    showSlideByElementRef(key: string, originTrigger?: Event) {
        this.thySlideNewService.open(DemoSlideExampleComponent, {
            key: key,
            from: this.thySlideFrom,
            hasBackdrop: this.hasBackdrop,
            panelClass: this.thySlideClass,
            offset: this.hasOffset ? 60 : 0,
            origin: originTrigger ? originTrigger.currentTarget : null,
            initialState: { name: 'slide', slideType: this.thySlideType },
            mode: this.thySlideMode,
            width: '300',
            drawerContainer: this.thyDrawerContainer.elementRef
        });
    }
}
