import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyBreadcrumb, ThyBreadcrumbItem } from 'ngx-tethys/breadcrumb';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-breadcrumb-icon-example',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyBreadcrumb, ThyBreadcrumbItem, ThyIcon]
})
export class ThyBreadcrumbIconExampleComponent {}
