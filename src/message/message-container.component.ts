import { Component, OnInit, ChangeDetectorRef, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { ThyMessageConfig } from './message.config';
import { thyMNAnimations } from './animations';
import { ThyMNContainerComponent } from './base';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { messageAbstractOverlayOptions } from './message.options';

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
export class ThyMessageContainerComponent extends ThyMNContainerComponent implements OnInit {
    @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;

    constructor(cdr: ChangeDetectorRef, elementRef: ElementRef<HTMLElement>) {
        super(messageAbstractOverlayOptions, cdr, elementRef);
    }

    ngOnInit() {}
}
