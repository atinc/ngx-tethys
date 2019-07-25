import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
    selector: 'demo-flexible-text',
    templateUrl: './flexible-text-section.component.html',
    styleUrls: ['./flexible-text-section.scss']
})
export class DemoFlexibleTextComponent implements OnInit {
    title1 = {
        text: `【内容超出，显示Tooltip】周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗`,
        value: 0,
        placement: 'bottom'
    };

    title2 = {
        text: `标题未超出一定宽度，tooltip不提示全部内容`,
        value: 1,
        placement: 'top'
    };

    public apiThyFlexibleTextParameters = [
        {
            property: 'thyTooltipContent',
            description: '需要展示的全部内容',
            type: 'String | TemplateRef',
            default: 'String'
        },
        {
            property: 'thyTooltipPlacement',
            description: 'tooltip 的提示位置，top | bottom | left | right',
            type: 'String',
            default: 'top'
        },
        {
            property: 'thyTooltipTrigger',
            description: '触发提示方式，hover, focus, click',
            type: 'string',
            default: 'hover'
        }
    ];

    constructor() {}

    ngOnInit() {
        timer(5000).subscribe(() => {
            this.title2.text = `周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
            车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗周杰伦练琴辛酸史家长进游戏群控诉韩国一桑拿房起火伊斯兰堡会谈推迟游客夫妻美国被捕黄晓明否认拒演京东回应收集隐私救护
            车高速被堵沈祥福回应炮轰烟台回应广告牌美国奥罗`;
        });
    }
}
