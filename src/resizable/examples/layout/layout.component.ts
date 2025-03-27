import { Component } from '@angular/core';
import { ThyResizeEvent } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-layout-example',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.style.scss'],
    standalone: false
})
export class ThyResizableLayoutExampleComponent {
    sidebarWidth = 120;

    contentHeight = 200;

    isCollapsible = true;

    isCollapsed = false;

    sidebarMinWidth = 80;

    collapsedWidth = 80;

    originWidth: number;

    resizeEnd({ width }: ThyResizeEvent) {
        this.isCollapsed = width > this.sidebarMinWidth ? false : true;
        if (this.isCollapsed) {
            this.sidebarWidth = this.originWidth;
        }
    }

    onSideResize({ width }: ThyResizeEvent): void {
        this.sidebarWidth = width;
    }

    onContentResize({ height }: ThyResizeEvent): void {
        this.contentHeight = height!;
    }

    resizeStart(event: ThyResizeEvent) {
        this.originWidth = this.sidebarWidth;
    }

    collapsedChange(isCollapsed: boolean) {
        this.isCollapsed = isCollapsed;
    }
}
