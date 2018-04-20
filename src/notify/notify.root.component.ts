import { Component, OnInit, HostBinding } from "@angular/core";
import { ThyNotifyOption } from "./notify-option.interface";
import { ThyNotifyService } from "./notify.service";


@Component({
    selector: 'thy-notify-root',
    templateUrl: './notify.root.component.html'
})
export class ThyNotifyRootComponent implements OnInit {

    @HostBinding('class.thy-notify-root') className = true;

    constructor(
        public notifyService: ThyNotifyService
    ) { }

    ngOnInit() {
    }
}
