import { Component, ElementRef, HostBinding, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/platform-browser';
import { ThyUpperOverlayContainer } from '../core/overlay';
import { Observable } from 'rxjs';
import { AnimationEvent } from '@angular/animations';
import { slideUpperOverlayOptions, ThySlideConfig, ThySlideFromTypes } from './slide.config';
import { filter } from 'rxjs/operators';
import { thySlideAnimations } from './slide-animations';

@Component({
    selector: 'thy-slide-container',
    template: `
        <ng-template cdkPortalOutlet></ng-template>
    `,
    animations: [thySlideAnimations.slideContainer],
    host: {
        class: 'thy-slide-container',
        tabindex: '-1',
        '[attr.role]': `'slide'`,
        '[@slideContainer]': 'animationState',
        '(@slideContainer.start)': 'onAnimationStart($event)',
        '(@slideContainer.done)': 'onAnimationDone($event)'
    }
})
export class ThySlideContainerComponent extends ThyUpperOverlayContainer {
    @ViewChild(CdkPortalOutlet)
    portalOutlet: CdkPortalOutlet;

    animationOpeningDone: Observable<AnimationEvent>;

    animationClosingDone: Observable<AnimationEvent>;

    animationState: ThySlideFromTypes = 'void';

    @HostBinding('class') slideClass = `thy-slide-container`;

    constructor(
        private elementRef: ElementRef,
        @Inject(DOCUMENT) private document: any,
        public config: ThySlideConfig,
        changeDetectorRef: ChangeDetectorRef
    ) {
        super(slideUpperOverlayOptions, changeDetectorRef);
        this.animationOpeningDone = this.animationStateChanged.pipe(
            filter((event: AnimationEvent) => {
                return event.phaseName === 'done' && event.toState === 'void';
            })
        );
        this.animationClosingDone = this.animationStateChanged.pipe(
            filter((event: AnimationEvent) => {
                return event.phaseName === 'done' && event.toState === 'exit';
            })
        );
    }

    beforeAttachPortal(): void {}

    onAnimationDone(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    onAnimationStart(event: AnimationEvent) {
        this.animationState = this.config.from;
        this.animationStateChanged.emit(event);
    }
}
