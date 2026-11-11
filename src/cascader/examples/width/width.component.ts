import { Component, OnInit, inject } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyCascader } from 'ngx-tethys/cascader';
import { clone, options } from '../cascader-address-options';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-cascader-width-example',
    templateUrl: './width.component.html',
    imports: [ThyCascader, FormsModule]
})
export class ThyCascaderWidthExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    public areaCode: any[] = [];

    public values: any[] = ['12', '1201', '120102'];

    ngOnInit() {
        this.areaCode = clone(options);
    }

    public selectChanges(values: any): void {
        this.notifyService.info(`selected data is ${values}`);
    }
}
