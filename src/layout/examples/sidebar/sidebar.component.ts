import { Component, model, signal } from '@angular/core';
import { ThyContent, ThyLayout, ThySidebarHeader, ThySidebarContent, ThySidebarFooter, ThySidebar } from 'ngx-tethys/layout';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyAction } from 'ngx-tethys/action';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';

@Component({
    selector: 'thy-layout-sidebar-example',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [
        ThyLayout,
        ThyContent,
        ThyNav,
        ThyNavItemDirective,
        ThySidebar,
        ThySidebarHeader,
        ThySidebarContent,
        ThySidebarFooter,
        ThyIcon,
        ThyAction
    ]
})
export class ThyLayoutSidebarExampleComponent {
    collapsedWidth = signal<number>(90);

    trigger = signal<undefined | null>(undefined);

    collapsed = model<boolean>(false);

    rightCollapsed = model<boolean>(false);

    triggerCollapsed = model<boolean>(false);

    collapsedChange(collapsed: boolean) {
        this.trigger.set(collapsed ? null : undefined);
    }

    toggleCollapsed() {
        this.collapsed.set(!this.collapsed());
        this.trigger.set(this.collapsed() ? null : undefined);
    }

    toggleRightCollapsed() {
        this.rightCollapsed.set(!this.rightCollapsed());
        this.trigger.set(this.rightCollapsed() ? null : undefined);
    }

    dragWidthChange(width: number) {}
}
