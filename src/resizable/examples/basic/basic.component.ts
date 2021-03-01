import { Component } from '@angular/core';
import { ThyResizeEvent } from 'ngx-tethys/resizable/interface';

@Component({
    selector: 'thy-resizable-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['../style.scss']
})
export class ThyResizableBasicExampleComponent {
    width = 400;
    height = 200;

    onResize({ width, height }: ThyResizeEvent): void {
        this.width = width!;
        this.height = height!;
    }
}
