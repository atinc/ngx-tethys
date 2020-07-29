import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-pagination-size-example',
    templateUrl: './size.component.html'
})
export class ThyPaginationSizeExampleComponent implements OnInit {
    public pagination = {
        pageIndex: 3,
        pageSize: 10,
        total: 100
    };

    ngOnInit() {}
}
