import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-pagination-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyPaginationBasicExampleComponent implements OnInit {
    public pagination = {
        pageIndex: 1,
        pageSize: 20,
        total: 100
    };

    constructor() {}

    ngOnInit() {}
}
