import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'thy-breadcrumb-item,[thyBreadcrumbItem]',
    template: '<ng-content></ng-content><thy-icon class="default-icon" thyIconName="angle-right"></thy-icon>',
    exportAs: 'ThyBreadcrumbItem',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyBreadcrumbItemComponent {
    @HostBinding(`class.thy-breadcrumb-item`) _isBreadcrumbItem = true;
    @HostBinding(`class.non-current-path`) isNonCurrentPath = false;

    @Input()
    set thyNonCurrentStyle(value: boolean) {
        this.isNonCurrentPath = value;
    }
}
