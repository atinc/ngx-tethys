import { Component, TemplateRef, OnInit } from '@angular/core';
@Component({
    selector: 'demo-editor',
    templateUrl: './editor-section.component.html'
})
export class DemoEditorSectionComponent implements OnInit {
    public value = ' :dizzy: :frowning: ';

    public configMarkdownSimple = {
        type: 'simple',
        placeholder: '这个是自定义的placeholder',
        uploadImg: {
            multiple: true,
            acceptType: ['.gif', '.jpeg']
        },
        pattern: 'markdown'
    };

    public configMarkdownAll = {
        type: 'all',
        placeholder: '这个是自定义的placeholder',
        uploadImg: {
            multiple: true,
            acceptType: ['.gif', '.jpeg']
        },
        pattern: 'markdown'
    };

    public configRichSimple = {
        type: 'simple',
        placeholder: '这个是自定义的placeholder',
        uploadImg: {
            multiple: true,
            acceptType: ['.gif', '.jpeg']
        },
        pattern: 'rich'
    };

    public configRichAll = {
        type: 'all',
        placeholder: '这个是自定义的placeholder',
        uploadImg: {
            multiple: true,
            acceptType: ['.gif', '.jpeg']
        }
    };

    // public thyMarkdownParserConfig = {
    //     emoji_style: 2,
    //     emoji_size: 2,
    //     cdnRoot: 'http://www.baidu.com'
    // };
    constructor() {}

    ngOnInit() {}
}
