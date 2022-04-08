import { ThyAbstractOverlayContainer, ThyClickDispatcher } from 'ngx-tethys/core';
import { Observable, timer } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AnimationEvent } from '@angular/animations';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    NgZone,
    OnDestroy,
    ViewChild
} from '@angular/core';

import { thyPopoverAnimations } from './popover-animations';
import { ThyPopoverConfig } from './popover.config';
import { popoverAbstractOverlayOptions } from './popover.options';

@Component({
    selector: 'thy-popover-container',
    templateUrl: './popover-container.component.html',
    animations: [thyPopoverAnimations.popoverContainer],
    host: {
        class: 'thy-popover-container',
        tabindex: '-1',
        '[attr.role]': `'popover'`,
        '[attr.id]': 'id',
        '[@popoverContainer]': 'animationState',
        '(@popoverContainer.start)': 'onAnimationStart($event)',
        '(@popoverContainer.done)': 'onAnimationDone($event)'
    }
})
export class ThyPopoverContainerComponent<TData = unknown> extends ThyAbstractOverlayContainer<TData> implements AfterViewInit, OnDestroy {
    @ViewChild(CdkPortalOutlet, { static: true })
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
        public config: ThyPopoverConfig<TData>,
        changeDetectorRef: ChangeDetectorRef,
        private thyClickDispatcher: ThyClickDispatcher,
        private ngZone: NgZone
    ) {
        super(popoverAbstractOverlayOptions, changeDetectorRef);

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
        if (this.config.outsideClosable && !this.config.hasBackdrop) {
            timer().subscribe(() => {
                this.thyClickDispatcher
                    .clicked()
                    .pipe(takeUntil(this.animationClosingDone))
                    .subscribe((event: MouseEvent) => {
                        if (!this.elementRef.nativeElement.contains(event.target as HTMLElement)) {
                            this.ngZone.run(() => {
                                this.outsideClicked.emit();
                            });
                        }
                    });
            });
        }
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
        this.changeDetectorRef.markForCheck();
    }

    @HostListener('click', [])
    onInsideClick() {
        if (this.config.insideClosable) {
            this.insideClicked.emit();
        }
    }

    ngOnDestroy() {
        super.destroy();
        this.insideClicked.complete();
        this.outsideClicked.complete();
    }
}
