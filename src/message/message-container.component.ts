import { Component, OnInit, ChangeDetectorRef, ElementRef, HostBinding } from '@angular/core';
import { ThyMessageConfig } from './message.config';
import { thyMNAnimations } from 'ngx-tethys/notify';
import { ThyMNContainerComponent } from 'ngx-tethys/notify';

@Component({
    selector: 'thy-message-container',
    templateUrl: './message-container.component.html',
    animations: [thyMNAnimations.container],
    host: {
        class: 'thy-message-root',
        tabindex: '-1',
        '[attr.role]': `'message'`,
        '[@container]': 'animationState',
        '(@container.start)': 'onAnimationStart($event)',
        '(@container.done)': 'onAnimationDone($event)'
    }
})
export class ThyMessageContainerComponent<TData = unknown> extends ThyMNContainerComponent implements OnInit {
    @HostBinding('class.thy-message') topRight: boolean;

    constructor(public config: ThyMessageConfig<TData>, cdr: ChangeDetectorRef, elementRef: ElementRef<HTMLElement>) {
        super(cdr, elementRef);
    }

    ngOnInit() {}
}
