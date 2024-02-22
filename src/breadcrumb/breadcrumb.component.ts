import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgIf, NgClass } from '@angular/common';

/**
 * 面包屑组件
 * @name thy-breadcrumb
 * @order 10
 */
@Component({
    selector: 'thy-breadcrumb',
    template: `
        <div class="thy-breadcrumb-icon" *ngIf="svgIconName || iconClasses">
            <thy-icon *ngIf="svgIconName; else iconFont" [thyIconName]="svgIconName"></thy-icon>
            <ng-template #iconFont>
                <i [ngClass]="iconClasses"></i>
            </ng-template>
        </div>
        <ng-content></ng-content>
    `,
    exportAs: 'ThyBreadcrumb',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-breadcrumb',
        '[class.thy-breadcrumb-separator]': '!!thySeparator',
        '[class.thy-breadcrumb-separator-slash]': 'thySeparator === "slash"',
        '[class.thy-breadcrumb-separator-backslash]': 'thySeparator === "backslash"',
        '[class.thy-breadcrumb-separator-vertical-line]': 'thySeparator === "vertical-line"'
    },
    standalone: true,
    imports: [NgIf, ThyIcon, NgClass]
})
export class ThyBreadcrumb {
    iconClasses: string[];
    svgIconName: string;

    /**
     * 面包屑的前缀 展示图标，如 folder-fill
     */
    @Input()
    set thyIcon(icon: string) {
        this.setIcon(icon);
    }

    /**
     * 面包屑的分隔符，不传值默认为 ">"
     * @type slash | backslash | vertical-line
     */
    @Input() thySeparator: 'slash' | 'backslash' | 'vertical-line';

    private setIcon(icon: string) {
        if (icon) {
            if (icon.includes('wtf')) {
                const classes = icon.split(' ');
                if (classes.length === 1) {
                    classes.unshift('wtf');
                }
                this.iconClasses = classes;
            } else {
                this.svgIconName = icon;
            }
        } else {
            this.iconClasses = null;
            this.svgIconName = null;
        }
    }
}
