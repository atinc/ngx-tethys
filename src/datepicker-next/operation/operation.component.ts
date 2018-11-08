import { Component, OnInit, HostBinding } from '@angular/core';
import { ThyDatepickerNextContainerComponent } from '../datepicker-container.component';
import { ThyDatepickerNextEventsEnum } from '../datepicker-next.interface';

@Component({
    selector: 'thy-datepicker-next-operation',
    templateUrl: 'operation.component.html'
})

export class ThyDatepickerNextOperationComponent implements OnInit {

    @HostBinding('class') stylesClass = 'operation-container';

    constructor(
        public parentComponent: ThyDatepickerNextContainerComponent,
    ) { }

    ngOnInit() { }

    ok() {
        this.parentComponent.behaviorValueChange(ThyDatepickerNextEventsEnum.done);
    }

    clear() {
        this.parentComponent.behaviorValueChange(ThyDatepickerNextEventsEnum.clean);
    }
}
