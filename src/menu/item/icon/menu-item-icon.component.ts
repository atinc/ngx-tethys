import { Component, OnInit, HostBinding, Input, ElementRef, Renderer2, ChangeDetectionStrategy } from '@angular/core';

/**
 * 菜单项图标组件
 */
@Component({
    selector: 'thy-menu-item-icon,[thy-menu-item-icon],[thyMenuItemIcon]',
    templateUrl: './menu-item-icon.component.html',
    host: {
        class: 'thy-menu-item-icon'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyMenuItemIconComponent implements OnInit {
    /**
     * 设置图标颜色
     */
    @Input()
    set thyColor(value: string) {
        if (value) {
            this.renderer.setStyle(this.elementRef.nativeElement, 'color', value);
        }
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {}
}
