import { Component, TemplateRef } from '@angular/core';
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
            description: `展示的形状，默认只显示字体图标图标，circle-dashed, circle-solid 展示成虚线圆形图标`,
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
        }
    ];

    loading: Boolean = false;

    loadingSeconds = 0;

    outlineButtonTemplate = `<button thyButton="outline-default">预览</button>
<button thyButton="outline-primary">新建文件夹</button>`;

    constructor() {
    }

    startLoading() {
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
}
