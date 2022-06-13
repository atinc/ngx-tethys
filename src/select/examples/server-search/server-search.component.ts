import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'thy-select-server-search-example',
    templateUrl: './server-search.component.html'
})
export class ThySelectServerSearchExampleComponent implements OnInit {
    searchResultList: Array<{ _id: string; display_name: string }> = [];

    defaultEnterpriseList = [
        {
            _id: 'aaa',
            display_name: '企业A'
        },
        {
            _id: 'bbb',
            display_name: '企业b'
        }
    ];

    selectedEnterprise = [this.defaultEnterpriseList[0]._id, this.defaultEnterpriseList[1]._id];

    searchEnterpriseList = [
        {
            _id: 'aaa',
            display_name: '企业A'
        },
        {
            _id: 'bbb',
            display_name: '企业b'
        }
    ];

    ngOnInit() {
        for (let i = 10; i < 36; i++) {
            this.searchEnterpriseList.push({ _id: i.toString(36) + i, display_name: i.toString(36) + i });
        }
        this.searchEnterpriseList = this.searchEnterpriseList.concat(this.defaultEnterpriseList);
        this.thyOnSearch('');
    }

    thyOnSearch(value: string) {
        // fake api response data
        timer(100).subscribe(() => {
            const result = this.searchEnterpriseList
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
