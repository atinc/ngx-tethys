import { Component, OnInit, Input, ContentChild, TemplateRef, QueryList, Output, EventEmitter, } from '@angular/core';
import { ThyOptionComponent } from './option.component';
import { ThyOptionGroupComponent } from './option-group.component';
import { ThySelectCustomComponent } from './select-custom.component';

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
        public parent: ThySelectCustomComponent
    ) {

    }

    ngOnInit() {
    }

    selectedOption(option: any) {
        if (!option.custom) {
            this.parent._innerValue = option;
        } else {
            this.parent._innerValue = option.template;
        }

        this.parent._expandOptions = false;
    }

    changeSearchText() {
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
                        if ((item.label).toLowerCase().indexOf(text) >= 0) {
                            searchData.push(item);
                        }
                    }
                });
            }
            if (this.listOfOptionGroupComponent.length > 0) {
                this.listOfOptionGroupComponent.forEach((group: any) => {
                    const groupData: any = [];
                    group.listOfOptionComponent.forEach((item: any) => {
                        if ((item.label).toLowerCase().indexOf(text) >= 0) {
                            groupData.push(item);
                        }
                    });
                    searchData.push({
                        label: group.label,
                        listOfOptionComponent: groupData
                    });
                });
            }
            this.searchData = searchData;
        }

    }

    clearSearchText() {
        this.searchText = '';
        this.isSearch = false;
        this.searchData = [];
    }
}

