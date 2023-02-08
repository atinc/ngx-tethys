import { helpers } from 'ngx-tethys/util';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { BasePickerComponent } from './base-picker.component';
import { ThyDatePickerConfigService } from './date-picker.service';
import { ThyPanelMode, ThyShortcutPosition, ThyShortcutRange } from './standard-types';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'thy-range-picker',
    exportAs: 'thyRangePicker',
    templateUrl: './base-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyRangePickerComponent)
        }
    ],
    host: {
        '[attr.tabindex]': 'tabIndex'
    }
})
export class ThyRangePickerComponent extends BasePickerComponent implements OnInit {
    isRange = true;

    private hostRenderer = useHostRenderer();

    @Input() thyMode: ThyPanelMode = 'date';

    @Input() thyShowShortcut: boolean = this.datePickerConfigService.showShortcut;

    @Input() set thyShortcutPosition(position: ThyShortcutPosition) {
        if (!!position) {
            this.shortcutPosition = position;
        }
    }

    @Input() set thyShortcutRanges(ranges: ThyShortcutRange[]) {
        if (ranges && helpers.isArray(ranges)) {
            this.shortcutRanges = [...ranges];
        }
    }

    shortcutRanges: ThyShortcutRange[] = this.datePickerConfigService.shortcutRanges;

    shortcutPosition: ThyShortcutPosition = this.datePickerConfigService.shortcutPosition;

    constructor(cdr: ChangeDetectorRef, protected elementRef: ElementRef, private datePickerConfigService: ThyDatePickerConfigService) {
        super(cdr, elementRef);
        this.hostRenderer.addClass('thy-calendar-picker');
    }
}
