import { Component, OnInit, Input, HostBinding, ElementRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CascaderOption } from './cascader.component';
import { UpdateHostClassService } from 'ngx-tethys/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: '[thy-cascader-option]',
    templateUrl: './cascader-li.component.html',
    providers: [UpdateHostClassService]
})
export class ThyCascaderOptionComponent implements OnInit {
    @Input() option: CascaderOption;

    @HostBinding('class.thy-cascader-menu-item') item = true;

    @HostBinding('class.thy-cascader-menu-item-active')
    @Input()
    active = false;

    @HostBinding('class.thy-cascader-menu-item-disabled')
    get disabled() {
        return this.option.disabled;
    }

    @HostBinding('class.thy-cascader-menu-item-expand')
    get expand() {
        return this.option && !this.option.isLeaf;
    }

    @Input() thyLabelProperty: string;

    constructor() {}

    public getOptionLabel() {
        return this.option ? this.option[this.thyLabelProperty || 'label'] : '';
    }

    ngOnInit() {}
}
