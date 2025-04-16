import { Component, OnInit } from '@angular/core';
import { ThyPagination } from 'ngx-tethys/pagination';

@Component({
    selector: 'thy-pagination-total-example',
    templateUrl: './total.component.html',
    imports: [ThyPagination]
})
export class ThyPaginationTotalExampleComponent implements OnInit {
    currentIndex = 10;

    ngOnInit() {}
}
