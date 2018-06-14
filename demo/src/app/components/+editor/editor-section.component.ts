import { Component, TemplateRef, OnInit } from '@angular/core';
@Component({
    selector: 'demo-editor',
    templateUrl: './editor-section.component.html'
})
export class DemoEditorSectionComponent implements OnInit {

    public value = ' :dizzy: :frowning: ';

    public config = { type: 'all' };

    public thyMarkdownParserConfig = {
        emoji_style: 2,
        emoji_size: 2,
        cdnRoot: 'http://www.baidu.com'
    };

    constructor(
    ) {
    }

    filterHTMLAction(event) {
        return event;
    }

    ngOnInit() {

    }
}
