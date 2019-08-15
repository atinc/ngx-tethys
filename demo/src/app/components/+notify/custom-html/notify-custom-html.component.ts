import { Component, OnInit, ElementRef } from '@angular/core';
import { ThyNotifyService } from '../../../../../../src/notify/notify.service';

@Component({
    selector: 'demo-notify-custom-html',
    templateUrl: './notify-custom-html.component.html'
})
export class DemoNotifyCustomHtmlComponent implements OnInit {
    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    showWithHtml(htmlRef: ElementRef) {
        this.notifyService.show({
            type: 'error',
            title: '错误 ',
            html: htmlRef
        });
    }
}
