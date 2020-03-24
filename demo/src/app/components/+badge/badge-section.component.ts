import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-badge-section',
    templateUrl: './badge-section.component.html',
    styleUrls: ['./badge-section.component.scss']
})
export class DemoBadgeSectionComponent implements OnInit {
    badgeDotTheme;

    themes = ['danger', 'primary', 'warning', 'secondary'];

    nullValue;

    badgeCount = 0;

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

    constructor() {}

    ngOnInit() {
        setInterval(() => {
            this.badgeDotTheme = this.themes[Math.floor(Math.random() * this.themes.length)];
            this.badgeCount = Math.floor(Math.random() * 10);
        }, 2000);
    }
}
