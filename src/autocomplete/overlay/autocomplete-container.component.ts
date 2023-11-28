import { ThyAbstractOverlayContainer, ThyClickDispatcher, ThyPortalOutlet } from 'ngx-tethys/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AnimationEvent } from '@angular/animations';
import { PortalModule } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, NgZone, ViewChild } from '@angular/core';

import { thyAutocompleteAnimations } from './autocomplete-animations';
import { ThyAutocompleteConfig } from './autocomplete.config';
import { autocompleteAbstractOverlayOptions } from './autocomplete.options';

/**
 * @private
 */
@Component({
    selector: 'thy-autocomplete-container',
    templateUrl: './autocomplete-container.component.html',
    animations: [thyAutocompleteAnimations.autocompleteContainer],
    host: {
        class: 'thy-autocomplete-container',
        tabindex: '-1',
        '[attr.role]': `'autocomplete'`,
        '[@autocompleteContainer]': 'animationState',
        '(@autocompleteContainer.start)': 'onAnimationStart($event)',
        '(@autocompleteContainer.done)': 'onAnimationDone($event)'
    },
    standalone: true,
    imports: [PortalModule, ThyPortalOutlet]
})
export class ThyAutocompleteContainer extends ThyAbstractOverlayContainer implements AfterViewInit {
    @ViewChild(ThyPortalOutlet, { static: true })
    portalOutlet: ThyPortalOutlet;

    /** State of the autocomplete animation. */
    animationState: 'void' | 'enter' | 'exit' = 'enter';

    /** Emits when an animation state changes. */
    animationStateChanged = new EventEmitter<AnimationEvent>();

    animationOpeningDone: Observable<AnimationEvent>;
    animationClosingDone: Observable<AnimationEvent>;

    beforeAttachPortal(): void {}

    constructor(
        private elementRef: ElementRef,
        @Inject(DOCUMENT) private document: any,
        public config: ThyAutocompleteConfig,
        changeDetectorRef: ChangeDetectorRef,
        private thyClickDispatcher: ThyClickDispatcher,
        private ngZone: NgZone
    ) {
        super(autocompleteAbstractOverlayOptions, changeDetectorRef);

        this.animationOpeningDone = this.animationStateChanged.pipe(
            filter((event: AnimationEvent) => {
                return event.phaseName === 'done' && event.toState === 'enter';
            })
        );
        this.animationClosingDone = this.animationStateChanged.pipe(
            filter((event: AnimationEvent) => {
                return event.phaseName === 'done' && event.toState === 'exit';
            })
        );
    }

    ngAfterViewInit() {}

    /** Callback, invoked whenever an animation on the host completes. */
    onAnimationDone(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    /** Callback, invoked when an animation on the host starts. */
    onAnimationStart(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    startExitAnimation(): void {
        this.animationState = 'exit';
        this.changeDetectorRef.markForCheck();
    }
}
