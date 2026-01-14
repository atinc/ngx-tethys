import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, TemplateRef, ViewEncapsulation, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyBreadcrumb, ThyBreadcrumbItem } from 'ngx-tethys/breadcrumb';
import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';
import { ThyCascaderSearchOption } from './types';
import { SafeAny } from 'ngx-tethys/types';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @internal
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,

    selector: '[thy-cascader-search-option]',
    templateUrl: './cascader-search-option.component.html',
    imports: [ThyFlexibleText, ThyCheckbox, ThyBreadcrumb, ThyBreadcrumbItem, FormsModule, NgTemplateOutlet],
    host: {
        class: 'thy-cascader-search-list-item px-4 d-flex align-items-center cursor-pointer',
        '[class.multiple]': 'multiple()',
        '[class.active]': 'active()'
    }
})
export class ThyCascaderSearchOptionComponent implements OnInit {
    readonly option = input<ThyCascaderSearchOption>();

    readonly multiple = input(false, { transform: coerceBooleanProperty });

    readonly isOnlySelectLeaf = input(true, { transform: coerceBooleanProperty });

    readonly active = input(false, { transform: coerceBooleanProperty });

    readonly optionRender = input<TemplateRef<SafeAny>>();

    @HostListener('click', ['$event'])
    public toggleClick($event: Event) {
        if (this.multiple()) {
            return;
        }
        this.toggleSelectChange.emit(this.option()!);
    }

    readonly toggleSelectChange = output<ThyCascaderSearchOption>();

    constructor() {}

    ngOnInit() {}

    public clickCheckbox(event: Event) {
        // 已选中的在搜索情况下不能取消选择
        if (this.active()) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    public toggleOption(value: boolean) {
        this.toggleSelectChange.emit(this.option()!);
    }
}
