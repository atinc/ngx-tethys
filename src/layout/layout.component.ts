import { Component, computed, contentChild, Directive, effect, forwardRef, inject, signal } from '@angular/core';
import { ThySidebar, ThySidebarDirection } from './sidebar.component';

/**
 * 布局指令
 * @name thyLayout
 * @order 5
 */
@Directive({
    selector:
        '[thyLayout]:not([thyForm]):not(thy-form):not(thy-radio-group):not(thy-properties):not(thy-selection-list):not(thy-vote):not([thyVote])',
    host: {
        class: 'thy-layout',
        '[class.thy-layout--has-sidebar]': 'sidebarDirection()',
        '[class.thy-layout--is-sidebar-right]': 'isSidebarRight()'
    }
})
export class ThyLayoutDirective {
    readonly sidebarDirection = signal<ThySidebarDirection | null>(null);
    readonly isSidebarRight = computed(() => {
        return this.sidebarDirection() === 'right';
    });
}

/**
 * 布局组件
 * @name thy-layout
 * @order 6
 */
@Component({
    selector: 'thy-layout',
    template: ` <ng-content></ng-content> `,
    hostDirectives: [ThyLayoutDirective]
})
export class ThyLayout {
    private sidebar = contentChild(
        forwardRef(() => ThySidebar),
        { descendants: false }
    );
    private layoutDirective = inject(ThyLayoutDirective, { self: true });

    constructor() {
        effect(() => {
            const sidebar = this.sidebar();
            if (sidebar?.sidebarDirective) {
                this.layoutDirective.sidebarDirection.set(sidebar.sidebarDirective.thyDirection());
            } else {
                this.layoutDirective.sidebarDirection.set(null);
            }
        });
    }
}
