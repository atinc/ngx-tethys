import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';
import { ThyRadio } from 'ngx-tethys/radio';
import { ThyStopPropagationDirective } from 'ngx-tethys/shared';
import { SafeAny } from 'ngx-tethys/types';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Signal, TemplateRef, ViewEncapsulation, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyCascaderOption } from './types';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @internal
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[thy-cascader-option]',
    templateUrl: './cascader-li.component.html',
    imports: [ThyFlexibleText, ThyCheckbox, ThyRadio, FormsModule, ThyStopPropagationDirective, NgTemplateOutlet],
    host: {
        class: 'd-flex thy-cascader-menu-item',
        '[class.thy-cascader-menu-item-active]': 'active()',
        '[class.thy-cascader-menu-item-disabled]': 'disabled()',
        '[class.thy-cascader-menu-item-expand]': 'expand()'
    }
})
export class ThyCascaderOptionComponent implements OnInit {
    readonly option = input<ThyCascaderOption>();

    readonly multiple = input(false, { transform: coerceBooleanProperty });

    readonly isOnlySelectLeaf = input(true, { transform: coerceBooleanProperty });

    readonly optionRender = input<TemplateRef<SafeAny>>();

    readonly active = input(false, { transform: coerceBooleanProperty });

    readonly halfSelected = input(false, { transform: coerceBooleanProperty });

    readonly selected = input(false, { transform: coerceBooleanProperty });

    readonly disabled: Signal<boolean> = computed(() => this.option().disabled);

    readonly expand: Signal<boolean> = computed(() => this.option() && !this.option().isLeaf);

    readonly labelProperty = input<string>('label');

    readonly toggleSelectChange = output<boolean>();

    constructor() {}

    ngOnInit() {}

    public toggleOption(value: boolean) {
        this.toggleSelectChange.emit(value);
    }
}
