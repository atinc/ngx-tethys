import { Component } from '@angular/core';
import { ThyResizeEvent } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-layout-directive-example',
    templateUrl: './directive.component.html',
    styleUrls: ['./directive.component.scss']
})
export class ThyLayoutDirectiveExampleComponent {
    sidebarWidth = 240;

    onSideResize({ width }: ThyResizeEvent): void {
        this.sidebarWidth = width;
    }
}
