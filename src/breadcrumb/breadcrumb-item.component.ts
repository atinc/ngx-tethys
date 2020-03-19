import { ViewContainerRef, ElementRef } from '@angular/core';
import {
    Component,
    ChangeDetectionStrategy,
    HostBinding,
    ContentChild,
    Directive,
    TemplateRef,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'thy-breadcrumb-item,[thyBreadcrumbItem]',
    template: `
        <ng-template #content><ng-content></ng-content></ng-template>
    `,
    exportAs: 'ThyBreadcrumbItem',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyBreadcrumbItemComponent {
    @HostBinding(`class.thy-breadcrumb-item`) _isBreadcrumbItem = true;

    @ViewChild('content') content: TemplateRef<any>;

    @ContentChild('contentRef') contentRef: any;
}
