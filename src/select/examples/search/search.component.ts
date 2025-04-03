import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-search-example',
    templateUrl: './search.component.html'
})
export class ThySelectSearchExampleComponent implements OnInit {
    listOfOption = listOfOption;

    ngOnInit() {}
}
