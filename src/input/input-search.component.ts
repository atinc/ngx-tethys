import {
    Component, HostBinding, Input, Output,
    ContentChild, TemplateRef, ElementRef,
    ViewEncapsulation, EventEmitter
} from '@angular/core';
import { ThyTranslate, UpdateHostClassService } from '../shared';


@Component({
    selector: 'thy-input-search',
    templateUrl: './input-search.component.html',
    providers: [
        UpdateHostClassService
    ],
    encapsulation: ViewEncapsulation.None
})
export class ThyInputSearchComponent {
    @HostBinding('class.input-search-container') _isSearchContainer = true;

    searchText: string;

    @Input()
    set searchModel(value: string) {
        this.searchText = value;
    }

    @Output() searchModelChange = new EventEmitter();

    constructor() {

    }

    searchTextChange() {
        this.searchModelChange.emit(this.searchText);
    }

    clearSearchText() {
        this.searchText = '';
        this.searchTextChange();
    }
}

