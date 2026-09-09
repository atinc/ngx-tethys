import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyPagination } from 'ngx-tethys/pagination';

@Component({
    selector: 'thy-pagination-unit-example',
    templateUrl: './unit.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyPagination]
})
export class ThyPaginationUnitExampleComponent {}
