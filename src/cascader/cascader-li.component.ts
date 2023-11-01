import { ThyCheckboxComponent } from 'ngx-tethys/checkbox';
import { InputBoolean } from 'ngx-tethys/core';
import { ThyFlexibleTextComponent } from 'ngx-tethys/flexible-text';
import { ThyRadioComponent } from 'ngx-tethys/radio';
import { ThyStopPropagationDirective } from 'ngx-tethys/shared';

import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyCascaderOption } from './types';

/**
 * @internal
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[thy-cascader-option]',
    templateUrl: './cascader-li.component.html',
    standalone: true,
    imports: [NgIf, ThyFlexibleTextComponent, ThyCheckboxComponent, ThyRadioComponent, FormsModule, ThyStopPropagationDirective]
})
export class ThyCascaderOptionComponent implements OnInit {
    @Input() option: ThyCascaderOption;

    @Input()
    @InputBoolean()
    multiple = false;

    @Input()
    @InputBoolean()
    isOnlySelectLeaf = true;

    @HostBinding('class') class = 'd-flex';

    @HostBinding('class.thy-cascader-menu-item') item = true;

    @HostBinding('class.thy-cascader-menu-item-active')
    @Input()
    @InputBoolean()
    active: boolean = false;

    @Input()
    @InputBoolean()
    selected: boolean = false;

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

    ngOnInit() {}

    public toggleOption(value: boolean) {
        this.toggleSelectChange.emit(value);
    }
}
