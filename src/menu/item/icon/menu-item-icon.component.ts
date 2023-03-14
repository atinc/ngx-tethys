import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';

/**
 * 菜单项图标组件
 */
@Component({
    selector: 'thy-menu-item-icon,[thy-menu-item-icon],[thyMenuItemIcon]',
    templateUrl: './menu-item-icon.component.html',
    host: {
        class: 'thy-menu-item-icon'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ThyMenuItemIconComponent implements OnInit {
    /**
     * 设置图标颜色
     */
    @Input()
    set thyColor(value: string) {
        if (value) {
            this.hostRenderer.setStyle('color', value);
        }
    }

    private hostRenderer = useHostRenderer();

    constructor() {}

    ngOnInit(): void {}
}
