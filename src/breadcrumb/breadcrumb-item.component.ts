import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-breadcrumb-item,[thyBreadcrumbItem]',
    template: '<ng-content></ng-content><thy-icon class="default-icon" thyIconName="angle-right"></thy-icon>',
    exportAs: 'ThyBreadcrumbItem',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyBreadcrumbItemComponent {
    @HostBinding(`class.thy-breadcrumb-item`) _isBreadcrumbItem = true;
}
