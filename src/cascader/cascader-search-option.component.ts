import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyBreadcrumb, ThyBreadcrumbItem } from 'ngx-tethys/breadcrumb';
import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyCascaderSearchOption } from './types';
import { SafeAny } from 'ngx-tethys/types';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @internal
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[thy-cascader-search-option]',
    templateUrl: './cascader-search-option.component.html',
    standalone: true,
    imports: [ThyFlexibleText, ThyCheckbox, ThyBreadcrumb, ThyBreadcrumbItem, ThyIcon, FormsModule, NgTemplateOutlet]
})
export class ThyCascaderSearchOptionComponent implements OnInit {
    @Input() option: ThyCascaderSearchOption;

    @HostBinding('class.multiple')
    @Input({ transform: coerceBooleanProperty })
    multiple = false;

    @Input({ transform: coerceBooleanProperty })
    isOnlySelectLeaf = true;
    @HostBinding('class') className = 'thy-cascader-search-list-item px-4 d-flex align-items-center cursor-pointer';

    @HostBinding('class.active')
    @Input({ transform: coerceBooleanProperty })
    active: boolean = false;

    @Input()
    optionRender: TemplateRef<SafeAny>;

    @HostListener('click', ['$event'])
    public toggleClick($event: Event) {
        if (this.multiple) {
            return;
        }
        this.toggleSelectChange.emit(this.option);
    }

    @Output() toggleSelectChange: EventEmitter<ThyCascaderSearchOption> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    public clickCheckbox(event: Event) {
        // 已选中的在搜索情况下不能取消选择
        if (this.active) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    public toggleOption(value: boolean) {
        this.toggleSelectChange.emit(this.option);
    }
}
