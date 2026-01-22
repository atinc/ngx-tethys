import { Component, OnInit, signal } from '@angular/core';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-select-scroll-load-example',
    templateUrl: './scroll-load.component.html',
    imports: [ThySelect, ThyOption, FormsModule]
})
export class ThySelectScrollLoadExampleComponent implements OnInit {
    loadMoreData = signal<Array<{ thyLabelText: string; _id: string }>>([]);

    listOfSelectedValue = '00';

    loading = signal(false);

    haveMore = signal(true);

    page = signal(0);

    onScrollToBottom() {
        if (!this.loading() && this.haveMore()) {
            this.page.set(this.page() + 1);
            this.fetchOptions().subscribe(() => {
                this.loading.set(false);
            });
        }
    }

    fetchOptions() {
        this.loading.set(true);
        return timer(1000).pipe(
            tap(() => {
                const newData = [];
                for (let index = 0; index < 10; index++) {
                    newData.push({ thyLabelText: `第${this.page() + 1}页 第${index + 1}个`, _id: `${this.page()}${index}` });
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
        });
    }
}
