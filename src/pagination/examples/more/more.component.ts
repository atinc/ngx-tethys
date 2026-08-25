import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyPagination } from 'ngx-tethys/pagination';

@Component({
    selector: 'thy-pagination-more-example',
    templateUrl: './more.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyPagination]
})
export class ThyPaginationMoreExampleComponent {
    constructor() {}
}
