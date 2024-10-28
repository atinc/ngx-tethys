import { ThyNotifyService } from 'ngx-tethys/notify';
import { Component, OnInit, inject } from '@angular/core';

@Component({
    selector: 'thy-notify-type-example',
    templateUrl: './type.component.html'
})
export class ThyNotifyTypeExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);


    ngOnInit() {}

    showNotAutoClose() {
        this.notifyService.success(null, '创建项目成功！');
        this.notifyService.info(null, '你可以尝试创建一个项目。');
        this.notifyService.warning(null, '删除项目后，项目将无法还原！');
        this.notifyService.error(null, '删除项目失败！');
    }

    openNotify(type: string) {
        let content: string = '创建项目成功！';
        switch (type) {
            case 'success':
                content = '创建项目成功！';
                break;
            case 'info':
                content = '你可以尝试创建一个项目。';
                break;
            case 'warning':
                content = '删除项目后，项目将无法还原！';
                break;
            case 'error':
                content = '删除项目失败！';
                break;

            default:
                break;
        }
        this.notifyService[type](null, content);
    }
}
