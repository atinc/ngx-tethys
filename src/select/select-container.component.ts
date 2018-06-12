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

    public selectedValues: any = [];

    constructor(
        public parent: ThySelectCustomComponent,
        private updateHostClassService: UpdateHostClassService
    ) {

    }

    ngOnInit() {
    }

    selectedOption(option: any) {
        if (option.thyDisabled) {
            return;
        }
        if (this.parent._mode === 'multiple') {
            if (this.parent._innerValues.length > 0) {
                const _index = this.parent._innerValues.findIndex((item: any) => {
                    return item.thyValue === option.thyValue;
                });
                if (_index === -1) {
                    option.selected = true;
                    this.parent._innerValues.push(option);
                } else {
                    option.selected = false;
                    this.parent._innerValues.splice(_index, 1);
                }
            } else {
                option.selected = true;
                this.parent._innerValues.push(option);
            }
            console.log(this.parent._innerValues);
            this.parent.valueOnChange(this.parent._innerValues);
        } else {
            this.parent._innerValue = option;
            this.parent._expandOptions = false;
            this.parent._removeClass();
            this.parent.valueOnChange(this.parent._innerValue);
        }
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
                            if (_searchKey.toLowerCase().indexOf(text) >= 0) {
                                searchData.push(item);
                            }
                        }
                    });
                }
                if (this.listOfOptionGroupComponent.length > 0) {
                    this.listOfOptionGroupComponent.forEach((group: any) => {
                        const groupData: any = [];
                        group.listOfOptionComponent.forEach((item: any) => {
                            const _searchKey = item.thySearchKey ? item.thySearchKey : item.thyLabelText;
                            if (_searchKey.toLowerCase().indexOf(text) >= 0) {
                                groupData.push(item);
                            }
                        });
                        searchData.push({
                            thyLabelText: group.thyLabelText,
                            listOfOptionComponent: groupData
                        });
                    });
                }
                this.searchData = searchData;
            }
        }

    }

    clearSearchText() {
        this.searchText = '';
        this.isSearch = false;
        this.searchData = [];
    }
}

