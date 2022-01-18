import { PanelMode, ShortcutPosition, ShortcutRange } from './standard-types';
import {
    forwardRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Renderer2,
    NgZone,
    OnInit,
    Input,
    Inject
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BasePickerComponent } from './base-picker.component';
import { helpers } from 'ngx-tethys/util';
import { ThyDatePickerShortcutConfig, THY_DATE_PICKER_SHORTCUT_CONFIG } from './date-picker.config';

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
    ]
})
export class ThyRangePickerComponent extends BasePickerComponent implements OnInit {
    isRange = true;

    @Input() thyMode: PanelMode = 'date';

    @Input() set thyShortcutPosition(position: ShortcutPosition) {
        if (!!position) {
            this.shortcutPosition = position;
        }
    }

    @Input() set thyShortcutRanges(ranges: ShortcutRange[] | boolean) {
        if (!ranges) {
            this.shortcutRanges = [];
        } else {
            if (helpers.isArray(ranges)) {
                this.shortcutRanges = [...this.datePickerShortcutConfig.presetShortcutRanges, ...ranges];
            } else {
                this.shortcutRanges = [...this.datePickerShortcutConfig.presetShortcutRanges];
            }
        }
    }

    shortcutPosition: ShortcutPosition = this.datePickerShortcutConfig.shortcutPosition;

    constructor(
        cdr: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef,
        @Inject(THY_DATE_PICKER_SHORTCUT_CONFIG) private datePickerShortcutConfig: ThyDatePickerShortcutConfig
    ) {
        super(cdr);
        renderer.addClass(elementRef.nativeElement, 'thy-calendar-picker');
    }
}
