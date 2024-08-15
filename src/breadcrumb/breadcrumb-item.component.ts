import { Component, ChangeDetectionStrategy, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';

/**
 * 面包屑 Item 组件
 * @name thy-breadcrumb-item,[thyBreadcrumbItem]
 * @order 20
 */
@Component({
    selector: 'thy-breadcrumb-item,[thyBreadcrumbItem]',
    template: '<ng-content></ng-content><thy-icon class="separator-icon" thyIconName="angle-right"></thy-icon>',
    exportAs: 'ThyBreadcrumbItem',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-breadcrumb-item'
    },
    standalone: true,
    imports: [ThyIcon]
})
export class ThyBreadcrumbItem implements AfterViewInit {
    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef
    ) {}

    ngAfterViewInit() {
        this.wrapSpanForText(this.elementRef.nativeElement.childNodes);
        const link: HTMLElement = this.elementRef.nativeElement.querySelector('a');
        if (link && link.childNodes) {
            this.wrapSpanForText(link.childNodes);
        }
    }

    private wrapSpanForText(nodes: NodeList): void {
        nodes.forEach(node => {
            if (node.nodeName === '#text') {
                const span = this.renderer.createElement('span');
                const parent = this.renderer.parentNode(node);
                this.renderer.addClass(span, 'thy-wrap-span');
                this.renderer.insertBefore(parent, span, node);
                this.renderer.appendChild(span, node);
            }
        });
    }
}
