import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.scss']
})
export class DemoPaginationComponent implements OnInit {
    public page_ = 8;

    public pagination = {
        pageIndex: 1,
        pageSize: 20,
        total: 100
    };

    public page = 3;

    public apiParameters = [
        {
            property: '[(ngModel)]',
            description: `双向绑定值,当前页数`,
            type: 'Number',
            default: '1'
        },
        {
            property: '[thyPageIndex]',
            description: `与ngModel作用相同`,
            type: 'Number',
            default: '1'
        },
        {
            property: '[thyPageSize]',
            description: `每页条目数量`,
            type: 'Number',
            default: '20'
        },
        {
            property: '[thyTotal]',
            description: `总页数 与 totalPages 二选一传入`,
            type: 'Number',
            default: '-'
        },
        {
            property: '[thySize]',
            description: `设置分页组件的大小 可选值：'sm' | 'md'`,
            type: 'String',
            default: '-'
        },
        {
            property: '[thyMarginalCount]',
            description: `设置边缘显示数量`,
            type: 'Number',
            default: '2'
        },
        {
            property: '[thyRangeCount]',
            description: `设置中间区域显示数量`,
            type: 'Number',
            default: '7'
        },
        {
            property: '[thyMaxCount]',
            description: `设置最大显示数量，超出最大显示数后会自动进行分割显示`,
            type: 'Number',
            default: '9'
        },
        {
            property: '[disabled]',
            description: `禁用`,
            type: 'Boolean',
            default: 'false'
        },
        {
            property: '[thyShowJumper]',
            description: `显示快速跳转`,
            type: 'Boolean',
            default: 'false'
        },
        {
            property: '[thyHideOnSinglePage]',
            description: `只有一页时是否隐藏分页器`,
            type: 'Boolean',
            default: 'false'
        },
        {
            property: '(thyPageChanged)',
            description: `页码改变的回调`,
            type: 'ThyPaginationChangedEvent: { event , page , pageIndex}',
            default: '-'
        }
    ];

    public configParameters = [
        {
            property: 'boundaryLinks',
            description: `是否显示第一页和最后一页`,
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'directionLinks',
            description: `是否显示上一页和下一页`,
            type: 'Boolean',
            default: 'true'
        },
        {
            property: 'pageSize',
            description: `设置默认每页显示条数`,
            type: 'Number',
            default: '20'
        },
        {
            property: 'maxCount',
            description: `设置最大显示数量，超出最大显示数后会自动进行分割显示`,
            type: 'Number',
            default: '9'
        },
        {
            property: 'showJumper',
            description: `设置是否显示快速跳转`,
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'firstText',
            description: `第一页按钮显示文本`,
            type: 'String',
            default: '第一页'
        },
        {
            property: 'lastText',
            description: `最后一页按钮显示文本`,
            type: 'String',
            default: '最后一页'
        },
        {
            property: 'previousText',
            description: `上一页显示文本`,
            type: 'String',
            default: '上一页'
        },
        {
            property: 'nextText',
            description: `下一页显示文本`,
            type: 'String',
            default: '下一页'
        },
        {
            property: 'firstIcon',
            description: `第一页按钮显示图标`,
            type: 'String',
            default: '-'
        },
        {
            property: 'lastIcon',
            description: `最后一页按钮显示图标`,
            type: 'String',
            default: '-'
        },
        {
            property: 'previousIcon',
            description: `上一页显示图标`,
            type: 'String',
            default: '-'
        },
        {
            property: 'nextIcon',
            description: `下一页显示图标`,
            type: 'String',
            default: '-'
        },
        {
            property: 'totalPagesFormat',
            description: `设置总页数显示格式`,
            type: 'String',
            default: '共{total}页'
        }
    ];

    ngOnInit() {}
}
