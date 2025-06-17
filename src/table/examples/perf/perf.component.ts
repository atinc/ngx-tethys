import { Component, OnInit, afterNextRender, AfterViewInit, afterRender, AfterContentChecked, DoCheck } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyButton } from 'ngx-tethys/button';
import { ThyTable, ThyTableColumnComponent } from 'ngx-tethys/table';

function perfTracker() {
    let lastDate = new Date().getTime();
    return {
        add(name: string) {
            const current = new Date().getTime();
            console.log(`[${name}] ${current}, duration: ${current - lastDate}`);
            lastDate = current;
        }
    };
}

@Component({
    selector: 'thy-table-perf-example',
    templateUrl: './perf.component.html',
    imports: [ThyTable, ThyTableColumnComponent, ThyButton, ThyIcon, ThyAvatar]
})
export class ThyTablePerfExampleComponent implements OnInit, AfterViewInit, AfterContentChecked, DoCheck {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];

    loadingDone = false;

    protected perfTracker = perfTracker();

    constructor() {
        for (let i = 4; i < 1000; i++) {
            this.data.push({ id: i, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' });
        }

        this.perfTracker.add('constructor');
        afterNextRender(() => {
            this.perfTracker.add('afterNextRender');
        });

        afterRender(() => {
            this.perfTracker.add('afterRender');
        });
    }
    ngDoCheck(): void {
        // this.perfTracker.add('ngDoCheck');
    }

    ngAfterContentChecked(): void {
        // this.perfTracker.add('ngAfterContentChecked');
    }

    ngOnInit(): void {
        this.loadingDone = true;
        this.perfTracker.add('ngOnInit');
    }

    ngAfterViewInit(): void {
        this.perfTracker.add('ngAfterViewInit');
    }

    refresh() {
        this.perfTracker.add('loading');
        this.loadingDone = false;
        setTimeout(() => {
            this.data = [...this.data];
            this.loadingDone = true;
            this.perfTracker.add('refresh');
        });
    }
}
