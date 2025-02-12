import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'thy-select-server-search-example',
    templateUrl: './server-search.component.html',
    standalone: false
})
export class ThySelectServerSearchExampleComponent implements OnInit {
    searchResultList: Array<{ _id: string; display_name: string }> = [];

    defaultEnterpriseList = [
        {
            _id: 'aaa',
            display_name: '选项一'
        },
        {
            _id: 'bbb',
            display_name: '选项二'
        }
    ];

    selectedEnterprise = [this.defaultEnterpriseList[0]._id, this.defaultEnterpriseList[1]._id];

    enterpriseList = [
        {
            _id: 'aaa',
            display_name: '选项一'
        },
        {
            _id: 'bbb',
            display_name: '选项二'
        },
        {
            _id: 'ccc',
            display_name: '选项三'
        },
        {
            _id: 'ddd',
            display_name: '选项四'
        },
        {
            _id: 'eee',
            display_name: '选项五'
        }
    ];

    ngOnInit() {
        this.thyOnSearch('');
    }

    thyOnSearch(value: string) {
        // fake api response data
        timer(100).subscribe(() => {
            const result = this.enterpriseList
                .filter(
                    option =>
                        option.display_name.includes(value) &&
                        !this.defaultEnterpriseList
                            .map(ent => {
                                return ent._id;
                            })
                            .includes(option._id)
                )
                .map(option => {
                    return { ...option };
                });
            this.searchResultList = this.defaultEnterpriseList.concat(result);
        });
    }
}
