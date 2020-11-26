import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ElementRef,
    Renderer2,
    ViewContainerRef,
    OnInit
} from '@angular/core';

import { TinyDate } from 'ngx-tethys/util';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'calendar-footer',
    exportAs: 'calendarFooter',
    templateUrl: 'calendar-footer.component.html'
})
export class CalendarFooterComponent implements OnInit {
    @Input() showTime = false;
    @Input() mustShowTime = false;
    @Input() value: TinyDate;
    @Output() readonly selectTime = new EventEmitter<TinyDate>();
    @Output() readonly clickOk = new EventEmitter<void>();
    @Output() readonly clickRemove = new EventEmitter<void>();
    @Output() readonly showTimePickerChange = new EventEmitter<boolean>();
    isShowTime = false;
    isCanTime = false;
    constructor(_elementRef: ElementRef, _renderer: Renderer2, _viewContainerRef: ViewContainerRef) {}

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
