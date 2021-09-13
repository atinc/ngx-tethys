import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-custom-select-search-example',
    templateUrl: './search.component.html'
})
export class ThySelectSearchExampleComponent implements OnInit {
    listOfOption: Array<{ label: string; value: string }> = [];

    ngOnInit() {
        const children: Array<{ label: string; value: string }> = [];
        for (let i = 10; i < 36; i++) {
            children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        children.push({ label: '张三', value: 'zhangsan' });
        this.listOfOption = children;
    }
}
