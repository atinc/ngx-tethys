import { ThyCascader } from 'ngx-tethys/cascader';
import { ThyFormGroup } from 'ngx-tethys/form';
import { ThyNotifyService } from 'ngx-tethys/notify';

import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { clone, options } from '../cascader-address-options';
import { ThyTagModule } from 'ngx-tethys/tag';

@Component({
    selector: 'thy-cascader-any-level-selectable-example',
    templateUrl: './any-level-selectable.component.html',
    imports: [ThyFormGroup, ThyCascader, ThyTagModule, FormsModule]
})
export class ThyCascaderAnyLevelSelectableExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    public areaCode = clone(options);

    public singleValues: any[] = ['12', '1201', '120102'];

    public multipleValues: any[] = [
        ['12', '1201', '120102'],
        ['12', '1201', '120103'],
        ['14', '1404', '140406']
    ];

    ngOnInit() {}

    public selectChanges(values: any): void {
        this.notifyService.info(`selected data is ${values}`);
    }
}
