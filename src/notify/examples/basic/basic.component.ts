import { ThyNotifyService } from 'ngx-tethys';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-notify-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyNotifyBasicExampleComponent implements OnInit {
    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    showDefault() {
        this.notifyService.show({
            title: '添加项目成功！'
        });
    }
}
