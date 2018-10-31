import { Component, OnInit, HostBinding } from '@angular/core';
import { ThyDatepickerNextStore, datepickerNextActions } from '../datepicker-next.store';
import { DatepickerNextValueChangeTypeEnum } from '../datepicker-next.interface';

@Component({
    selector: 'thy-datepicker-next-operation',
    templateUrl: 'operation.component.html'
})

export class ThyDatepickerNextOperationComponent implements OnInit {

    @HostBinding('class') stylesClass = 'operation-container';

    constructor(
        public store: ThyDatepickerNextStore
    ) { }

    ngOnInit() { }

    ok() {
        this.store.dispatch(datepickerNextActions.valueChange, {
            type: DatepickerNextValueChangeTypeEnum.ok
        });
    }

    clear() {
        this.store.dispatch(datepickerNextActions.valueChange, {
            type: DatepickerNextValueChangeTypeEnum.clear
        });
    }
}
