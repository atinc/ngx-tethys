import { ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, Injector, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AnimationEvent } from '@angular/animations';
import { ThyNotifyConfig } from './notify.config';
import { notifyAbstractOverlayOptions } from './notify.options';
import {
    ThyAbstractInternalOverlayRef,
    ThyAbstractOverlayConfig,
    ThyAbstractOverlayContainer,
    ThyAbstractOverlayRef,
    ThyAbstractOverlayService
} from 'ngx-tethys/core';
import { Overlay, OverlayConfig, OverlayContainer, OverlayRef, PositionStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { isFunction } from 'ngx-tethys/util';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ThyMessageConfig } from 'ngx-tethys/message';

@Directive()
export abstract class ThyMNContainerComponent<TData = unknown> extends ThyAbstractOverlayContainer<TData> implements OnDestroy {
    @HostBinding(`attr.id`) id: string;

    @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;

    private destroy$ = new Subject<void>();

    animationOpeningDone: Observable<AnimationEvent>;

    animationClosingDone: Observable<AnimationEvent>;

    /** State of the notify animation. */
    animationState: 'void' | 'enter' | 'exit' = 'void';

    beforeAttachPortal(): void {}

    constructor(cdr: ChangeDetectorRef, private elementRef: ElementRef<HTMLElement>) {
        super(notifyAbstractOverlayOptions, cdr);
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

    /** Callback, invoked whenever an animation on the host completes. */
    onAnimationDone(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    /** Callback, invoked when an animation on the host starts. */
    onAnimationStart(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    toOverlayTop() {
        const globalOverlayWrapper = this.elementRef.nativeElement.closest('.cdk-global-overlay-wrapper');
        const overlayContainer = globalOverlayWrapper.parentElement;
        overlayContainer.appendChild(globalOverlayWrapper);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}

@Directive()
export abstract class ThyMNComponent implements OnDestroy {
    abstract option: ThyNotifyConfig | ThyMessageConfig;

    abstract close(): void;

    private closeTimer: any;

    constructor(private elementRef: ElementRef) {}

    ngOnDestroy() {
        this.clearCloseTimer();
        // fix dom not removed normally under firefox
        this.elementRef.nativeElement.remove();
    }

    @HostListener('mouseenter') mouseenter() {
        if (this.option.pauseOnHover) {
            this.clearCloseTimer();
        }
    }

    @HostListener('mouseleave') mouseleave() {
        if (this.option.pauseOnHover) {
            this.createCloseTimer();
        }
    }

    protected createCloseTimer() {
        if (this.option.duration) {
            this.closeTimer = setInterval(() => {
                this.clearCloseTimer();
                this.close();
            }, this.option.duration);
        }
    }

    protected clearCloseTimer() {
        clearInterval(this.closeTimer);
    }
}

@Directive()
export abstract class ThyMNService extends ThyAbstractOverlayService<ThyAbstractOverlayConfig, ThyMNContainerComponent>
    implements OnDestroy {
    protected abstract buildPositionStrategy(config: ThyAbstractOverlayConfig): PositionStrategy;

    abstract show(config: ThyAbstractOverlayConfig): void;

    protected buildOverlayConfig(config: ThyAbstractOverlayConfig): OverlayConfig {
        const positionStrategy = this.buildPositionStrategy(config);
        const overlayConfig = this.buildBaseOverlayConfig(config);
        overlayConfig.positionStrategy = positionStrategy;
        overlayConfig.scrollStrategy = this.buildScrollStrategy(config);
        return overlayConfig;
    }

    protected buildScrollStrategy(config: ThyAbstractOverlayConfig): ScrollStrategy {
        if (this.scrollStrategy && isFunction(this.scrollStrategy)) {
            return this.scrollStrategy();
        } else {
            this.overlay.scrollStrategies.block();
        }
    }

    protected createAbstractOverlayRef<T, TResult = unknown>(
        overlayRef: OverlayRef,
        containerInstance: ThyMNContainerComponent,
        config: ThyAbstractOverlayConfig
    ): ThyAbstractOverlayRef<T, ThyMNContainerComponent, TResult> {
        return new ThyInternalMNRef(overlayRef, containerInstance, config);
    }

    constructor(
        protected overlay: Overlay,
        public overlayContainer: OverlayContainer,
        protected injector: Injector,
        protected config: ThyAbstractOverlayConfig
    ) {
        super(notifyAbstractOverlayOptions, overlay, injector, config);
    }

    ngOnDestroy(): void {
        this.dispose();
    }
}

export abstract class ThyMNRef<T, TResult = unknown, TData = unknown> extends ThyAbstractOverlayRef<
    T,
    ThyMNContainerComponent<TData>,
    TResult
> {}

export class ThyInternalMNRef<T, TResult = unknown> extends ThyAbstractInternalOverlayRef<T, ThyMNContainerComponent, TResult>
    implements ThyMNRef<T, TResult> {
    constructor(overlayRef: OverlayRef, containerInstance: ThyMNContainerComponent, config: ThyAbstractOverlayConfig) {
        super(notifyAbstractOverlayOptions, overlayRef, containerInstance, config);
    }

    /**
     * Updates the notify's position.
     * @param position New notify position.
     */
    updatePosition(): this {
        this.overlayRef.updatePosition();
        return this;
    }
}
