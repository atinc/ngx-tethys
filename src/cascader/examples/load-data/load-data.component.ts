import { Component, OnInit, inject, signal } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyCascader, ThyCascaderOption } from 'ngx-tethys/cascader';
import { FormsModule } from '@angular/forms';
import { delay, of } from 'rxjs';
import * as _provinces from '../_china-division/provinces.json';
import * as _cities from '../_china-division/cities.json';
import * as _areas from '../_china-division/areas.json';
import { keyBy } from 'ngx-tethys/util';
import { clone, options } from '../cascader-address-options';

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

    public areaCode = signal([]);

    public value: any[] = ['12', '1201', '120102'];

    provincesMapByCode = keyBy(provinces, 'code');

    citiesMapByCode = keyBy(cities, 'code');

    thyLoadingDone = signal(true);

    ngOnInit() {
        this.areaCode.set(
            provinces.map((province: { name: any; code: any; children: any }) => ({
                label: province.name,
                value: province.code
            }))
        );
    }

    public selectChanges(values: any): void {
        this.notifyService.info(`selected data is ${values}`);
    }

    public loadData = (node: ThyCascaderOption, index?: number) => {
        if (this.provincesMapByCode[node.value]) {
            const data = (cities as { code: string; name: string; provinceCode: string }[])
                .filter(item => {
                    return item.provinceCode === node.value;
                })
                .map(item => {
                    if (item.name === '石家庄市') {
                        return {
                            label: item.name,
                            value: item.code,
                            isLeaf: true
                        };
                    } else {
                        return {
                            label: item.name,
                            value: item.code
                        };
                    }
                });
            node.children = data;
            return of(node).pipe(delay(1000));
        } else if (this.citiesMapByCode[node.value]) {
            const data = (areas as { code: string; name: string; cityCode: string }[])
                .filter(item => {
                    return item.cityCode === node.value;
                })
                .map(item => {
                    return {
                        label: item.name,
                        value: item.code,
                        isLeaf: true
                    };
                });
            node.children = data;
            return of(node).pipe(delay(1000));
        }
    };

    public thyOnSearch(event: string) {
        console.log(event);
        this.thyLoadingDone.set(false);
        setTimeout(() => {
            this.thyLoadingDone.set(true);
            this.areaCode.set(clone(options));
        }, 1000);
    }
}
