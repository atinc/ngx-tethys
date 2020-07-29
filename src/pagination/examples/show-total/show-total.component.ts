import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-pagination-show-total-example',
    templateUrl: './show-total.component.html'
})
export class ThyPaginationShowTotalExampleComponent implements OnInit {
    public pagination = {
        pageIndex: 1,
        pageSize: 20,
        total: 100
    };

    ngOnInit() {}
}
