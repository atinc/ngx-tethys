import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-input-search',
    templateUrl: 'search.component.html'
})
export class DemoInputSearchComponent implements OnInit {
    public searchText = 'worktile';

    constructor() {}

    ngOnInit() {}

    public change() {
        console.log(this.searchText);
    }
}
