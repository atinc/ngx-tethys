import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { clone, options } from '../cascader-address-options';
import { SafeAny } from 'ngx-tethys/types';
import { ThyFormDirective, ThyFormGroup } from 'ngx-tethys/form';
import { ThyCascader } from 'ngx-tethys/cascader/cascader.component';
import { ThyTagModule } from 'ngx-tethys/tag';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const CustomOptions: SafeAny[] = [
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

    public singleValues: any[] = ['12', '1201', '120102'];

    public multipleValues: any[] = [['all']];

    public multipleValues2: any[] = [['11'], ['12', '1201', '120102'], ['12', '1201', '120103'], ['14', '1404', '140406']];

    public customOptions0: SafeAny[] = clone(CustomOptions);
    public customOptions1: SafeAny[] = clone(CustomOptions);
    public customOptions2: SafeAny[] = clone(CustomOptions);
    public customOptions3: SafeAny[] = clone(CustomOptions);

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {
        this.areaCode = clone(options);
    }

    public selectChanges(values: any): void {
        this.notifyService.info(`selected data is ${values}`);
    }
}
