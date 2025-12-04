import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-select-performance-example',
    templateUrl: './performance.component.html',
    styles: [
        `
            .select-container {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
            }
            thy-select,
            thy-custom-select {
                flex: 0 0 auto;
                width: 120px;
                margin-right: 20px;
                margin-bottom: 20px;
            }
        `
    ],
    imports: [ThySelect, ThyOption, FormsModule]
})
export class ThySelectPerformanceExampleComponent implements OnInit, AfterViewInit {
    private perfTracker = perfTracker();

    selectCount = 22;

    optionCount = 250;

    listOfSelect = Array.from({ length: this.selectCount }, (_, index) => ({
        id: index + 1
    }));

    listOfOption = Array.from({ length: this.optionCount }, (_, index) => ({
        value: `${index + 1}option`,
        text: `${index + 1} 选项`
    }));

    constructor() {
        console.log('数据量:', `${this.selectCount} * ${this.optionCount}`);
        this.perfTracker.add('constructor');
    }

    ngOnInit(): void {
        this.perfTracker.add('ngOnInit');
    }

    ngAfterViewInit(): void {
        this.perfTracker.add('ngAfterViewInit');
    }
}

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
