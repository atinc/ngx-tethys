import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { MatSelect, MatOption } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NzSelectModule } from 'ng-zorro-antd/select';

interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'thy-select-perf-example',
    templateUrl: './perf.component.html',
    styleUrls: ['./perf.component.scss'],
    imports: [
        ThySelect,
        ThyOption,
        // angular material
        MatSelect,
        MatOption,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        // ng-zorro
        NzSelectModule
    ]
})
export class ThySelectPerfExampleComponent implements OnInit, AfterViewInit {
    private perfTracker = perfTracker();

    private selectCount = 1;

    private optionCount = 2; // 20000

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
