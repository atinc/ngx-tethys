import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyCascader } from 'ngx-tethys/cascader';
import { ThyFormGroup } from 'ngx-tethys/form';
import { clone, options } from '../cascader-address-options';
import { ThyNotifyService } from 'ngx-tethys/notify';

@Component({
    selector: 'thy-cascader-auto-expand-example',
    templateUrl: './auto-expand.component.html',
    imports: [ThyCascader, FormsModule]
})
export class AutoExpandComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    public areaCode = clone(options);

    public singleValues: any[] = ['12', '1201', '120102'];

    public multipleValues: any[] = [
        ['12', '1201', '120102'],
        ['12', '1201', '120103'],
        ['14', '1404', '140406']
    ];

    public isShow: boolean;

    ngOnInit() {}

    public selectChanges(values: any): void {
        this.notifyService.info(`selected data is ${values}`);
    }
}
