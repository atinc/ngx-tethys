import { Component, TemplateRef, OnInit } from '@angular/core';
@Component({
    selector: 'demo-editor',
    templateUrl: './editor-section.component.html'
})
export class DemoEditorSectionComponent implements OnInit {

    public value = '<thy-editor [(ngModel)]="value" [config]="config"></thy-editor>';

    public config = { type: 'all', className: 'thy-editor-desc', isHeightFull: true };

    constructor(
    ) {
    }

    ngOnInit() {

    }
}
