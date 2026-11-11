import { Component } from '@angular/core';
import { ThyPagination } from 'ngx-tethys/pagination';

@Component({
    selector: 'thy-pagination-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyPagination]
})
export class ThyPaginationBasicExampleComponent {
    currentIndex = 1;

    pageSize = 10;

    constructor() {}

    onPageSizeChanged(event: number) {
        this.pageSize = event;
    }
}
