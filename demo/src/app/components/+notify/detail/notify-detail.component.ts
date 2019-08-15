import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from '../../../../../../src/notify/notify.service';

@Component({
    selector: 'demo-notify-detail',
    templateUrl: './notify-detail.component.html'
})
export class DemoNotifyDetailComponent implements OnInit {
    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {}

    showHasDetail() {
        this.notifyService.show({
            type: 'error',
            title: '错误',
            content: '获取数据失败！',
            detail: `chunk {main} main.js (main) 703 kB [initial] [rendered] ℹ ｢wdm｣: Compiled successfully.ℹ ｢wdm｣: Compiling...
        Date: 2018-04-20T08:57:23.362Z - Hash: d96e601a21c551b7c38a
        - Time: 11376ms 4 unchanged chunks chunk {main} main.js (main) 703 kB [initial]
        [rendered]ℹ ｢wdm｣: Compiled successfully.`,
            duration: 0
        });
        this.notifyService.show({
            type: 'warning',
            title: '警告',
            content: '获取数据异常！',
            detail: `chunk {main} main.js (main) 703 kB [initial] [rendered] ℹ ｢wdm｣: Compiled successfully.ℹ ｢wdm｣: Compiling...
        Date: 2018-04-20T08:57:23.362Z - Hash: d96e601a21c551b7c38a
        - Time: 11376ms 4 unchanged chunks chunk {main} main.js (main) 703 kB [initial]
        [rendered]ℹ ｢wdm｣: Compiled successfully.`,
            duration: 0
        });
        this.notifyService.show({
            type: 'success',
            title: '成功',
            content: '获取数据成功！',
            detail: `chunk {main} main.js (main) 703 kB [initial] [rendered] ℹ ｢wdm｣: Compiled successfully.ℹ ｢wdm｣: Compiling...
        Date: 2018-04-20T08:57:23.362Z - Hash: d96e601a21c551b7c38a
        - Time: 11376ms 4 unchanged chunks chunk {main} main.js (main) 703 kB [initial]
        [rendered]ℹ ｢wdm｣: Compiled successfully.`,
            duration: 0
        });
        this.notifyService.show({
            type: 'info',
            title: '提示信息',
            content: '信息提示！',
            detail: `chunk {main} main.js (main) 703 kB [initial] [rendered] ℹ ｢wdm｣: Compiled successfully.ℹ ｢wdm｣: Compiling...
        Date: 2018-04-20T08:57:23.362Z - Hash: d96e601a21c551b7c38a
        - Time: 11376ms 4 unchanged chunks chunk {main} main.js (main) 703 kB [initial]
        [rendered]ℹ ｢wdm｣: Compiled successfully.`,
            duration: 0
        });
    }

    showNotAutoClose() {
        this.notifyService.success(null, '创建项目成功！');
        this.notifyService.info(null, '你可以尝试创建一个项目。');
        this.notifyService.warning(null, '删除项目后，项目将无法还原！');
        this.notifyService.error(null, '删除项目失败！');
    }
}
