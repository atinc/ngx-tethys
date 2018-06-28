import { Component, OnInit, Input, ContentChild, TemplateRef, QueryList, Output, EventEmitter, HostBinding } from '@angular/core';
import { ThyOptionComponent } from './option.component';
// import { ThyOptionGroupComponent } from './option-group.component';
import { ThySelectCustomComponent } from './select-custom.component';
import { UpdateHostClassService } from '../shared';
import { helpers } from '../util';

@Component({
    selector: 'select-container',
    templateUrl: './select-container.component.html'
})
export class SelectContainerComponent implements OnInit {

    @Input() listOfOptionComponent: QueryList<ThyOptionComponent>;

    public searchText = '';

    public isSearch: boolean;

    public searchListOption: any = [];

    constructor(
        public parent: ThySelectCustomComponent,
        private updateHostClassService: UpdateHostClassService
    ) {
    }

    ngOnInit() {
        if (!this.isSearch) {
            this.searchListOption = this.listOfOptionComponent;
        }
    }

    selectedOption(option: ThyOptionComponent) {
        if (option.thyGroupLabel || option.thyDisabled) {
            return;
        }
        this.parent.selectItem(option);
    }

    onSearchFilter() {
        if (this.parent.thyServerSearch) {
            this.parent.thyOnSearch.emit(this.searchText);
            this.isSearch = false;
        } else {
            const text = (this.searchText || '').toLowerCase();
            if (!text) {
                this.clearSearchText();
                return;
            }
            if (/^#(.*)/g.test(text)) {
                this.isSearch = false;
                return;
            }
            this.isSearch = true;
            const searchData: any = [];
            if (text) {
                if (this.listOfOptionComponent.length > 0) {
                    this.listOfOptionComponent.forEach((item: any) => {
                        if (!item.custom) {
                            const _searchKey = item.thySearchKey ? item.thySearchKey : item.thyLabelText;
                            if (_searchKey && _searchKey.toLowerCase().indexOf(text) >= 0) {
                                searchData.push(item);
                            }
                        }
                    });
                }
                this.searchListOption = searchData;
            }
        }

    }

    clearSearchText() {
        this.searchText = '';
        this.isSearch = false;
        this.searchListOption = this.listOfOptionComponent;
    }
}

