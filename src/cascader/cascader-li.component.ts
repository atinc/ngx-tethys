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
    @HostBinding('class.thy-cascader-menu-item-active') _active = false;

    private _selected = false;

    @Input() option: ThyCascaderOption;

    @Input()
    @InputBoolean()
    multiple = false;

    @Input()
    @InputBoolean()
    isOnlySelectLeaf = true;

    @HostBinding('class') class = 'd-flex';

    @HostBinding('class.thy-cascader-menu-item') item = true;

    @Input()
    @InputBoolean()
    set active(val: boolean) {
        this._active = val;
        this.updateIndeterminate();
    }

    get active(): boolean {
        return this._active;
    }

    @Input()
    @InputBoolean()
    set selected(val: boolean) {
        this._selected = val;
        this.updateIndeterminate();
    }

    get selected(): boolean {
        return this._selected;
    }

    @HostBinding('class.thy-cascader-menu-item-disabled')
    get disabled() {
        return this.option.disabled;
    }

    @HostBinding('class.thy-cascader-menu-item-expand')
    get expand() {
        return this.option && !this.option.isLeaf;
    }

    @Input() labelProperty: string = 'label';

    @Input() @InputBoolean() canSelectionAll = false;

    @Output() toggleSelectChange: EventEmitter<boolean> = new EventEmitter();

    indeterminate = false;

    constructor() {}

    ngOnInit() {}

    public toggleOption(value: boolean) {
        if (this.active && this.multiple && this.isOnlySelectLeaf && !this.option.isLeaf) {
            this.indeterminate = !value;
        }
        this.toggleSelectChange.emit(value);
    }

    private updateIndeterminate() {
        if (this.active && this.multiple && !this.selected && this.isOnlySelectLeaf && !this.option.isLeaf) {
            this.indeterminate = true;
        } else {
            this.indeterminate = false;
        }
    }
}
