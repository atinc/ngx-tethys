import { Component, OnInit, HostBinding, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AnimationEvent } from '@angular/animations';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ThyNotifyConfig } from './notify.config';
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

    @HostBinding(`attr.id`)
    id: string;

    @ViewChild(CdkPortalOutlet, { static: true })
    portalOutlet: CdkPortalOutlet;

    /** State of the notify animation. */
    animationState: 'void' | 'enter' | 'exit' = 'void';

    private destroy$ = new Subject<void>();

    animationOpeningDone: Observable<AnimationEvent>;

    animationClosingDone: Observable<AnimationEvent>;

    beforeAttachPortal(): void {}

    constructor(public config: ThyNotifyConfig<TData>, cdr: ChangeDetectorRef) {
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
        const placement = this.config.placement;
        if (placement === 'bottomRight') {
            this.bottomRight = true;
        } else if (placement === 'bottomLeft') {
            this.bottomLeft = true;
        } else if (placement === 'topLeft') {
            this.topLeft = true;
        } else {
            this.topRight = true;
        }
    }

    /** Callback, invoked whenever an animation on the host completes. */
    onAnimationDone(event: AnimationEvent) {
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
