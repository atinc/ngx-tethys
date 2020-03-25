import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyBreadcrumbComponent {
    @HostBinding(`class.thy-breadcrumb`) _isBreadcrumb = true;
    @HostBinding(`class.separator-slash`) isSlash = false;
    @HostBinding(`class.separator-backslash`) isBackslash = false;

    iconClasses: string[];
    svgIconName: string;

    @Input()
    set thyIcon(icon: string) {
        this.setIcon(icon);
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
