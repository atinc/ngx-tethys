import { Component, OnInit  } from '@angular/core';

const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true
        }]
    }, {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
    }]
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true
        }]
    }]
}];


@Component({
    selector: 'demo-confirm-section',
    templateUrl: './cascader-section.component.html',
    styles: [
        `.demo-select {
            width: 500px;
        }`
    ]
})
export class DemoCascaderSectionComponent implements OnInit {
    /** init data */
    public thyOptions = null;

    /** ngModel value */
    public values: any[] = null;

    ngOnInit(): void {
        // let's set nzOptions in a asynchronous way
        setTimeout(() => {
            this.thyOptions = options;
        }, 100);
    }

    public onChanges(values: any): void {
        console.log(this.values);
    }
}
