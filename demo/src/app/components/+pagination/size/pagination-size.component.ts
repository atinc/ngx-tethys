import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-pagination-size',
    templateUrl: './pagination-size.component.html'
})
export class DemoPaginationSizeComponent implements OnInit {
    public pagination = {
        pageIndex: 3,
        pageSize: 10,
        total: 100
    };

    ngOnInit() {}
}
