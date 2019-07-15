import { Component, TemplateRef } from '@angular/core';
import { ThyNotifyService } from '../../../../../src/notify/notify.service';
@Component({
    selector: 'demo-button-section',
    templateUrl: './button-section.component.html',
    styleUrls: ['./button-section.scss']
})
export class DemoButtonSectionComponent {
    apiThyButtonParameters = [
        {
            property: 'thyButton',
            description: `按钮类型，类型为 'primary' | 'secondary' | 'outline-primary' | 'outline-default' | 'danger' | 'link' | 'link-secondary'`,
            type: 'String',
            default: 'primary'
        },
        {
            property: 'thyType',
            description: `和 thyButton 含义相同，一般使用 thyButton，为了减少参数输入, 设置按钮组件通过 thy-button 时，只能使用该参数控制类型`,
            type: 'String',
            default: 'primary'
        },
        {
            property: 'thySize',
            description: `按钮大小，目前可传的大小为：sm，md`,
            type: 'String',
            default: ''
        },
        {
            property: 'thySquare',
            description: `按钮圆角恢复正常的方形，可以通过在 buttonType 后加上 -square 达到同样的效果，比如设置按钮类型为 outline-primary-square`,
            type: 'Boolean',
            default: ''
        },
        {
            property: 'thyIcon',
            description: `按钮中显示的图标,比如 wtf-plus，默认字体前缀是 wtf, 如果使用其他字体，加上其他的字体前缀，比如 fa fa-plus`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyLoading',
            description: `加载状态`,
            type: 'Boolean',
            default: ''
        },
        {
            property: 'thyLoadingText',
            description: `加载状态时显示的文案`,
            type: 'String',
            default: ''
        }
    ];

    apiThyButtonIconParameters = [
        {
            property: 'thyButtonIcon',
            description: `图标按钮的图标, 比如 wtf-plus，默认字体前缀是 wtf, 如果使用其他字体，加上其他的字体前缀，比如 fa fa-plus`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyIcon',
            description: `图标按钮的图标, 和 thyButtonIcon 类似，当使用 thy-button-icon 时，只能使用 thyIcon 设置图标`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyShape',
            description: `展示的形状，默认只显示字体图标图标，circle-dashed, circle-solid 展示成虚线,实线边框圆形图标, circle-thick-dashed, circle-thick-solid 边框加粗`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyTheme',
            description: `按钮展示类型，默认图标移上去显示主色， danger-weak 鼠标移上去显示 danger 红色`,
            type: 'String',
            default: ''
        },
        {
            property: 'thySize',
            description: `大小，xs | sm | lg | ''`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyLight',
            description: `亮色，颜色更浅，适合左侧导航顶部的按钮`,
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyActive',
            description: `设置为选中状态`,
            type: 'Boolean',
            default: 'false'
        }
    ];

    apiThyButtonGroupParameters = [
        {
            property: 'thySize',
            description: `大小，xs | sm | md | lg`,
            type: 'String',
            default: 'md'
        },

        {
            property: 'thyType',
            description: `outline-default, outline-primary,必填`,
            type: 'String'
        },

        {
            property: 'thyClearMinWidth',
            description: `是否需要最小宽度，默认值为false`,
            type: 'String',
            default: 'false'
        }
    ];

    loading: Boolean = false;

    loadingSeconds = 0;

    outlineButtonTemplate = `<button thyButton="outline-default">预览</button>
<button thyButton="outline-primary">新建文件夹</button>`;

    constructor(private thyNotifyService: ThyNotifyService) {}

    startLoading() {
        console.log('click loading');
        this.loading = true;
        this.loadingSeconds = 3;

        const interval = setInterval(() => {
            if (this.loadingSeconds === 0) {
                clearInterval(interval);
                this.loading = false;
            } else {
                this.loadingSeconds = this.loadingSeconds - 1;
            }
        }, 1000);
    }

    ok() {
        this.thyNotifyService.success('提示', '操作成功');
    }
}
