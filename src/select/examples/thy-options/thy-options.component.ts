import { Component, OnInit } from '@angular/core';
import { ThySelect, ThySelectOptionModel } from 'ngx-tethys/select/custom-select/custom-select.component';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { groupOptions } from '../mock-data';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-options-example',
    templateUrl: './thy-options.component.html',
    imports: [ThySelect, FormsModule]
})
export class ThyOptionsExampleComponent implements OnInit {
    loadMoreOptions: ThySelectOptionModel[] = [];

    options = groupOptions;

    value = '';

    multipleValue: Array<string> = [];

    loading = false;

    haveMore = true;

    page = 0;

    onScrollToBottom() {
        if (!this.loading && this.haveMore) {
            this.page++;
            this.fetchOptions().subscribe(() => {
                this.loading = false;
            });
        }
    }

    fetchOptions() {
        this.loading = true;
        return timer(1000).pipe(
            tap(() => {
                for (let index = 0; index < 10; index++) {
                    this.loadMoreOptions.push({ label: `第${this.page + 1}页`, value: `${this.page}` });
                }

                this.loadMoreOptions.forEach((item, index: number) => {
                    item.value = `${item.value}${  index}`;
                });

                this.loadMoreOptions = [...this.loadMoreOptions];

                if (this.page > 3) {
                    this.haveMore = false;
                }
            })
        );
    }

    ngOnInit() {
        this.fetchOptions().subscribe(() => {
            this.loading = false;
        });
    }
}
