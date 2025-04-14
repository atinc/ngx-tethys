import { Component } from '@angular/core';
import { ThyPagination } from 'ngx-tethys/pagination';

@Component({
    selector: 'thy-pagination-custom-pages-example',
    templateUrl: './custom-pages.component.html',
    imports: [ThyPagination]
})
export class ThyPaginationCustomPagesExampleComponent {
    currentIndex = 1;

    pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    constructor() {}

    pageIndexChange(page: number) {}
}
