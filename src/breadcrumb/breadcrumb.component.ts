import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'thy-breadcrumb',
    template:
        '<div class="thy-breadcrumb-icon" *ngIf="iconName"><thy-icon [thyIconName]="iconName"></thy-icon></div><ng-content></ng-content>',
    exportAs: 'ThyBreadcrumb',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyBreadcrumbComponent {
    @HostBinding(`class.thy-breadcrumb`) _isBreadcrumb = true;
    @HostBinding(`class.separator-slash`) isSlash = false;
    @HostBinding(`class.separator-backslash`) isBackslash = false;

    iconName: string;

    @Input()
    set thyIcon(icon: string) {
        this.setIconName(icon);
    }

    @Input()
    set thySeparator(type: string) {
        if (type === 'slash') {
            this.isSlash = true;
        }
        if (type === 'backslash') {
            this.isBackslash = true;
        }
    }

    private setIconName(icon: string) {
        if (icon) {
            this.iconName = icon;
        } else {
            this.iconName = null;
        }
    }
}
