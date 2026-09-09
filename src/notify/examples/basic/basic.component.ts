import { ThyNotifyService } from 'ngx-tethys/notify';
import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-notify-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyButton]
})
export class ThyNotifyBasicExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    ngOnInit() {}

    showDefault() {
        this.notifyService.show({
            title: '添加项目成功！'
        });
    }
}
