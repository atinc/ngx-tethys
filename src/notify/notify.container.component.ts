import { Component, OnInit, HostBinding } from '@angular/core';
import { ThyNotifyOption } from './notify-option.interface';
import { ThyNotifyService } from './notify.service';


@Component({
    selector: 'thy-notify-container',
    templateUrl: './notify.container.component.html'
})
export class ThyNotifyContainerComponent implements OnInit {

    @HostBinding('class.thy-notify-root') className = true;

    initialState: any;

    public notifyQueue: any;

    constructor() { }

    ngOnInit() {
        this.initialState.notifyQueue$.subscribe((data: any) => {
            this.notifyQueue = data;
        });
    }
}
