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

    iconClasses: string[];

    @Input()
    set thyIcon(icon: string) {
        this.setIconClass(icon);
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
