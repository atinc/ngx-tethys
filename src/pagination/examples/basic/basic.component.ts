import { Component } from '@angular/core';

@Component({
    selector: 'thy-pagination-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyPaginationBasicExampleComponent {
    currentIndex = 1;

    pageSize = 10;

    constructor() {}

    onPageSizeChanged(event: number) {
        this.pageSize = event;
    }
}
