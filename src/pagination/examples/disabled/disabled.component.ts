import { Component } from '@angular/core';
import { ThyPagination } from 'ngx-tethys/pagination';

@Component({
    selector: 'thy-pagination-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyPagination]
})
export class ThyPaginationDisabledExampleComponent {
    currentIndex = 1;

    constructor() {}
}
