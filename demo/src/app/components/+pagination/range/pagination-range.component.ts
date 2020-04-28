import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-pagination-range',
    templateUrl: './pagination-range.component.html'
})
export class DemoPaginationRangeComponent implements OnInit {
    public pagination = {
        pageIndex: 5,
        pageSize: 20,
        total: 200
    };

    ngOnInit() {}
}
