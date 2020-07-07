import { ThyNotifyService } from 'ngx-tethys';

import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
    selector: 'app-notify-custom-example',
    templateUrl: './custom-html.component.html'
})
export class ThyNotifyCustomHtmlExampleComponent implements OnInit {
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
