import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyInputSearch } from 'ngx-tethys/input';

@Component({
    selector: 'thy-input-search-shape-example',
    templateUrl: './search-shape.component.html',
    imports: [ThyInputSearch, ThyColDirective, ThyRowDirective, FormsModule]
})
export class ThyInputSearchShapeExampleComponent {
    public value = '';
}
