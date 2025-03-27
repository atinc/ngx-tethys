import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-pagination-total-example',
    templateUrl: './total.component.html',
    standalone: false
})
export class ThyPaginationTotalExampleComponent implements OnInit {
    currentIndex = 10;

    ngOnInit() {}
}
