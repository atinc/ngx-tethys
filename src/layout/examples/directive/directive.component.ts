import { Component } from '@angular/core';
import { ThyHeaderDirective, ThySidebarDirective } from 'ngx-tethys/layout';
import { ThyResizableDirective, ThyResizeEvent, ThyResizeHandle } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-layout-directive-example',
    templateUrl: './directive.component.html',
    styleUrls: ['./directive.component.scss'],
    imports: [ThyHeaderDirective, ThySidebarDirective, ThyResizableDirective, ThyResizeHandle]
})
export class ThyLayoutDirectiveExampleComponent {
    sidebarWidth = 240;

    onSideResize({ width }: ThyResizeEvent): void {
        this.sidebarWidth = width;
    }
}
