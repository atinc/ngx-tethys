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

    @HostBinding('class.thy-select-container') _isSelectContainer = true;

    @Input() listOfOptionComponent: QueryList<ThyOptionComponent>;

    public searchText = '';

    public isSearch: boolean;

    public searchListOption: ThyOptionComponent[] = [];

    constructor(
        public parent: ThySelectCustomComponent,
        private updateHostClassService: UpdateHostClassService
    ) {
    }

    ngOnInit() {
        if (!this.isSearch) {
            this.searchListOption = this.listOfOptionComponent.toArray();
        }
    }

    selectedOption(option: ThyOptionComponent) {
        if (option.thyGroupLabel || option.thyDisabled) {
            return;
        }
        this.parent.selectItem(option);
    }

    findOptionComponents(iterate: (option: ThyOptionComponent) => boolean): ThyOptionComponent[] {
        const result: ThyOptionComponent[] = [];
        this.listOfOptionComponent.forEach((item) => {
            if (item.thyGroupLabel) {
                const subOptions = item.filterOptionComponents(iterate);
                if (subOptions.length > 0) {
                    result.push(item);
                }
            } else {
                if (iterate(item)) {
                    result.push(item);
                }
            }
        });
        return result;
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
            if (text) {
                if (this.listOfOptionComponent.length > 0) {
                    this.searchListOption = this.findOptionComponents((item) => {
                        const _searchKey = item.thySearchKey ? item.thySearchKey : item.thyLabelText;
                        if (_searchKey && _searchKey.toLowerCase().indexOf(text) >= 0) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                } else {
                    this.searchListOption = [];
                }
            }
        }

    }

    clearSearchText() {
        this.searchText = '';
        this.isSearch = false;
        this.searchListOption = this.listOfOptionComponent.toArray();
        this.searchListOption.forEach((item) => {
            if (item.thyGroupLabel) {
                item.resetFilterComponents();
            }
        });
    }
}

