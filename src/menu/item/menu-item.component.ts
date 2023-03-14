import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf } from '@angular/common';

/**
 * 菜单项组件，支持 thy-menu-item,[thy-menu-item],[thyMenuItem] 使用
 */
@Component({
    selector: 'thy-menu-item,[thy-menu-item],[thyMenuItem]',
    templateUrl: './menu-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-menu-item'
    },
    standalone: true,
    imports: [NgIf, ThyIconComponent]
})
export class ThyMenuItemComponent implements OnInit, AfterViewInit {
    @ViewChild('content', { read: ElementRef }) content: ElementRef<HTMLElement>;
    /**
     * 菜单项的图标
     */
    @Input() thyIcon: string;

    constructor(private renderer: Renderer2) {}

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
