import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-select-async-load-data-example',
    templateUrl: './load-async.component.html',
    imports: [ThySelect, ThyOption, FormsModule]
})
export class ThySelectAsyncLoadDataExampleComponent implements OnInit {
    loadMoreData: Array<{ thyLabelText: string; _id: string }> = [];

    listOfSelectedValue = '00';

    loading = false;

    haveMore = true;

    page = 0;

    loadState = true;

    fetchOptions() {
        this.loading = true;
        this.loadState = false;
        this.loadMoreData = [];
        return timer(1500).pipe(
            tap(() => {
                for (let index = 0; index < 10; index++) {
                    this.loadMoreData.push({ thyLabelText: `第${this.page + 1}页`, _id: `${this.page}` });
                }

                this.loadMoreData.forEach((item, index: number) => {
                    item._id = item._id + index;
                });

                if (this.page > 3) {
                    this.haveMore = false;
                }
            })
        );
    }

    ngOnInit() {
        this.fetchOptions().subscribe(() => {
            this.loading = false;
            this.loadState = true;
        });
    }

    expandChange(expand: boolean) {
        if (expand) {
            this.fetchOptions().subscribe(() => {
                this.loading = false;
                this.loadState = true;
            });
        }
    }
}
