import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-pagination-show-total',
    templateUrl: './pagination-show-total.component.html'
})
export class DemoPaginationShowTotalComponent implements OnInit {
    public pagination = {
        pageIndex: 1,
        pageSize: 20,
        total: 100
    };

    ngOnInit() {}
}
