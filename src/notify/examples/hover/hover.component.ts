import { ThyNotifyService } from 'ngx-tethys';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-notify-hover-example',
    templateUrl: './hover.component.html'
})
export class ThyNotifyHoverExampleComponent implements OnInit {
    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    showHoverClose() {
        this.notifyService.show({
            type: 'success',
            title: '成功',
            content: '添加项目成功！',
            pauseOnHover: false
        });
    }
}
