import { Component, OnInit, HostBinding } from '@angular/core';
import { DemoBadgeBasicComponent } from './demo/basic/basic.component';
import { DemoBadgeIndependentUseComponent } from './demo/independent-use/independent-use.component';
import { DemoBadgeStatePointComponent } from './demo/state-point/state-point.component';
import { DemoBadgeSpecialComponent } from './demo/special/special.component';
import { DemoBadgeOverflowComponent } from './demo/overflow/overflow.component';
import { DemoBadgeTypeComponent } from './demo/type/type.component';

@Component({
    selector: 'demo-badge-section',
    templateUrl: './badge-section.component.html'
    // styleUrls: ['./badge-section.component.scss']
})
export class DemoBadgeSectionComponent implements OnInit {
    @HostBinding(`class.demo-badge-section`) className = true;

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
            description: '简单的徽章展示，thyCount为0时默认不显示,可以使用thyKeepShow=true强制显示',
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
            title: '封顶数字',
            description: `超过 thyMaxCount 的会显示为 thyMaxCount+。`,
            component: DemoBadgeOverflowComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: `overflow.component.html`,
                    content: require(`!!raw-loader!./demo/overflow/overflow.component.html`)
                },
                {
                    type: 'ts',
                    name: `overflow.component.ts`,
                    content: require(`!!raw-loader!./demo/overflow/overflow.component.ts`)
                }
            ]
        },
        {
            title: '类型展示',
            description: `danger | primary | warning | secondary 四种基本类型, 默认thyType=danger, 也可以自定义字体颜色和背景色`,
            component: DemoBadgeTypeComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: `type.component.html`,
                    content: require(`!!raw-loader!./demo/type/type.component.html`)
                },
                {
                    type: 'ts',
                    name: `type.component.ts`,
                    content: require(`!!raw-loader!./demo/type/type.component.ts`)
                }
            ]
        },
        {
            title: '独立使用',
            description: `不包裹任何元素即是独立使用，可自定样式展现`,
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
            description: `可以作为状态点单独展示,也可以在右上角展示小圆点`,
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
            title: '指令使用',
            description: `thyBadge指令`,
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
