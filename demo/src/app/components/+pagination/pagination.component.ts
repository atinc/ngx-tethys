import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.scss']
})
export class DemoPaginationComponent implements OnInit {

    public page_ = 2;

    ngOnInit() {

    }
}
