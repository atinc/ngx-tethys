import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-flexible-text',
    templateUrl: './flexible-text-section.component.html',
    styleUrls: ['./flexible-text-section.scss']
})
export class DemoFlexibleTextComponent implements OnInit {
    titles = [
        {
            title: `周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
        车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
        车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗`,
            value: 0,
            placement: 'bottom'
        },
        {
            title: `标题未超出一定宽度，tooltip不提示全部内容`,
            value: 1,
            placement: 'top'
        },
        {
            title: `文本内容超出当前所设最大宽度，超出部分省略，并显示省略号，tooltip提示全部内容`,
            value: 2,
            placement: 'top'
        }
    ];

    public apiThyFlexibleTextParameters = [
        {
            property: 'thyContent',
            description: '需要展示的全部内容',
            type: 'String | TemplateRef',
            default: 'String'
        },
        {
            property: 'thyPlacement',
            description: 'tooltip 的提示位置，top | bottom | left | right',
            type: 'String',
            default: 'top'
        }
    ];

    constructor() {}

    ngOnInit() {}
}
