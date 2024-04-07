import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { InputBoolean } from 'ngx-tethys/core';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';
import { ThyRadio } from 'ngx-tethys/radio';
import { ThyStopPropagationDirective } from 'ngx-tethys/shared';
import { SafeAny } from 'ngx-tethys/types';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
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
    imports: [NgIf, ThyFlexibleText, ThyCheckbox, ThyRadio, FormsModule, ThyStopPropagationDirective, NgTemplateOutlet]
})
export class ThyCascaderOptionComponent implements OnInit {
    @Input() option: ThyCascaderOption;

    @Input()
    @InputBoolean()
    multiple = false;

    @Input()
    @InputBoolean()
    isOnlySelectLeaf = true;

    @Input()
    optionRender: TemplateRef<SafeAny>;

    @HostBinding('class') class = 'd-flex';

    @HostBinding('class.thy-cascader-menu-item') item = true;

    @HostBinding('class.thy-cascader-menu-item-active')
    @Input()
    @InputBoolean()
    active: boolean = false;

    @Input()
    @InputBoolean()
    halfSelected = false;

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
