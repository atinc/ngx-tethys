import {
    Component,
    ChangeDetectionStrategy,
    HostBinding,
    Input
} from '@angular/core';

@Component({
    selector: 'thy-breadcrumb',
    template:
        '<div class="thy-breadcrumb-icon" *ngIf="iconClasses"><i [ngClass]="iconClasses"></i></div><ng-content></ng-content>',
    exportAs: 'ThyBreadcrumb',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyBreadcrumbComponent {
    @HostBinding(`class.thy-breadcrumb`) _isBreadcrumb = true;
    @HostBinding(`class.separator-icon`) isSeparator = false;

    iconClasses: string[];

    @Input()
    set thyIcon(icon: string) {
        this.setIconClass(icon);
    }

    @Input()
    set thySeparator(value: boolean) {
        this.isSeparator = value;
    }

    private setIconClass(icon: string) {
        if (icon) {
            const classes = icon.split(' ');
            if (classes.length === 1) {
                classes.unshift('wtf');
            }
            this.iconClasses = classes;
        } else {
            this.iconClasses = null;
        }
    }
}
