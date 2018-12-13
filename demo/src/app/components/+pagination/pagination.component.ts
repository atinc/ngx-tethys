import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.scss']
})
export class DemoPaginationComponent implements OnInit {
    public page_ = 2;

    public apiThyPaginationParameters = [
        {
            property: 'itemsPerPage',
            description: `每页条目数量`,
            type: 'Number',
            default: '10'
        },
        {
            property: 'totalItems',
            description: `总页数 与 totalPages 二选一传入`,
            type: 'Number',
            default: '-'
        },
        {
            property: 'totalPages',
            description: `总条目 与 totalItems 二选一传入`,
            type: 'Number',
            default: '-'
        },
        {
            property: 'disabled',
            description: ``,
            type: 'boolean',
            default: 'false'
        }
    ];
    ngOnInit() {}
}
