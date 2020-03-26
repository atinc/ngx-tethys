import { Component, OnInit } from '@angular/core';
import { DemoBadgeBasicComponent } from './demo/basic/basic.component';
import { DemoBadgeIndependentUseComponent } from './demo/independent-use/independent-use.component';
import { DemoBadgeStatePointComponent } from './demo/state-point/state-point.component';
import { DemoBadgeSpecialComponent } from './demo/special/special.component';

@Component({
    selector: 'demo-badge-section',
    templateUrl: './badge-section.component.html',
    styleUrls: ['./badge-section.component.scss']
})
export class DemoBadgeSectionComponent implements OnInit {
    badgeDotTheme;

    themes = ['danger', 'primary', 'warning', 'secondary'];

    nullValue;

    public apiParameters = [
        {
            property: 'thyType',
            description: `badge类型, 类型为 'primary' | 'danger' | 'warning' | 'secondary'`,
            type: 'string',
            default: 'danger'
        },
        {
            property: 'thyCount',
            description: '徽标内容为数字时',
            type: 'number',
            default: ''
        },
        {
            property: 'thyContext',
            description: '徽标内容是字符串时',
            type: 'string',
            default: 'false'
        },
        {
            property: 'thyMaxCount',
            description:
                '徽标显示的最大值, 与thyCount一起使用,thyCount超过了thyMaxCount设置的值时,徽标内容为thyMaxCount+',
            type: 'number',
            default: ''
        },
        {
            property: 'thySize',
            description: '徽标显示的大小',
            type: `lg | sm`,
            default: `font-size: 0.75rem, padding: 2px 0.3rem`
        },
        {
            property: 'thyIsDot',
            description: '徽标是个状态点且实心时',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyIsHollow',
            description: '徽标是个状态点且空心时',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyKeepShow',
            description: 'thyCount为0时,强制显示',
            type: 'boolean',
            default: ''
        },
        {
            property: 'thyTextColor',
            description: '自定义设置徽标字体的颜色',
            type: 'string',
            default: ''
        },
        {
            property: 'thyBackgroundColor',
            description: '自定义设置徽标的背景颜色',
            type: 'string',
            default: ''
        }
    ];

    public liveDemos = [
        {
            title: '基本使用',
            description:
                '简单的不同类型的徽章显示，thyCount=0时默认不显示,可以使用thyKeepShow=true强制显示,可以展示最大值,也可以自定义传入显示内容',
            component: DemoBadgeBasicComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: `basic.component.html`,
                    content: require(`!!raw-loader!./demo/basic/basic.component.html`)
                },
                {
                    type: 'ts',
                    name: `basic.component.ts`,
                    content: require(`!!raw-loader!./demo/basic/basic.component.ts`)
                }
            ]
        },
        {
            title: '独立使用',
            description: `不包裹任何元素即是独立使用,可以通过thySize: sm | lg展示不同大小`,
            component: DemoBadgeIndependentUseComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: `independent-use.component.html`,
                    content: require(`!!raw-loader!./demo/independent-use/independent-use.component.html`)
                },
                {
                    type: 'ts',
                    name: `independent-use.component.ts`,
                    content: require(`!!raw-loader!./demo/independent-use/independent-use.component.ts`)
                }
            ]
        },
        {
            title: '状态点',
            description: `右上角展示小圆点,也可以单独展示`,
            component: DemoBadgeStatePointComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: `state-point.component.html`,
                    content: require(`!!raw-loader!./demo/state-point/state-point.component.html`)
                },
                {
                    type: 'ts',
                    name: `state-point.component.ts`,
                    content: require(`!!raw-loader!./demo/state-point/state-point.component.ts`)
                }
            ]
        },
        {
            title: '指令使用,可以自定义设置字体颜色和背景色',
            description: `自定义设置字体颜色和背景色`,
            component: DemoBadgeSpecialComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: `special.component.html`,
                    content: require(`!!raw-loader!./demo/special/special.component.html`)
                },
                {
                    type: 'ts',
                    name: `state-point.component.ts`,
                    content: require(`!!raw-loader!./demo/special/special.component.ts`)
                }
            ]
        }
    ];

    constructor() {}

    ngOnInit() {
        setInterval(() => {
            this.badgeDotTheme = this.themes[Math.floor(Math.random() * this.themes.length)];
        }, 2000);
    }
}
