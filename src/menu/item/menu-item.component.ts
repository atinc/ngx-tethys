import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, Input, Renderer2, ElementRef, ViewChild, inject } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';

/**
 * 菜单项组件
 * @name thy-menu-item,[thy-menu-item],[thyMenuItem]
 * @order 10
 */
@Component({
    selector: 'thy-menu-item,[thy-menu-item],[thyMenuItem]',
    templateUrl: './menu-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-menu-item'
    },
    standalone: true,
    imports: [ThyIcon]
})
export class ThyMenuItem implements OnInit, AfterViewInit {
    private renderer = inject(Renderer2);

    @ViewChild('content', { read: ElementRef }) content: ElementRef<HTMLElement>;
    /**
     * 菜单项的图标
     */
    @Input() thyIcon: string;

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.wrapSpanForText(this.content.nativeElement.childNodes);
    }

    private wrapSpanForText(nodes: NodeList): void {
        nodes.forEach(node => {
            if (node.nodeName === '#text') {
                const span = this.renderer.createElement('span');
                const parent = this.renderer.parentNode(node);
                this.renderer.addClass(span, 'thy-menu-item-name');
                this.renderer.insertBefore(parent, span, node);
                this.renderer.appendChild(span, node);
            }
        });
    }
}
