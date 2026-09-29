import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyInputSearch } from 'ngx-tethys/input';

@Component({
    selector: 'thy-input-search-example',
    templateUrl: './search.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyInputSearch, ThyRowDirective, ThyColDirective, FormsModule]
})
export class ThyInputSearchExampleComponent implements OnInit {
    public searchText = '';

    constructor() {}

    ngOnInit() {}

    public change() {
        console.log(this.searchText);
    }
}
