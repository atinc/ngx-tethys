import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { tap, delay } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { taskTypes } from './mock-data';
import { LiveDemoCodeExample } from 'app/core/live-demo/live-demo.component';
import { CustomSelectBasicComponent } from './basic/custom-select-basic.component';
import { CustomSelectEmptyComponent } from './empty/custom-select-empty.component';

@Component({
    selector: 'demo-select-section',
    templateUrl: './select-section.component.html',
    styleUrls: ['./select-section.scss']
})
export class DemoSelectSectionComponent implements OnInit {
    // model = {
    //     selectedValue: '',
    //     allowClear: false
    // };

    // allowClear = false;

    // multiple = 'multiple';

    // page = 0;

    // emptyModalValue = '';

    // selectedItem1: any;

    // selectedItem2: any;

    // selectedItem3 = '';

    // selectedItem4 = ['5b0527cfc8f2ff200a33d4aa', '5b0527cfc8f2ff200a33d4ab'];

    // expand = false;

    // showSearch = false;

    // optionData = [];

    // loadMoreData = [];

    // loading = false;

    // haveMore = true;

    // selectedItem = this.optionData[0];

    // errorSelectedItem = {};

    // thyModeValue: any = null;

    // public apiParameters = [
    //     {
    //         property: 'thySize',
    //         description: '大小，sm | md | lg',
    //         type: 'String',
    //         default: ''
    //     },
    //     {
    //         property: 'thyShowSearch',
    //         description: '下拉列表是否显示搜索框',
    //         type: 'boolean',
    //         default: 'false'
    //     },
    //     {
    //         property: 'thyPlaceHolder',
    //         description: '选择框默认文字',
    //         type: 'string',
    //         default: ''
    //     },
    //     {
    //         property: 'thyServerSearch',
    //         description: '是否使用服务端搜索，当为 true 时，将不再在前端进行过滤',
    //         type: 'boolean',
    //         default: 'false'
    //     },
    //     {
    //         property: 'thyOnSearch',
    //         description: '搜索时回调',
    //         type: '(searchText:string)=>{}'
    //     },
    //     {
    //         property: 'thyMode',
    //         description: '下拉选择模式',
    //         type: '"" | multiple',
    //         default: ''
    //     },
    //     {
    //         property: 'thyAllowClear',
    //         description: '单选(thyMode=""或者不设置)时，选择框支持清除',
    //         type: 'boolean',
    //         default: 'false'
    //     },
    //     {
    //         property: 'thyEmptyStateText',
    //         description: '数据为空时显示的提示文字',
    //         type: 'string',
    //         default: ''
    //     },
    //     {
    //         property: 'thyDisabled',
    //         description: '是否禁用，如果使用了 ngModel，也可以使用 disabled 属性',
    //         type: 'boolean',
    //         default: 'false'
    //     },
    //     {
    //         property: 'thyEnableScrollLoad',
    //         description: '滚动加载是否可用, 只能当这个参数可以，下面的thyOnScrollToBottom事件才会触发',
    //         type: 'boolean',
    //         default: 'false'
    //     },
    //     {
    //         property: 'thyOnScrollToBottom',
    //         description: 'output event: 下拉菜单滚动到底部事件，可以用这个事件实现滚动加载',
    //         type: '()=>{}'
    //     },
    //     {
    //         property: 'thyOnExpandStatusChange',
    //         description: 'output event: 下拉菜单展开和这点状态事件',
    //         type: '(openStatus: boolean)=>{}'
    //     }
    // ];

    // public optionApiParameters = [
    //     {
    //         property: 'thyValue',
    //         description: '每个option的value值',
    //         type: 'string',
    //         default: ''
    //     },
    //     {
    //         property: 'thyLabelText',
    //         description: '每个option的label，用于显示',
    //         type: 'string',
    //         default: ''
    //     },
    //     {
    //         property: 'thyShowOptionCustom',
    //         description: '是否自定义展示option内容',
    //         type: 'boolean',
    //         default: 'false'
    //     },
    //     {
    //         property: 'thySearchKey',
    //         description:
    //             '传入搜索需要的关键字，支持多个关键字（“{{display_name}},{{name}},{{pin_yin}}”），如不传则默认按照label进行搜索,此为前端过滤',
    //         type: 'string',
    //         default: ''
    //     },
    //     {
    //         property: 'thyDisabled',
    //         description: '是否禁用',
    //         type: 'boolean',
    //         default: 'false'
    //     },
    //     {
    //         property: 'thySortComparator',
    //         description: '排序比较函数',
    //         type: 'function',
    //         default: undefined
    //     }
    // ];

    // public groups = [
    //     {
    //         groupName: '企业成员',
    //         items: [
    //             {
    //                 _id: 'sadfasdfasdfasfdasdfs1',
    //                 name: 'wangwu'
    //             },
    //             {
    //                 _id: 'sadfasdfasdfasfdasdfs2',
    //                 name: 'lisi'
    //             },
    //             {
    //                 _id: 'sadfasdfasdfasfdasdfs3',
    //                 name: 'zhangsan'
    //             }
    //         ]
    //     },
    //     {
    //         groupName: '公开群组',
    //         items: [
    //             {
    //                 _id: 'sadfasdfasdfasfdasdfs5',
    //                 name: '公告',
    //                 pin_yin: 'gg'
    //             },
    //             {
    //                 _id: 'sadfasdfasdfasfdasdfs6',
    //                 name: '狼人杀',
    //                 pin_yin: 'lrs'
    //             },
    //             {
    //                 _id: 'sadfasdfasdfasfdasdfs7',
    //                 name: '前端',
    //                 pin_yin: 'qd'
    //             },
    //             {
    //                 _id: 'sadfasdfasdfasfdasdfs8',
    //                 name: '小菲',
    //                 pin_yin: 'xf'
    //             }
    //         ]
    //     }
    // ];

    // constructor(private cdr: ChangeDetectorRef) {
    //     this.selectedItem3 = '003';
    //     setTimeout(() => {
    //         this.optionData = taskTypes;
    //     }, 2000);
    // }

    // change() {
    //     console.log(`select change value as :${this.model.selectedValue}`);
    // }

    // changeSelect() {
    //     console.log('success');
    // }

    // searchTextChange(event: any) {
    //     console.log(event);
    // }

    // selectMultiple() {
    //     console.log(this.selectedItem4);
    // }

    // clearSelected() {
    //     this.selectedItem4 = [];
    // }

    // onScrollToBottom() {
    //     if (!this.loading && this.haveMore) {
    //         this.page++;
    //         this._fetchOptions().subscribe(() => {
    //             this.loading = false;
    //         });
    //     }
    // }

    // ngModelChange(data) {
    //     console.log(data);
    // }

    // _fetchOptions() {
    //     this.loading = true;
    //     return timer(1000).pipe(
    //         tap(() => {
    //             switch (this.page) {
    //                 case 1:
    //                     this.loadMoreData = [
    //                         { thyLabelText: '第一页', _id: '1' },
    //                         { thyLabelText: '第一页', _id: '1' },
    //                         { thyLabelText: '第一页', _id: '1' },
    //                         { thyLabelText: '第一页', _id: '1' },
    //                         { thyLabelText: '第一页', _id: '1' },
    //                         { thyLabelText: '第一页', _id: '1' },
    //                         { thyLabelText: '第一页', _id: '1' },
    //                         { thyLabelText: '第一页', _id: '1' }
    //                     ];
    //                     this.haveMore = true;
    //                     break;
    //                 case 2:
    //                     this.loadMoreData = [
    //                         ...this.loadMoreData,
    //                         { thyLabelText: '第二页', _id: '2' },
    //                         { thyLabelText: '第二页', _id: '2' },
    //                         { thyLabelText: '第二页', _id: '2' },
    //                         { thyLabelText: '第二页', _id: '2' },
    //                         { thyLabelText: '第二页', _id: '2' },
    //                         { thyLabelText: '第二页', _id: '2' },
    //                         { thyLabelText: '第二页', _id: '2' },
    //                         { thyLabelText: '第二页', _id: '2' }
    //                     ];
    //                     this.haveMore = true;
    //                     break;
    //                 case 3:
    //                     this.loadMoreData = [
    //                         ...this.loadMoreData,
    //                         { thyLabelText: '第三页', _id: '2' },
    //                         { thyLabelText: '第三页', _id: '2' },
    //                         { thyLabelText: '第三页', _id: '2' },
    //                         { thyLabelText: '第三页', _id: '2' },
    //                         { thyLabelText: '第三页', _id: '2' },
    //                         { thyLabelText: '第三页', _id: '2' },
    //                         { thyLabelText: '第三页', _id: '2' },
    //                         { thyLabelText: '第三页', _id: '2' }
    //                     ];
    //                     this.haveMore = false;
    //                     break;
    //                 default:
    //                     break;
    //             }
    //             this.loadMoreData.forEach((item, index: number) => {
    //                 item._id = item._id + index;
    //             });
    //         })
    //     );
    // }

    // multipleStatusChange(value: boolean) {
    //     if (value) {
    //         this.multiple = 'multiple';
    //     } else {
    //         this.multiple = '';
    //     }
    // }

    //#region 参数说明
    public apiParameters = [
        {
            property: 'thySize',
            description: '大小，sm | md | lg',
            type: 'String',
            default: ''
        },
        {
            property: 'thyShowSearch',
            description: '下拉列表是否显示搜索框',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyPlaceHolder',
            description: '选择框默认文字',
            type: 'string',
            default: ''
        },
        {
            property: 'thyServerSearch',
            description: '是否使用服务端搜索，当为 true 时，将不再在前端进行过滤',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyOnSearch',
            description: '搜索时回调',
            type: '(searchText:string)=>{}'
        },
        {
            property: 'thyMode',
            description: '下拉选择模式',
            type: '"" | multiple',
            default: ''
        },
        {
            property: 'thyAllowClear',
            description: '单选(thyMode=""或者不设置)时，选择框支持清除',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyEmptyStateText',
            description: '数据为空时显示的提示文字',
            type: 'string',
            default: ''
        },
        {
            property: 'thyDisabled',
            description: '是否禁用，如果使用了 ngModel，也可以使用 disabled 属性',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyEnableScrollLoad',
            description: '滚动加载是否可用, 只能当这个参数可以，下面的thyOnScrollToBottom事件才会触发',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyOnScrollToBottom',
            description: 'output event: 下拉菜单滚动到底部事件，可以用这个事件实现滚动加载',
            type: '()=>{}'
        },
        {
            property: 'thyOnExpandStatusChange',
            description: 'output event: 下拉菜单展开和这点状态事件',
            type: '(openStatus: boolean)=>{}'
        }
    ];

    public optionApiParameters = [
        {
            property: 'thyValue',
            description: '每个option的value值',
            type: 'string',
            default: ''
        },
        {
            property: 'thyLabelText',
            description: '每个option的label，用于显示',
            type: 'string',
            default: ''
        },
        {
            property: 'thyShowOptionCustom',
            description: '是否自定义展示option内容',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thySearchKey',
            description:
                '传入搜索需要的关键字，支持多个关键字（“{{display_name}},{{name}},{{pin_yin}}”），如不传则默认按照label进行搜索,此为前端过滤',
            type: 'string',
            default: ''
        },
        {
            property: 'thyDisabled',
            description: '是否禁用',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thySortComparator',
            description: '排序比较函数',
            type: 'function',
            default: undefined
        }
    ];
    //#endregion

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: CustomSelectBasicComponent,
            description: `Custom-Select功能展示`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'custom-select-basic.component.html',
                    content: require('!!raw-loader!./basic/custom-select-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'custom-select-basic.component.ts',
                    content: require('!!raw-loader!./basic/custom-select-basic.component.ts')
                }
            ]
        },
        {
            title: '选项为空',
            component: CustomSelectEmptyComponent,
            description: `Custom-Select 选项为空的默认展示`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'custom-select-empty.component.html',
                    content: require('!!raw-loader!./empty/custom-select-empty.component.html')
                },
                {
                    type: 'ts',
                    name: 'custom-select-empty.component.ts',
                    content: require('!!raw-loader!./empty/custom-select-empty.component.ts')
                }
            ]
        }
    ];

    ngOnInit() {
        // this.page++;
        // this._fetchOptions().subscribe(() => {
        //     this.loading = false;
        // });
    }
}
