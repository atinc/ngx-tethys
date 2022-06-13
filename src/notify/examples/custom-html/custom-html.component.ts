import { ThyNotifyService } from 'ngx-tethys/notify';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'thy-notify-custom-example',
    templateUrl: './custom-html.component.html'
})
export class ThyNotifyCustomHtmlExampleComponent implements OnInit {
    @ViewChild('notify', { static: true }) notify: ElementRef;

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    showWithHtml() {
        this.notifyService.show({
            type: 'error',
            title: '错误 ',
            html: this.notify
        });
    }
}
