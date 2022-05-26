import { ChangeDetectionStrategy, Component, Input, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';

/**
 * 立即操作组件
 */
@Component({
    selector: 'thy-action, [thyAction]',
    templateUrl: './action.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-action',
        '[class.active]': 'thyActionActive'
    }
})
export class ThyActionComponent implements OnInit, AfterViewInit {
    icon: string;

    /**
     * 操作图标，支持传参同时也支持在投影中写 thy-icon 组件
     */
    @Input()
    set thyActionIcon(icon: string) {
        this.icon = icon;
    }

    /**
     * 操作图标 Active 状态，默认为 false，设置为 true 时会在 Item 上添加 active class
     */
    @Input()
    @InputBoolean()
    thyActionActive: string | boolean;

    constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.wrapSpanForText(this.elementRef.nativeElement.childNodes);
    }

    private wrapSpanForText(nodes: NodeList): void {
        nodes.forEach(node => {
            if (node.nodeName === '#text') {
                const span = this.renderer.createElement('span');
                const parent = this.renderer.parentNode(node);
                // this.renderer.addClass(span, 'thy-action-wrap-span');
                this.renderer.insertBefore(parent, span, node);
                this.renderer.appendChild(span, node);
            }
        });
    }
}
