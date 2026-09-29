import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyCascader } from 'ngx-tethys/cascader';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { clone, options } from '../cascader-address-options';

@Component({
    selector: 'thy-cascader-appearance-example',
    templateUrl: './appearance.component.html',
    styles: [
        `
            thy-cascader {
                width: 100%;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCascader, FormsModule, ThyColDirective, ThyRowDirective]
})
export class ThyCascaderAppearanceExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [];

    ngOnInit() {
        this.areaCode = clone(options);
    }
}
