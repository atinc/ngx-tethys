import { Component, OnInit, signal } from '@angular/core';
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
    loadMoreOptions = signal<ThySelectOptionModel[]>([]);

    options = signal<ThySelectOptionModel[]>(groupOptions);

    value = '';

    multipleValue: Array<string> = [];

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
                    newData.push({ label: `第${this.page() + 1}页`, value: `${this.page()}` });
                }
                this.loadMoreOptions.set([...this.loadMoreOptions(), ...newData]);

                this.loadMoreOptions().forEach((item, index: number) => {
                    item.value = `${item.value}${index}`;
                });

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
