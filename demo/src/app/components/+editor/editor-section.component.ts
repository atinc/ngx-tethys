import { Component, TemplateRef, OnInit } from '@angular/core';
@Component({
    selector: 'demo-editor',
    templateUrl: './editor-section.component.html'
})
export class DemoEditorSectionComponent implements OnInit {

    public value = ' :dizzy: :frowning: ';

    public config = {
        type: 'simple',
        placeholder:'这个是自定义的placeholder',
        uploadImg:{
            multiple: true,
            acceptType:['.gif','.jpeg']
        }
};

    // public thyMarkdownParserConfig = {
    //     emoji_style: 2,
    //     emoji_size: 2,
    //     cdnRoot: 'http://www.baidu.com'
    // };

    constructor(
    ) {
    }

    ngOnInit() {

    }
}
