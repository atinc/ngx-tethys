import { ThyCascaderComponent } from 'ngx-tethys/cascader';
import { ThyFormGroupComponent } from 'ngx-tethys/form';
import { ThyNotifyService } from 'ngx-tethys/notify';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { clone, options } from '../cascader-address-options';
import { ThyTagModule } from 'ngx-tethys/tag';

@Component({
    selector: 'thy-cascader-any-level-selectable-example',
    templateUrl: './any-level-selectable.component.html',
    standalone: true,
    imports: [ThyFormGroupComponent, ThyCascaderComponent, ThyTagModule, CommonModule, FormsModule]
})
export class ThyCascaderAnyLevelSelectableExampleComponent implements OnInit {
    public areaCode = clone(options);

    public singleValues: any[] = ['12', '1201', '120102'];

    public multipleValues: any[] = [
        ['12', '1201', '120102'],
        ['12', '1201', '120103'],
        ['14', '1404', '140406']
    ];

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    public selectChanges(values: any): void {
        this.notifyService.info(`selected data is ${values}`);
    }
}
