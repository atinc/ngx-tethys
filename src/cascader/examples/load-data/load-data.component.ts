import { Component, OnInit, inject } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyCascader, ThyCascaderOption } from 'ngx-tethys/cascader';
import { clone, options } from '../cascader-address-options';
import { FormsModule } from '@angular/forms';
import { delay, of } from 'rxjs';
import * as _provinces from '../_china-division/provinces.json';
import * as _cities from '../_china-division/cities.json';
import * as _areas from '../_china-division/areas.json';

const provincesAll = _provinces as any;
const citiesAll = _cities as any;
const areasAll = _areas as any;

const provinces = provincesAll.default;
const cities = citiesAll.default;
const areas = areasAll.default;

@Component({
    selector: 'thy-cascader-load-data-example',
    templateUrl: './load-data.component.html',
    imports: [ThyCascader, FormsModule]
})
export class ThyCascaderLoadDataExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    public areaCode: any[] = [];

    public values: any[] = ['12', '1201', '120102'];

    ngOnInit() {
        this.areaCode = provinces.map((province: { name: any; code: any; children: any }) => ({
            label: province.name,
            value: province.code
        }));
    }

    public selectChanges(values: any): void {
        this.notifyService.info(`selected data is ${values}`);
    }

    public loadData = (node: ThyCascaderOption, index?: number) => {
        return of(node.children).pipe(delay(1000));
    };
}
