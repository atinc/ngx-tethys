
import { Component } from '@angular/core';
import { ThyNotifyService } from '../../../../../src/notify/notify.service';
import { ElementDef } from '@angular/core/src/view';

@Component({
    selector: 'demo-notify-section',
    templateUrl: './notify-section.component.html',
})
export class DemoNotifySectionComponent {


    constructor(
        private notifyService: ThyNotifyService
    ) { }

    showDefault() {
        this.notifyService.show({
            title: '添加项目成功！',
        });
    }

    showHoverClose() {
        this.notifyService.show({
            title: '添加项目成功！',
            pauseOnHover: false
        });
    }

    showNotAutoClose() {
        this.notifyService.show({
            type: 'success',
            title: '成功',
            content: '创建项目成功！success',
            duration: 0,
        });
        this.notifyService.show({
            type: 'info',
            title: '提示',
            content: '你可以尝试创建一个项目。info',
            duration: 0,
        });
        this.notifyService.show({
            type: 'warning',
            title: '警告',
            content: '删除项目后，项目将无法还原！warning',
            duration: 0,
        });
        this.notifyService.show({
            type: 'error',
            title: '错误 ',
            content: '删除项目失败！error',
            duration: 0,
        });
        this.notifyService.show({
            type: 'error',
            title: '错误 ',
            content: `
chunk {main} main.js (main) 703 kB [initial] [rendered] ℹ ｢wdm｣: Compiled successfully.ℹ ｢wdm｣: Compiling... Date: 2018-04-20错误错误错误错误T08:57:23.362Z - Hash: d96e601a21c551b7c38a - Time: 11376ms 4 unchanged chunks chunk {main} main.js (main) 703 kB [initial] [rendered]ℹ ｢wdm｣: Compiled successfully.
            `,
            duration: 0,
        });
    }

    showWithHtml(htmlRef: ElementDef) {
        this.notifyService.show({
            type: 'error',
            title: '错误 ',
            html: htmlRef,
        });
    }

}
