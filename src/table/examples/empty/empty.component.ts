import { Component, OnInit } from '@angular/core';
import { ThyEmpty } from 'ngx-tethys/empty';
import { ThyRowDirective, ThyColDirective } from 'ngx-tethys/grid';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyTable, ThyTableColumnComponent, ThyTableEmptyOptions } from 'ngx-tethys/table';

@Component({
    selector: 'thy-table-empty-example',
    templateUrl: './empty.component.html',
    styles: ':host > div { height: 400px }',
    imports: [ThyTable, ThyTableColumnComponent, ThyIcon, ThyEmpty, ThyRowDirective, ThyColDirective]
})
export class ThyTableEmptyExampleComponent implements OnInit {
    public data: [] = [];

    emptyOptions: ThyTableEmptyOptions = {
        message: 'There is no user data'
    };

    ngOnInit() {}
}
