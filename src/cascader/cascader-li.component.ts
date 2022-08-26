import { InputBoolean, UpdateHostClassService } from 'ngx-tethys/core';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CascaderOption } from './types';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[thy-cascader-option]',
    templateUrl: './cascader-li.component.html',
    providers: [UpdateHostClassService]
})
export class ThyCascaderOptionComponent implements OnInit {
    @Input() option: CascaderOption;

    @Input()
    @InputBoolean()
    multiple = false;

    @Input()
    @InputBoolean()
    isOnlySelectLeaf = true;

    @HostBinding('class.thy-cascader-menu-item') item = true;

    @HostBinding('class.thy-cascader-menu-item-active')
    @Input()
    @InputBoolean()
    active: boolean = false;

    @HostBinding('class.thy-cascader-menu-item-disabled')
    get disabled() {
        return this.option.disabled;
    }

    @HostBinding('class.thy-cascader-menu-item-expand')
    get expand() {
        return this.option && !this.option.isLeaf;
    }

    @Input() labelProperty: string = 'label';

    @Output() toggleSelectChange: EventEmitter<boolean> = new EventEmitter();

    constructor() {}

    public getOptionLabel() {
        return this.option ? this.option[this.labelProperty] : '';
    }

    ngOnInit() {}

    public toggleOption(value: boolean) {
        this.toggleSelectChange.emit(value);
    }
}
