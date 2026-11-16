import { Component, signal } from '@angular/core';
import {
    ThyHeaderDirective,
    ThyLayoutDirective,
    ThySidebarContentDirective,
    ThySidebarDirective,
    ThySidebarHeaderDirective,
    ThyContentDirective
} from 'ngx-tethys/layout';
import { ThyResizableDirective, ThyResizeEvent, ThyResizeHandle } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-layout-directive-example',
    templateUrl: './directive.component.html',
    styleUrls: ['./directive.component.scss'],
    imports: [
        ThyHeaderDirective,
        ThySidebarDirective,
        ThyLayoutDirective,
        ThyContentDirective,
        ThySidebarContentDirective,
        ThySidebarHeaderDirective,
        ThyResizableDirective,
        ThyResizeHandle
    ]
})
export class ThyLayoutDirectiveExampleComponent {
    sidebarWidth = signal<number>(240);

    onSideResize({ width }: ThyResizeEvent): void {
        this.sidebarWidth.set(width!);
    }
}
