import { Component, OnInit, signal } from '@angular/core';
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
    loadMoreData = signal<Array<{ thyLabelText: string; _id: string }>>([]);

    listOfSelectedValue = '00';

    loading = signal(false);

    haveMore = signal(true);

    page = signal(0);

    loadState = signal(true);

    fetchOptions() {
        this.loading.set(true);
        this.loadState.set(false);
        this.loadMoreData.set([]);
        return timer(1500).pipe(
            tap(() => {
                const newData = [];
                for (let index = 0; index < 10; index++) {
                    newData.push({ thyLabelText: `第${this.page() + 1}页`, _id: `${this.page()}${index}` });
                }
                this.loadMoreData.set([...this.loadMoreData(), ...newData]);

                if (this.page() > 3) {
                    this.haveMore.set(false);
                }
            })
        );
    }

    ngOnInit() {
        this.fetchOptions().subscribe(() => {
            this.loading.set(false);
            this.loadState.set(true);
        });
    }

    expandChange(expand: boolean) {
        if (expand) {
            this.fetchOptions().subscribe(() => {
                this.loading.set(false);
                this.loadState.set(true);
            });
        }
    }
}
