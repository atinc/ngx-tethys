import { Component } from '@angular/core';
import { ThyResizeEvent } from 'ngx-tethys/resizable/interface';

@Component({
    selector: 'thy-resizable-layout-example',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.style.scss']
})
export class ThyResizableLayoutExampleComponent {
    sidebarWidth = 120;
    contentHeight = 200;

    onSideResize({ width }: ThyResizeEvent): void {
        this.sidebarWidth = width!;
    }

    onContentResize({ height }: ThyResizeEvent): void {
        this.contentHeight = height!;
    }
}
