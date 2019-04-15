import { Component, OnInit, Input, QueryList, HostBinding, OnDestroy } from '@angular/core';
import { ThyOptionComponent } from './option.component';
import { ThySelectCustomComponent } from './select-custom.component';
import { UpdateHostClassService } from '../shared';

@Component({
    selector: 'select-container',
    templateUrl: './select-container.component.html'
})
export class SelectContainerComponent implements OnInit {
    @HostBinding('class.thy-select-container-wrapper') _isSelectContainer = true;

    _listOfOptionComponent: QueryList<ThyOptionComponent>;

    @Input()
    set listOfOptionComponent(value: QueryList<ThyOptionComponent>) {
        this._listOfOptionComponent = value;
        if (!this.isSearch) {
            this.showOptionComponents = this._listOfOptionComponent ? this._listOfOptionComponent.toArray() : [];
            if (this.parent._selectedOptions.length === 0) {
                this.showOptionComponents.forEach(item => {
                    item.selected = false;
                });
            }
        }
    }

    public searchText = '';

    public isSearch: boolean;

    public showOptionComponents: ThyOptionComponent[] = [];

    constructor(public parent: ThySelectCustomComponent, private updateHostClassService: UpdateHostClassService) {}

    ngOnInit() {}

    selectedOption(option: ThyOptionComponent) {
        if (option.thyGroupLabel || option.thyDisabled) {
            return;
        }
        this.parent.selectItem(option);
    }

    findOptionComponents(iterate: (option: ThyOptionComponent) => boolean): ThyOptionComponent[] {
        const result: ThyOptionComponent[] = [];
        this._listOfOptionComponent.forEach(item => {
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
            this.isSearch = true;
            if (text) {
                if (this._listOfOptionComponent.length > 0) {
                    this.showOptionComponents = this.findOptionComponents(item => {
                        const _searchKey = item.thySearchKey ? item.thySearchKey : item.thyLabelText;
                        if (_searchKey && _searchKey.toLowerCase().indexOf(text) >= 0) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                } else {
                    this.showOptionComponents = [];
                }
            }
        }
    }

    clearSearchText() {
        this.searchText = '';
        this.isSearch = false;
        this.showOptionComponents = this._listOfOptionComponent ? this._listOfOptionComponent.toArray() : [];
        this.showOptionComponents.forEach(item => {
            if (item.thyGroupLabel) {
                item.resetFilterComponents();
            }
        });
    }

    ngOnDestroy() {
        this.clearSearchText();
    }
}
