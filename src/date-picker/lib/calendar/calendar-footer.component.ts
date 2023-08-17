import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ElementRef, ViewContainerRef, OnInit } from '@angular/core';

import { TinyDate } from 'ngx-tethys/util';
import { ThyButtonComponent } from 'ngx-tethys/button';
import { FormsModule } from '@angular/forms';
import { ThyInnerTimePickerComponent } from 'ngx-tethys/time-picker';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf } from '@angular/common';
import { InputBoolean } from 'ngx-tethys/core';

/**
 * @private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'calendar-footer',
    exportAs: 'calendarFooter',
    templateUrl: 'calendar-footer.component.html',
    standalone: true,
    imports: [NgIf, ThyIconComponent, ThyInnerTimePickerComponent, FormsModule, ThyButtonComponent]
})
export class CalendarFooterComponent implements OnInit {
    @Input() showTime = false;
    @Input() mustShowTime = false;
    @Input() value: TinyDate;
    @Input() @InputBoolean() disableTimeConfirm = false;
    @Output() readonly selectTime = new EventEmitter<TinyDate>();
    @Output() readonly clickOk = new EventEmitter<void>();
    @Output() readonly clickRemove = new EventEmitter<void>();
    @Output() readonly showTimePickerChange = new EventEmitter<boolean>();
    isShowTime = false;
    isCanTime = false;
    constructor(_elementRef: ElementRef, _viewContainerRef: ViewContainerRef) {}

    ngOnInit() {
        this._initTimeShowMode();
        if (!this.value) {
            this.value = new TinyDate();
        }
    }

    onSelectTime(date: Date): void {
        this.selectTime.emit(new TinyDate(date));
    }

    onTimeOk() {
        if (this.disableTimeConfirm) {
            return;
        }
        this.selectTime.emit(this.value);
        this.clickOk.emit();
    }

    onClear() {
        this.value = null;
        this.clickRemove.emit();
    }

    changeTimeShowMode(type: string) {
        switch (type) {
            case 'can':
                this.isCanTime = true;
                this.isShowTime = false;
                break;
            case 'show':
                this.isCanTime = false;
                this.isShowTime = true;
                break;
        }
        this.showTimePickerChange.emit(this.isShowTime);
    }

    private _initTimeShowMode() {
        if (this.mustShowTime) {
            this.changeTimeShowMode('show');
        } else {
            if (this.showTime) {
                this.changeTimeShowMode('can');
            }
        }
    }
}
