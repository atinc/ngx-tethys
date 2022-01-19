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
import { DatePickerConfig } from './date-picker.service';

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

    @Input() thyShowShortcut: boolean = this.datePickerConfig.showShortcut;

    @Input() set thyShortcutPosition(position: ShortcutPosition) {
        if (!!position) {
            this.shortcutPosition = position;
        }
    }

    @Input() set thyShortcutRanges(ranges: ShortcutRange[]) {
        if (ranges && helpers.isArray(ranges)) {
            this.shortcutRanges = [...ranges];
        }
    }

    shortcutRanges: ShortcutRange[] = this.datePickerConfig.shortcutRanges;

    shortcutPosition: ShortcutPosition = this.datePickerConfig.shortcutPosition;

    constructor(
        cdr: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef,
        private datePickerConfig: DatePickerConfig
    ) {
        super(cdr);
        renderer.addClass(elementRef.nativeElement, 'thy-calendar-picker');
    }
}
