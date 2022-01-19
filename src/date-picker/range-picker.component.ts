import { PanelMode, ThyShortcutPosition, ThyShortcutRange } from './standard-types';
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
import { ThyDatePickerConfigService } from './date-picker.service';

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

    constructor(
        cdr: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef,
        private datePickerConfigService: ThyDatePickerConfigService
    ) {
        super(cdr);
        renderer.addClass(elementRef.nativeElement, 'thy-calendar-picker');
    }
}
