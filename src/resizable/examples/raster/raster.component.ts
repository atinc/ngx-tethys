import { Component } from '@angular/core';
import { ThyResizeEvent } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-raster-example',
    templateUrl: './raster.component.html',
    styleUrls: ['../style.scss']
})
export class ThyResizableRasterExampleComponent {
    col = 8;

    onResize({ col }: ThyResizeEvent): void {
        this.col = col!;
    }
}
