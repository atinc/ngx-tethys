import { Component, OnInit, signal } from '@angular/core';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { timer } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-select-server-search-example',
    templateUrl: './server-search.component.html',
    imports: [ThySelect, ThyOption, FormsModule]
})
export class ThySelectServerSearchExampleComponent implements OnInit {
    searchResultList = signal<Array<{ _id: string; display_name: string }>>([]);

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
        this.search('');
    }

    search(value: string) {
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
            this.searchResultList.set(this.defaultEnterpriseList.concat(result));
        });
    }
}
