import { Component, ViewEncapsulation } from '@angular/core';
import { LiveDemoCodeExample } from './../../core/live-demo/live-demo.component';
import { DemoInputAppendComponent } from './demo/append/append.component';
import { DemoInputBasicComponent } from './demo/basic/basic.component';
import { DemoInputLabelComponent } from './demo/label/label.component';
import { DemoInputPasswordComponent } from './demo/password/password.component';
import { DemoInputPrependAppendComponent } from './demo/prepend-append/prepend-append.component';
import { DemoInputSearchComponent } from './demo/search/search.component';
import { DemoInputSizeComponent } from './demo/size/size.component';

@Component({
    selector: 'demo-input-section',
    templateUrl: './input-section.component.html',
    styleUrls: ['./input-section.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InputSectionComponent {
    public liveDemos: LiveDemoCodeExample[] = [
        this.combineLiveDemoCodeExampleSection('基本使用', '', DemoInputBasicComponent, 'basic'),
        this.combineLiveDemoCodeExampleSection('大小', '', DemoInputSizeComponent, 'size'),
        this.combineLiveDemoCodeExampleSection('后缀icon', '', DemoInputAppendComponent, 'append'),
        this.combineLiveDemoCodeExampleSection('前置/后置模版', '', DemoInputPrependAppendComponent, 'prepend-append'),
        this.combineLiveDemoCodeExampleSection('搜索框', '', DemoInputSearchComponent, 'search'),
        this.combineLiveDemoCodeExampleSection('悬浮label', '用在登录/注册表单', DemoInputLabelComponent, 'label'),
        this.combineLiveDemoCodeExampleSection('密码框', '', DemoInputPasswordComponent, 'password')
    ];

    public thyInputComponentAPI = [
        this.combineAPISection('placeholder', '', 'string', ''),
        this.combineAPISection('thySize', '大小', `'xs' | 'sm' | 'md' | 'lg'`, ''),
        this.combineAPISection('thyAutofocus', '自动焦点', 'boolean', 'false'),
        this.combineAPISection('type', 'input的type类型', 'string', 'text'),
        this.combineAPISection('thyType', 'input的type类型', 'string', 'text'),
        this.combineAPISection('thyLabelText', '', 'string', ''),
        this.combineAPISection('readonly', '', 'boolean', ''),
        this.combineAPISection('thyAutocomplete', '自动表单', 'boolean', 'false'),
        this.combineAPISection('focus EventEmitter', '焦点激活事件', '', ''),
        this.combineAPISection('blur EventEmitter', '失去焦点事件', '', '')
    ];

    public thyInputDirectiveAPI = [
        this.combineAPISection('thySize', '大小', `'xs' | 'sm' | 'md' | 'lg'`, ''),
        this.combineAPISection('thyAutocomplete', '自动表单', 'boolean', 'false')
    ];

    public thyInputSearchAPI = [
        this.combineAPISection('name', 'property name of NgModel', 'string', ''),
        this.combineAPISection('placeholder', '', 'string', ''),
        this.combineAPISection('thyTheme', '', `''|'ellipse'`, ''),
        this.combineAPISection('thySearchFocus', '自动焦点', 'boolean', 'false'),
        this.combineAPISection('clear EventEmitter', '点击清空事件', '', '')
    ];

    public thyInputGroupAPI = [
        this.combineAPISection('thyAppendText', '追加文本', 'string', ''),
        this.combineAPISection('thyAppendTextTranslateKey', '追加文本多语言 Key', 'string', ''),
        this.combineAPISection('thyPrependText', '前置文本', 'string', ''),
        this.combineAPISection('thyPrependTextTranslateKey', '前置文本多语言 Key', 'string', ''),
        this.combineAPISection('append', '追加的自定义 Template', 'NgTemplate', ''),
        this.combineAPISection('prepend', '前置的自定义 Template', 'NgTemplate', ''),
        this.combineAPISection('thySize', '大小', `'' | 'md' | 'lg'`, `''`),
        this.combineAPISection('readonly', '是否为只读', 'boolean', 'false'),
        this.combineAPISection('thySearchFocus', '自动焦点', 'boolean', 'false')
    ];

    constructor() {}

    protected combineAPISection(property: string, description: string, valueTypeOf: string, defaultValue: string) {
        return {
            property,
            description,
            type: valueTypeOf,
            default: defaultValue
        };
    }

    protected combineLiveDemoCodeExampleSection(
        title: string,
        description: string,
        component: any,
        codeFileName: string
    ) {
        return {
            title,
            description,
            component,
            codeExamples: [
                {
                    type: 'html',
                    name: `${codeFileName}.component.html`,
                    content: require(`!!raw-loader!./demo/${codeFileName}/${codeFileName}.component.html`)
                },
                {
                    type: 'ts',
                    name: `${codeFileName}.component.ts`,
                    content: require(`!!raw-loader!./demo/${codeFileName}/${codeFileName}.component.ts`)
                }
            ]
        };
    }
}
