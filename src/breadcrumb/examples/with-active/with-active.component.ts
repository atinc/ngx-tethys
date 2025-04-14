import { Component } from '@angular/core';
import { ThyBreadcrumb, ThyBreadcrumbItem } from 'ngx-tethys/breadcrumb';
import { ThyDropdownDirective, ThyDropdownMenuComponent } from 'ngx-tethys/dropdown';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-breadcrumb-active-active-example',
    templateUrl: './with-active.component.html',
    styleUrls: ['./with-active.component.scss'],
    imports: [ThyBreadcrumb, ThyBreadcrumbItem, ThyIcon, ThyDropdownDirective, ThyDropdownMenuComponent]
})
export class ThyBreadcrumbActiveExampleComponent {}
