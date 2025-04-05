import { Component } from '@angular/core';
import { ThyBreadcrumb, ThyBreadcrumbItem } from 'ngx-tethys/breadcrumb';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-breadcrumb-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyBreadcrumb, ThyBreadcrumbItem, ThyIcon]
})
export class ThyBreadcrumbBasicExampleComponent {}
