import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyPagination } from 'ngx-tethys/pagination';

@Component({
    selector: 'thy-pagination-jumper-example',
    templateUrl: './jumper.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyPagination]
})
export class ThyPaginationJumperExampleComponent implements OnInit {
    currentIndex = 10;

    ngOnInit() {}
}
