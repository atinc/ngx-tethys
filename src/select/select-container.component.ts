import { Component, OnInit, Input, ContentChild, TemplateRef, QueryList, Output, EventEmitter, } from '@angular/core';
import { ThyOptionComponent } from './option.component';
import { ThyOptionGroupComponent } from './option-group.component';
import { ThySelectCustomComponent } from './select-custom.component';
import { UpdateHostClassService } from '../shared';

@Component({
    selector: 'select-container',
    templateUrl: './select-container.component.html'
})
export class SelectContainerComponent implements OnInit {

    @Input() listOfOptionComponent: QueryList<ThyOptionComponent>;

    @Input() listOfOptionGroupComponent: QueryList<ThyOptionGroupComponent>;

    public searchText = '';

    public isSearch: boolean;

    public searchData: any = [];

    constructor(
        public parent: ThySelectCustomComponent,
        private updateHostClassService: UpdateHostClassService
    ) {

    }

    ngOnInit() {
    }

    selectedOption(option: any) {
        if (!option.custom) {
            this.parent._innerValue = option;
        } else {
            this.parent._innerValue = option;
        }

        this.parent._expandOptions = false;
        this.parent._removeClass();
    }

    changeSearchText() {
        this.parent.thyFilterOption.emit(this.searchText);
    }

    clearSearchText() {
        this.searchText = '';
        this.isSearch = false;
        this.searchData = [];
    }
}

