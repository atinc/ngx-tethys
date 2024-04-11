import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { clone, options } from '../cascader-address-options';
import { SafeAny } from 'ngx-tethys/types';
import { ThyFormDirective, ThyFormGroup } from 'ngx-tethys/form';
import { ThyCascader } from 'ngx-tethys/cascader/cascader.component';
import { ThyTagModule } from 'ngx-tethys/tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const customOptions: SafeAny[] = [
    { label: '全部', value: 'all', children: [], isLeaf: true },
    { label: '自定义选项2', value: 'custom_option_1', children: [], isLeaf: true }
];

@Component({
    selector: 'thy-cascader-custom-options-example',
    templateUrl: './custom-options.component.html',
    standalone: true,
    imports: [ThyFormDirective, ThyFormGroup, ThyCascader, ThyTagModule, CommonModule, FormsModule]
})
export class ThyCascaderCustomOptionsExampleComponent implements OnInit {
    public areaCode: SafeAny[] = [];

    public values: SafeAny[] = ['all'];

    public singleValues: SafeAny[] = ['12', '1201', '120102'];

    public multipleValues: SafeAny[] = [['all']];

    public multipleValues2: SafeAny[] = [['11'], ['12', '1201', '120102'], ['12', '1201', '120103'], ['14', '1404', '140406']];

    public customOptions: SafeAny[] = customOptions;

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {
        this.areaCode = clone(options);
    }

    public selectChanges(values: SafeAny): void {
        this.notifyService.info(`selected data is ${values}`);
    }
}
