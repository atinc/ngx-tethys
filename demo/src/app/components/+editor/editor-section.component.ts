import { Component, TemplateRef, OnInit } from '@angular/core';
@Component({
    selector: 'demo-editor',
    templateUrl: './editor-section.component.html'
})
export class DemoEditorSectionComponent implements OnInit {

    public value = 'this is thy-editor';

    public config = { type: 'all', className: 'thy-editor-desc', autofocus: false, autoHeight: true };

    constructor(
    ) {
    }

    ngOnInit() {

    }

}
