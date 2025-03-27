import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-input-search-example',
    templateUrl: './search.component.html',
    standalone: false
})
export class ThyInputSearchExampleComponent implements OnInit {
    public searchText = '';

    constructor() {}

    ngOnInit() {}

    public change() {
        console.log(this.searchText);
    }
}
