import {
    Component, HostBinding, Input, Output,
    ContentChild, TemplateRef, ElementRef,
    ViewEncapsulation, EventEmitter
} from '@angular/core';
import { ThyTranslate, UpdateHostClassService } from '../shared';

export type InputSearchTheme = 'ellipse' | '';

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

    @HostBinding('class.input-search-ellipse') _isSearchEllipse = false;

    searchText: string;

    @Input()
    set searchModel(value: string) {
        this.searchText = value;
    }

    @Input()
    set thyTheme(value: InputSearchTheme) {
        if (value === 'ellipse') {
            this._isSearchEllipse = true;
        }
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

