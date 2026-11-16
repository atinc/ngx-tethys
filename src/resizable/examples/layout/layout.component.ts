import { Component, signal } from '@angular/core';
import { ThyResizableDirective, ThyResizeEvent, ThyResizeHandle } from 'ngx-tethys/resizable';
import { ThyHeader, ThySidebar, ThyContent, ThyLayout } from 'ngx-tethys/layout';

@Component({
    selector: 'thy-resizable-layout-example',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.style.scss'],
    imports: [ThyResizableDirective, ThyResizeHandle, ThyLayout, ThyHeader, ThySidebar, ThyContent]
})
export class ThyResizableLayoutExampleComponent {
    sidebarWidth = signal<number>(120);

    contentHeight = signal<number>(200);

    isCollapsible = signal<boolean>(true);

    isCollapsed = signal<boolean>(false);

    sidebarMinWidth = signal<number>(80);

    collapsedWidth = signal<number>(80);

    originWidth!: number;

    resizeEnd({ width }: ThyResizeEvent) {
        this.isCollapsed.set(width! > this.sidebarMinWidth()! ? false : true);
        if (this.isCollapsed()) {
            this.sidebarWidth.set(this.originWidth!);
        }
    }

    onSideResize({ width }: ThyResizeEvent): void {
        this.sidebarWidth.set(width!);
    }

    onContentResize({ height }: ThyResizeEvent): void {
        this.contentHeight.set(height!);
    }

    resizeStart(event: ThyResizeEvent) {
        this.originWidth = this.sidebarWidth();
    }

    collapsedChange(isCollapsed: boolean) {
        this.isCollapsed.set(isCollapsed);
    }
}
