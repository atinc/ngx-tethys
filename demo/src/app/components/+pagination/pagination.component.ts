import { Component, OnInit } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoPaginationBasicComponent } from './basic/pagination-basic.component';
import { DemoPaginationMoreComponent } from './more/pagination-more.component';
import { DemoPaginationJumperComponent } from './jumper/pagination-jumper.component';
import { DemoPaginationRangeComponent } from './range/pagination-range.component';
import { DemoPaginationSizeComponent } from './size/pagination-size.component';
import { DemoPaginationShowTotalComponent } from './show-total/pagination-show-total.component';
@Component({
    selector: 'demo-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.scss']
})
export class DemoPaginationComponent implements OnInit {
    public apiParameters = [
        {
            property: '[(thyPageIndex)]',
            description: `设置当前页，支持双向绑定`,
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
            description: `设置分页组件的大小 可选值：'sm' | 'lg'`,
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
            property: '[thyDisabled]',
            description: `禁用`,
            type: 'Boolean',
            default: 'false'
        },
        {
            property: '[thyShowQuickJumper]',
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
            description: `与Bootstrap pagination 兼容，后续版本会进行删除，参数保持与 bootstrap 一致`,
            type: 'ThyPaginationChangedEvent: { page }',
            default: '-'
        },
        {
            property: '(thyPageIndexChange)',
            description: `页码改变的回调`,
            type: 'ThyPaginationChangedEvent: number',
            default: '-'
        },
        {
            property: '[thyShowTotal]',
            description: `是否显示左侧total`,
            type: 'Boolean | Template',
            default: 'false'
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
            property: 'showQuickJumper',
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

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基础分页',
            component: DemoPaginationBasicComponent,
            description: '',
            codeExamples: [
                {
                    type: 'html',
                    name: 'pagination-basic.component.html',
                    content: require('!!raw-loader!./basic/pagination-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'pagination-basic.component.ts',
                    content: require('!!raw-loader!./basic/pagination-basic.component.ts')
                }
            ]
        },
        {
            title: '更多分页',
            component: DemoPaginationMoreComponent,
            description: '',
            codeExamples: [
                {
                    type: 'html',
                    name: 'pagination-more.component.html',
                    content: require('!!raw-loader!./more/pagination-more.component.html')
                },
                {
                    type: 'ts',
                    name: 'pagination-more.component.ts',
                    content: require('!!raw-loader!./more/pagination-more.component.ts')
                }
            ]
        },
        {
            title: '显示跳转',
            component: DemoPaginationJumperComponent,
            description: '',
            codeExamples: [
                {
                    type: 'html',
                    name: 'pagination-jumper.component.html',
                    content: require('!!raw-loader!./jumper/pagination-jumper.component.html')
                },
                {
                    type: 'ts',
                    name: 'pagination-jumper.component.ts',
                    content: require('!!raw-loader!./jumper/pagination-jumper.component.ts')
                }
            ]
        },
        {
            title: '设置不同范围',
            component: DemoPaginationRangeComponent,
            description: '',
            codeExamples: [
                {
                    type: 'html',
                    name: 'pagination-range.component.html',
                    content: require('!!raw-loader!./range/pagination-range.component.html')
                },
                {
                    type: 'ts',
                    name: 'pagination-range.component.ts',
                    content: require('!!raw-loader!./range/pagination-range.component.ts')
                }
            ]
        },
        {
            title: '设置大小',
            component: DemoPaginationSizeComponent,
            description: '',
            codeExamples: [
                {
                    type: 'html',
                    name: 'pagination-size.component.html',
                    content: require('!!raw-loader!./size/pagination-size.component.html')
                },
                {
                    type: 'ts',
                    name: 'pagination-size.component.ts',
                    content: require('!!raw-loader!./size/pagination-size.component.ts')
                }
            ]
        },
        {
            title: '设置是否显示左侧total',
            component: DemoPaginationShowTotalComponent,
            description: '',
            codeExamples: [
                {
                    type: 'html',
                    name: 'pagination-show-total.component.html',
                    content: require('!!raw-loader!./show-total/pagination-show-total.component.html')
                },
                {
                    type: 'ts',
                    name: 'pagination-show-total.component.ts',
                    content: require('!!raw-loader!./show-total/pagination-show-total.component.ts')
                }
            ]
        }
    ];

    ngOnInit() {}
}
