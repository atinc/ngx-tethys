import { Component, OnInit } from '@angular/core';
import { ThySelectOptionModel, ThySelect } from 'ngx-tethys/select/custom-select/custom-select.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-virtual-scroll-select-example',
    templateUrl: './virtual-scroll.component.html',
    imports: [FormsModule, ThySelect]
})
export class ThyVirtualScrollSelectExampleComponent implements OnInit {
    // 生成大量数据用于测试
    options: ThySelectOptionModel[] = [];
    value = '';
    multipleValue: string[] = [];

    ngOnInit() {
        // 生成10000条数据
        for (let i = 0; i < 10000; i++) {
            this.options.push({
                label: `选项 ${i + 1}`,
                value: `option_${i}`,
                disabled: i % 100 === 0 // 每100个禁用一个
            });
        }
    }

    onSelectionChange(event: any) {
        console.log('选择变化:', event);
    }
}
