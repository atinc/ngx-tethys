import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Injectable,
    Injector,
    OnDestroy,
    OnInit,
    StaticProvider,
    ViewChild
} from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AnimationEvent } from '@angular/animations';
import { ThyMessageConfig } from './message.config';
import { messageAbstractOverlayOptions } from './message.options';
import {
    POSITION_MAP,
    ThyAbstractInternalOverlayRef,
    ThyAbstractOverlayConfig,
    ThyAbstractOverlayContainer,
    ThyAbstractOverlayOptions,
    ThyAbstractOverlayRef,
    ThyAbstractOverlayService
} from 'ngx-tethys/core';
import {
    GlobalPositionStrategy,
    Overlay,
    OverlayConfig,
    OverlayContainer,
    OverlayRef,
    PositionStrategy,
    ScrollStrategy
} from '@angular/cdk/overlay';
import { isFunction } from 'ngx-tethys/util';
import { ComponentPortal } from '@angular/cdk/portal';
import { ThyMessageContainerComponent } from './message-container.component';
import { Directionality } from '@angular/cdk/bidi';

@Directive()
export abstract class ThyMNContainerComponent extends ThyAbstractOverlayContainer implements OnDestroy {
    @HostBinding(`attr.id`) id: string;

    config: ThyMessageConfig;

    private destroy$ = new Subject<void>();

    animationOpeningDone: Observable<AnimationEvent>;

    animationClosingDone: Observable<AnimationEvent>;

    /** State of the notify animation. */
    animationState: 'void' | 'enter' | 'exit' = 'void';

    beforeAttachPortal(): void {}

    constructor(overlayOption: ThyAbstractOverlayOptions, cdr: ChangeDetectorRef, private elementRef: ElementRef<HTMLElement>) {
        super(overlayOption, cdr);
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
export abstract class ThyMNComponent implements OnInit, OnDestroy {
    option: ThyMessageConfig;

    iconName = '';

    abstract close(): void;

    private closeTimer: any;

    constructor(private elementRef: ElementRef) {}

    ngOnInit() {
        const iconName = {
            success: 'check-circle-fill',
            info: 'info-circle-fill',
            warning: 'waring-fill',
            error: 'close-circle-fill',
            loading: 'sync'
        };

        this.iconName = iconName[this.option.type];
        this.createCloseTimer();
    }

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
