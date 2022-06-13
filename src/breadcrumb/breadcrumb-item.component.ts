import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';

/**
 * 面包屑 Item 组件
 */
@Component({
    selector: 'thy-breadcrumb-item,[thyBreadcrumbItem]',
    template: '<ng-content></ng-content><thy-icon class="separator-icon" thyIconName="angle-right"></thy-icon>',
    exportAs: 'ThyBreadcrumbItem',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-breadcrumb-item'
    }
})
export class ThyBreadcrumbItemComponent {}
