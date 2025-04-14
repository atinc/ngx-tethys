import { Component } from '@angular/core';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyResizableDirective, ThyResizeEvent, ThyResizeHandles } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-grid-example',
    templateUrl: './grid.component.html',
    styleUrls: ['../style.scss'],
    imports: [ThyResizableDirective, ThyResizeHandles, ThyColDirective, ThyRowDirective]
})
export class ThyResizableGridExampleComponent {
    col = 8;

    onResize({ col }: ThyResizeEvent): void {
        this.col = col!;
    }
}
