import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-input-search-example',
    templateUrl: './search.component.html'
})
export class ThyInputSearchExampleComponent implements OnInit {
    public searchText = 'worktile';

    constructor() {}

    ngOnInit() {}

    public change() {
        console.log(this.searchText);
    }
}
