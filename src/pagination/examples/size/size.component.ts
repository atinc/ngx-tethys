import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyPagination } from 'ngx-tethys/pagination';

@Component({
    selector: 'thy-pagination-size-example',
    templateUrl: './size.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyPagination]
})
export class ThyPaginationSizeExampleComponent implements OnInit {
    currentIndex = 2;

    ngOnInit() {}
}
