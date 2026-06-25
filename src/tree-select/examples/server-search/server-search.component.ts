import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filterTreeData, ThyTreeSelect } from 'ngx-tethys/tree-select';
import { timer } from 'rxjs';
import { searchTreeSelectData } from '../mock-data';

@Component({
    selector: 'app-tree-select-server-search-example',
    templateUrl: './server-search.component.html',
    imports: [ThyTreeSelect, FormsModule, CommonModule]
})
export class ThyTreeSelectServerSearchExampleComponent implements OnInit {
    allTreeNodes = searchTreeSelectData;

    treeSelectNodes = signal(searchTreeSelectData);

    loadState = signal(true);

    selectedValue = '';

    ngOnInit() {
        this.search('');
    }

    search(value: string) {
        this.loadState.set(false);
        // fake api response data
        timer(3000).subscribe(() => {
            if (!value) {
                this.treeSelectNodes.set(this.allTreeNodes);
            } else {
                this.treeSelectNodes.set(filterTreeData(this.allTreeNodes, value, 'name'));
            }
            this.loadState.set(true);
        });
    }
}
