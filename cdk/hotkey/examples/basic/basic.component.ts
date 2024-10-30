import { Component, OnInit, inject } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';

@Component({
    selector: 'thy-hotkey-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyHotkeyBasicExampleComponent implements OnInit {
    private notify = inject(ThyNotifyService);

    content: string = '这是一段文字';

    ngOnInit(): void {}

    save() {
        this.content = '';
        this.notify.success('成功', '保存成功');
    }
}
