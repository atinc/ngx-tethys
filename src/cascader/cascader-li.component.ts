import { InputBoolean, UpdateHostClassService } from 'ngx-tethys/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
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
    set active(value: boolean) {
        this.isActive = value;
        // setTimeout(() => {
        // this.cdr.detectChanges();
        // });
    }

    get active() {
        return this.isActive;
    }

    @HostBinding('class.thy-cascader-menu-item-disabled')
    get disabled() {
        return this.option.disabled;
    }

    @HostBinding('class.thy-cascader-menu-item-expand')
    get expand() {
        return this.option && !this.option.isLeaf;
    }

    @Input() thyLabelProperty: string;

    private isActive = false;

    constructor(private cdr: ChangeDetectorRef) {}

    public getOptionLabel() {
        return this.option ? this.option[this.thyLabelProperty || 'label'] : '';
    }

    ngOnInit() {}
}
