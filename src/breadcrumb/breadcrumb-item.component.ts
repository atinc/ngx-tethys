import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-breadcrumb-item,[thyBreadcrumbItem]',
    template: '<ng-content></ng-content>',
    exportAs: 'ThyBreadcrumbItem',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyBreadcrumbItemComponent {
    @HostBinding(`class.thy-breadcrumb-item`) _isBreadcrumbItem = true;
}
