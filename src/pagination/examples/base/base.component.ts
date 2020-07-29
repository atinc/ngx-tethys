import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-pagination-base-example',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css']
})
export class ThyPaginationBaseExampleComponent implements OnInit {
    public pagination = {
        pageIndex: 1,
        pageSize: 20,
        total: 100
    };

    constructor() {}

    ngOnInit() {}
}
