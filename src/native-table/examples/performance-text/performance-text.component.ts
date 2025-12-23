import { afterEveryRender, afterNextRender, ChangeDetectorRef, Component, ElementRef, inject, OnInit } from '@angular/core';
import { ThyNativeTableModule } from 'ngx-tethys/native-table';
import { ThyButton } from 'ngx-tethys/button';

function perfTracker() {
    let lastDate = new Date().getTime();
    return {
        add(name: string) {
            const current = new Date().getTime();
            // console.log(`[${name}] ${current}, duration: ${current - lastDate}`);
            lastDate = current;
        },
        reset(name: string) {
            const current = new Date().getTime();
            // console.log(`[${name}] ${current}`);
            lastDate = current;
        }
    };
}
@Component({
    selector: 'thy-native-table-performance-text-example',
    templateUrl: './performance-text.component.html',
    imports: [ThyNativeTableModule, ThyButton]
})
export class ThyNativeTablePerformanceTextExampleComponent implements OnInit {
    data = [
        { id: 0, name: 'Peter', age: 25, date: new Date(), rate: 3, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 1, name: 'James', age: 26, date: new Date(), rate: 3, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 2, name: 'Tom', age: 30, date: new Date(), rate: 3, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];

    perfTracker = perfTracker();

    elementRef = inject(ElementRef);

    cdr = inject(ChangeDetectorRef);

    dataLength = 100;

    loadingDone = true;

    lastIndex = 1000000000000;

    newData = {
        id: `${this.lastIndex}`,
        name: `${this.lastIndex}Tom`,
        age: 10,
        job: 'Engineer',
        address: 'New Industrial Park, Shushan, Hefei, Anhui'
    };

    constructor() {
        for (let i = 3; i < this.dataLength; i++) {
            this.data.push({
                id: i,
                name: 'Tom',
                age: 10,
                date: new Date(),
                rate: 3,
                job: 'Engineer',
                address: 'New Industrial Park, Shushan, Hefei, Anhui'
            });
        }

        this.perfTracker.add('constructor');

        afterNextRender(() => {
            this.perfTracker.add('afterNextRender');
        });

        afterEveryRender({
            read: () => {
                if (this.elementRef.nativeElement.querySelectorAll('tr').length >= this.dataLength - 1) {
                    this.perfTracker.add('afterRender');
                }
            }
        });
    }

    ngOnInit(): void {}

    onSubmitAge(event: number, row: any): void {
        row.age = event;
        console.log('Submitted age for:', row);
    }

    onSubmitName(event: string, row: any): void {
        row.name = event;
        console.log('Submitted name for:', row);
    }

    refresh() {
        this.perfTracker.reset('loading');
        this.loadingDone = false;
        setTimeout(() => {
            this.loadingDone = true;
            this.cdr.markForCheck();
            this.perfTracker.reset('refreshing');
        });
    }

    insertData() {
        this.lastIndex++;
        setTimeout(() => {
            // 修改数据
            this.data = [{ ...this.newData, id: `${this.lastIndex}` as any, date: new Date(), rate: 3 }, ...this.data];
            this.perfTracker.reset('refreshing');
        });
    }
}
