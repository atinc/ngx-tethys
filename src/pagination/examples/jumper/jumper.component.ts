import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-pagination-jumper-example',
    templateUrl: './jumper.component.html'
})
export class ThyPaginationJumperExampleComponent implements OnInit {
    public pagination = {
        pageIndex: 3,
        pageSize: 10,
        total: 100
    };

    ngOnInit() {}
}
