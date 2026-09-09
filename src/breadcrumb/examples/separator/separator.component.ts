import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyBreadcrumb, ThyBreadcrumbItem } from 'ngx-tethys/breadcrumb';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-breadcrumb-separator-example',
    templateUrl: './separator.component.html',
    styleUrls: ['./separator.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyBreadcrumb, ThyBreadcrumbItem, ThyIcon]
})
export class ThyBreadcrumbSeparatorExampleComponent {}
