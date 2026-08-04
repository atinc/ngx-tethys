import { ChangeDetectionStrategy, Component, computed, contentChild, Directive, effect, HostBinding, inject, signal } from '@angular/core';
import { ThySidebar, ThySidebarDirection, ThySidebarDirective } from './sidebar.component';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [ThyLayoutDirective]
})
export class ThyLayout {
    private sidebar = contentChild(ThySidebar);
    private layoutDirective = inject(ThyLayoutDirective, { self: true });

    constructor() {
        effect(() => {
            if (this.sidebar() && this.layoutDirective) {
                this.layoutDirective.sidebarDirection.set(this.sidebar()!.sidebarDirective!.thyDirection());
            }
        });
    }
}
