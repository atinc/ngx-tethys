import { ThyAbstractOverlayContainer, ThyClickDispatcher, ThyPortalOutlet , scaleMotion, scaleXMotion, scaleYMotion } from 'ngx-tethys/core';
import { from, Observable, timer } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { AnimationEvent } from '@angular/animations';
import { ContentObserver } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    NgZone,
    OnDestroy,
    ViewChild,
    inject
} from '@angular/core';

import { ThyPopoverConfig } from './popover.config';
import { popoverAbstractOverlayOptions } from './popover.options';

/**
 * @internal
 */
@Component({
    selector: 'thy-popover-container',
    templateUrl: './popover-container.component.html',
    animations: [scaleXMotion, scaleYMotion, scaleMotion],
    host: {
        class: 'thy-popover-container',
        tabindex: '-1',
        '[attr.role]': `'popover'`,
        '[attr.id]': 'id',
        '[@.disabled]': '!!config.animationDisabled',
        '[@scaleXMotion]': '(config.placement === "left" || config.placement === "right") ? animationState : "void"',
        '(@scaleXMotion.start)': 'onAnimationStart($event)',
        '(@scaleXMotion.done)': 'onAnimationDone($event)',
        '[@scaleYMotion]': '(config.placement === "top" || config.placement === "bottom") ? animationState : "void"',
        '(@scaleYMotion.start)': 'onAnimationStart($event)',
        '(@scaleYMotion.done)': 'onAnimationDone($event)',
        '[@scaleMotion]':
            '(config.placement !== "left" && config.placement !== "right" && config.placement !== "top" && config.placement !== "bottom") ? animationState : "void"',
        '(@scaleMotion.start)': 'onAnimationStart($event)',
        '(@scaleMotion.done)': 'onAnimationDone($event)'
    },
    imports: [PortalModule, ThyPortalOutlet]
})
export class ThyPopoverContainer<TData = unknown> extends ThyAbstractOverlayContainer<TData> implements AfterViewInit, OnDestroy {
    private elementRef = inject(ElementRef);
    config = inject<ThyPopoverConfig<TData>>(ThyPopoverConfig);
    private thyClickDispatcher = inject(ThyClickDispatcher);
    private contentObserver = inject(ContentObserver);
    private ngZone = inject(NgZone);

    @ViewChild(ThyPortalOutlet, { static: true })
    portalOutlet: ThyPortalOutlet;

    /** State of the popover animation. */
    animationState: 'void' | 'enter' | 'exit' = 'enter';

    /** Emits when an animation state changes. */
    animationStateChanged = new EventEmitter<AnimationEvent>();

    animationOpeningDone: Observable<AnimationEvent>;
    animationClosingDone: Observable<AnimationEvent>;

    insideClicked = new EventEmitter();

    updatePosition = new EventEmitter();

    outsideClicked = new EventEmitter();

    beforeAttachPortal(): void {}

    constructor() {
        const changeDetectorRef = inject(ChangeDetectorRef);

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
            timer(0).subscribe(() => {
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

        if (this.config.autoAdaptive) {
            const onStable$ = this.ngZone.isStable ? from(Promise.resolve()) : this.ngZone.onStable.pipe(take(1));
            this.ngZone.runOutsideAngular(() => {
                onStable$.pipe(takeUntil(this.containerDestroy)).subscribe(() => {
                    this.contentObserver
                        .observe(this.elementRef)
                        .pipe(takeUntil(this.containerDestroy))
                        .subscribe(() => {
                            this.updatePosition.emit();
                        });
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
        this.updatePosition.complete();
        this.outsideClicked.complete();
    }
}
