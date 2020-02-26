import {
    Component,
    ComponentRef,
    ViewChild,
    EmbeddedViewRef,
    Inject,
    ElementRef,
    EventEmitter,
    HostListener,
    ChangeDetectorRef,
    OnInit,
    AfterViewInit
} from '@angular/core';
import { ComponentPortal, TemplatePortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { AnimationEvent } from '@angular/animations';

import { ThyPopoverConfig } from './popover.config';
import { thyPopoverAnimations } from './popover-animations';
import { ThyUpperOverlayContainer } from '../core/overlay';
import { popoverUpperOverlayOptions } from './popover.options';
import { Observable, fromEvent, timer } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'thy-popover-container',
    templateUrl: './popover-container.component.html',
    animations: [thyPopoverAnimations.popoverContainer],
    host: {
        class: 'thy-popover-container',
        tabindex: '-1',
        '[attr.role]': `'popover'`,
        '[@popoverContainer]': 'animationState',
        '(@popoverContainer.start)': 'onAnimationStart($event)',
        '(@popoverContainer.done)': 'onAnimationDone($event)'
    }
})
export class ThyPopoverContainerComponent extends ThyUpperOverlayContainer implements AfterViewInit {
    @ViewChild(CdkPortalOutlet)
    portalOutlet: CdkPortalOutlet;

    /** State of the popover animation. */
    animationState: 'void' | 'enter' | 'exit' = 'enter';

    /** Emits when an animation state changes. */
    animationStateChanged = new EventEmitter<AnimationEvent>();

    animationOpeningDone: Observable<AnimationEvent>;
    animationClosingDone: Observable<AnimationEvent>;

    insideClicked = new EventEmitter();

    outsideClicked = new EventEmitter();

    beforeAttachPortal(): void {}

    constructor(
        private elementRef: ElementRef,
        @Inject(DOCUMENT) private document: any,
        public config: ThyPopoverConfig,
        changeDetectorRef: ChangeDetectorRef
    ) {
        super(popoverUpperOverlayOptions, changeDetectorRef);

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

    ngAfterViewInit() {
        timer().subscribe(() => {
            if (this.config.outsetClosable) {
                fromEvent(document, 'click')
                    .pipe(takeUntil(this.animationClosingDone))
                    .subscribe((event: MouseEvent) => {
                        if (!(event.target as HTMLElement).contains(this.elementRef.nativeElement)) {
                            this.outsideClicked.emit();
                        }
                    });
            }
        });
    }

    /** Callback, invoked whenever an animation on the host completes. */
    onAnimationDone(event: AnimationEvent) {
        // if (event.toState === 'void') {
        //     this.trapFocus();
        // } else if (event.toState === 'exit') {
        //     this.restoreFocus();
        // }
        this.animationStateChanged.emit(event);
    }

    /** Callback, invoked when an animation on the host starts. */
    onAnimationStart(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    startExitAnimation(): void {
        this.animationState = 'exit';

        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        // this.changeDetectorRef.markForCheck();
    }

    @HostListener('click', [])
    onInsideClick() {
        if (this.config.insideClosable) {
            this.insideClicked.emit();
        }
    }
}
