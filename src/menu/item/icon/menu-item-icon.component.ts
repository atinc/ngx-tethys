import { ChangeDetectionStrategy, Component, effect, input, OnInit } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';

/**
 * 菜单项图标组件
 * @name thy-menu-item-icon,[thy-menu-item-icon],[thyMenuItemIcon]
 * @order 15
 */
@Component({
    selector: 'thy-menu-item-icon,[thy-menu-item-icon],[thyMenuItemIcon]',
    templateUrl: './menu-item-icon.component.html',
    host: {
        class: 'thy-menu-item-icon'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyMenuItemIcon implements OnInit {
    /**
     * 设置图标颜色
     */
    readonly thyColor = input<string>();

    private hostRenderer = useHostRenderer();

    constructor() {
        effect(() => {
            if (this.thyColor()) {
                this.hostRenderer.setStyle('color', this.thyColor());
            }
        });
    }

    ngOnInit(): void {}
}
