import { Component, OnInit } from '@angular/core';
import { ThyTableEmptyOptions } from 'ngx-tethys/table';

@Component({
    selector: 'thy-table-empty-example',
    templateUrl: './empty.component.html',
    styles: ':host > div { height: 400px }',
    standalone: false
})
export class ThyTableEmptyExampleComponent implements OnInit {
    public data: [] = [];

    emptyOptions: ThyTableEmptyOptions = {
        message: 'There is no user data'
    };

    ngOnInit() {}
}
