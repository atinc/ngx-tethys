import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-pagination-jumper',
    templateUrl: './pagination-jumper.component.html'
})
export class DemoPaginationJumperComponent implements OnInit {
    public pagination = {
        pageIndex: 3,
        pageSize: 10,
        total: 100
    };

    ngOnInit() {}
}
