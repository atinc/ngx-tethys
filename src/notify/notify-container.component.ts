import { Component, OnInit, HostBinding, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AnimationEvent } from '@angular/animations';
import { NotifyQueueStore } from './notify-queue.store';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ThyNotifyConfig, NotifyPlacement } from './notify.config';
import { notifyAbstractOverlayOptions } from './notify.options';
import { ThyAbstractOverlayContainer } from 'ngx-tethys/core';
import { thyNotifyAnimations } from './notify-animations';

@Component({
    selector: 'thy-notify-container',
    templateUrl: './notify-container.component.html',
    animations: [thyNotifyAnimations.notifyContainer],
    host: {
        class: 'thy-notify-root',
        tabindex: '-1',
        '[attr.role]': `'notify'`,
        '[attr.id]': 'id',
        '[@notifyContainer]': 'animationState',
        '(@notifyContainer.start)': 'onAnimationStart($event)',
        '(@notifyContainer.done)': 'onAnimationDone($event)'
    }
})
export class ThyNotifyContainerComponent<TData = unknown> extends ThyAbstractOverlayContainer<TData> implements OnInit, OnDestroy {
    @HostBinding('class.thy-notify-root') className = true;
    @HostBinding('class.thy-notify-bottomRight') bottomRight: boolean;
    @HostBinding('class.thy-notify-bottomLeft') bottomLeft: boolean;
    @HostBinding('class.thy-notify-topLeft') topLeft: boolean;
    @HostBinding('class.thy-notify-topRight') topRight: boolean;

    @ViewChild(CdkPortalOutlet, { static: true })
    portalOutlet: CdkPortalOutlet;

    /** State of the notify animation. */
    animationState: 'void' | 'enter' | 'exit' = 'void';

    initialState: any;

    public notifyQueue: any;
    public topLeftQueue: any;
    public topRightQueue: any;
    public bottomLeftQueue: any;
    public bottomRightQueue: any;

    placement: NotifyPlacement;

    private destroy$ = new Subject<void>();

    animationOpeningDone: Observable<AnimationEvent>;
    animationClosingDone: Observable<AnimationEvent>;
    beforeAttachPortal(): void {}

    constructor(public queueStore: NotifyQueueStore, public config: ThyNotifyConfig<TData>, cdr: ChangeDetectorRef) {
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

    ngOnInit() {
        // this.placement = this.initialState.placement;
        this.placement = this.config.placement;
        let queue$, queueKey: string;
        if (this.placement === 'bottomRight') {
            this.bottomRight = true;
        } else if (this.placement === 'bottomLeft') {
            this.bottomLeft = true;
        } else if (this.placement === 'topLeft') {
            this.topLeft = true;
        } else {
            this.topRight = true;
        }
        // if (this.placement === 'topLeft') {
        //     queueKey = 'topLeftQueue';
        //     queue$ = this.queueStore.select(NotifyQueueStore.topLeftSelector);
        // } else if (this.placement === 'topRight') {
        //     queueKey = 'topRightQueue';
        //     queue$ = this.queueStore.select(NotifyQueueStore.topRightSelector);
        // } else if (this.placement === 'bottomLeft') {
        //     queueKey = 'bottomLeftQueue';
        //     queue$ = this.queueStore.select(NotifyQueueStore.bottomLeftSelector);
        // } else if (this.placement === 'bottomRight') {
        //     queueKey = 'bottomRightQueue';
        //     queue$ = this.queueStore.select(NotifyQueueStore.bottomRightSelector);
        // }
        // console.log('container', queue$);
        // queue$ = this.queueStore.select(state => state.notifyQueue);

        // queue$.pipe(takeUntil(this.destroy$)).subscribe(data => {
        //     console.log('-----', data);
        //     this[queueKey] = data;
        // });
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

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
