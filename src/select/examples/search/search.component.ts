import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-select-search-example',
    templateUrl: './search.component.html',
    imports: [ThySelect, ThyOption]
})
export class ThySelectSearchExampleComponent implements OnInit {
    listOfOption = listOfOption;

    ngOnInit() {}
}
