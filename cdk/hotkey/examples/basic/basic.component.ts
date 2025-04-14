import { Component, OnInit, inject } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { ThyAlert } from 'ngx-tethys/alert';
import { ThyButton } from 'ngx-tethys/button';
import { ThyHotkeyDirective } from '@tethys/cdk/hotkey';

@Component({
    selector: 'thy-hotkey-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyAlert, ThyButton, ThyHotkeyDirective]
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
