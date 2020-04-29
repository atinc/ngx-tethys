import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-pagination-more',
    templateUrl: './pagination-more.component.html'
})
export class DemoPaginationMoreComponent implements OnInit {
    public pagination = {
        pageIndex: 3,
        pageSize: 20,
        total: 200
    };

    ngOnInit() {}
}
