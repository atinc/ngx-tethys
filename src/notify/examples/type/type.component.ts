import { ThyNotifyService } from 'ngx-tethys';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-notify-type-example',
    templateUrl: './type.component.html'
})
export class ThyNotifyTypeExampleComponent implements OnInit {
    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    showNotAutoClose() {
        this.notifyService.success(null, '创建项目成功！');
        this.notifyService.info(null, '你可以尝试创建一个项目。');
        this.notifyService.warning(null, '删除项目后，项目将无法还原！');
        this.notifyService.error(null, '删除项目失败！');
    }
}
