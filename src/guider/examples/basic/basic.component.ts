import { Component, OnInit } from '@angular/core';
import { ThyMultiSelectEvent, ThyGridRowEvent, ThyGridSize, ThyGridTheme } from 'ngx-tethys';

@Component({
    selector: 'thy-guider-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyGuiderBasicExampleComponent implements OnInit {
    public data = {
        title: 'basic example',
        description:
            '欢迎使用 PingCode 开启高效研发，我们将通过简单的指引，帮助你快速熟悉产品，让你更便捷的开始工作欢迎使用 PingCode 开启高效研发，我们将通过简单的指引，帮助你快速熟悉产品，让你更便捷的开始工作欢迎使用 PingCode 开启高效研发'
    };
    ngOnInit() {}
}
