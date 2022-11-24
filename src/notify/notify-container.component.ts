import { Component, OnInit, HostBinding, OnDestroy, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ThyNotifyConfig } from './notify.config';
import { thyMNAnimations } from './animations';
import { ThyMNContainerComponent } from './base';

@Component({
    selector: 'thy-notify-container',
    templateUrl: './notify-container.component.html',
    animations: [thyMNAnimations.container],
    host: {
        class: 'thy-notify-root',
        tabindex: '-1',
        '[attr.role]': `'notify'`,
        '[@container]': 'animationState',
        '(@container.start)': 'onAnimationStart($event)',
        '(@container.done)': 'onAnimationDone($event)'
    }
})
export class ThyNotifyContainerComponent<TData = unknown> extends ThyMNContainerComponent<TData> implements OnInit {
    @HostBinding('class.thy-notify-bottomRight') bottomRight: boolean;
    @HostBinding('class.thy-notify-bottomLeft') bottomLeft: boolean;
    @HostBinding('class.thy-notify-topLeft') topLeft: boolean;
    @HostBinding('class.thy-notify-topRight') topRight: boolean;

    constructor(public config: ThyNotifyConfig<TData>, cdr: ChangeDetectorRef, elementRef: ElementRef<HTMLElement>) {
        super(cdr, elementRef);
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
}
