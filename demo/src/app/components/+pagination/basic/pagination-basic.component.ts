import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-pagination-basic',
    templateUrl: './pagination-basic.component.html'
})
export class DemoPaginationBasicComponent implements OnInit {
    public pagination = {
        pageIndex: 1,
        pageSize: 20,
        total: 100
    };

    ngOnInit() {}

    onPageChange(pageIndex: number) {
        console.log(pageIndex);
    }
}
