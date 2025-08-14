import { Component, OnInit } from '@angular/core';
import { ThyTableRowEvent, ThyPageChangedEvent, ThyTableColumnSkeletonType, ThyTable, ThyTableColumnComponent } from 'ngx-tethys/table';
import { of } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-table-pagination-example',
    templateUrl: './pagination.component.html',
    imports: [ThyTable, ThyTableColumnComponent, ThyIcon]
})
export class ThyTablePaginationExampleComponent implements OnInit {
    data: Array<{ id: number; name: string; age: number; job: string; address: string }> = [];

    public pagination = {
        index: 1,
        size: 5,
        total: 44,
        sizeOptions: [5, 10, 20]
    };

    loadingDone = false;

    skeletonTypes: ThyTableColumnSkeletonType[] = [
        ThyTableColumnSkeletonType.default,
        ThyTableColumnSkeletonType.default,
        ThyTableColumnSkeletonType.member
    ];

    private getRandomIndex(max: number) {
        return Math.floor(Math.random() * max);
    }

    private generateDataByPageIndex() {
        this.loadingDone = false;
        return of(null)
            .pipe(
                delay(1000),
                finalize(() => {
                    this.loadingDone = true;
                })
            )
            .subscribe({
                next: () => {
                    const originalData = [
                        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
                        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
                        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park' },
                        { id: 4, name: 'Elyse', age: 31, job: 'Engineer', address: 'Yichuan Ningxia' },
                        { id: 5, name: 'Jill', age: 22, job: 'DevOps', address: 'Hangzhou' }
                    ];

                    const startIndex = (this.pagination.index - 1) * this.pagination.size;
                    const size =
                        this.pagination.total - startIndex < this.pagination.size
                            ? this.pagination.total - startIndex
                            : this.pagination.size;
                    this.data = [];
                    for (let i = startIndex; i < size + startIndex; i++) {
                        this.data.push({
                            ...originalData[this.getRandomIndex(originalData.length)],
                            id: i + 1
                        });
                    }
                },
                error: error => {}
            });
    }

    ngOnInit() {
        this.generateDataByPageIndex();
    }

    onPageChange(event: ThyPageChangedEvent) {
        this.pagination.index = event.page;
        this.generateDataByPageIndex();
    }

    onPageSizeChange(event: number) {
        this.pagination.size = event;
        this.pagination.index = 0;
        this.generateDataByPageIndex();
    }

    onRowClick(event: ThyTableRowEvent) {
        console.log(event);
    }
}
