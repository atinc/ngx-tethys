import { Component, TemplateRef } from '@angular/core';
@Component({
    selector: 'demo-button-section',
    templateUrl: './button-section.component.html',
    //   styleUrls: ['./app.component.scss']
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
            description: `和 thyButton 含义相同，一般使用 thyButton，为了减少参数输入`,
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
            description: `按钮中显示的图标,比如 wtf-plus`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyIconPrefix',
            description: `按钮中显示的图标前缀，默认 wtf`,
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
            description: `图标按钮的图标, 比如 wtf-plus`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyIconPrefix',
            description: `图标前缀，默认 wtf`,
            type: 'String',
            default: 'wtf'
        },
        {
            property: 'thyType',
            description: `展示的类型，默认只有图标，circle-dashed, circle-solid 展示成虚线圆形图标`,
            type: 'String',
            default: ''
        },
        {
            property: 'thySize',
            description: `大小，xs | sm | lg | ''`,
            type: 'String',
            default: ''
        },
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
