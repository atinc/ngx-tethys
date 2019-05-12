import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-markdown-section',
    templateUrl: './markdown-section.component.html',
    styleUrls: ['./markdown-section.scss']
})
export class DemoMarkdownSectionComponent implements OnInit {
    public markdownValue = '**加粗**';

    constructor() {}

    ngOnInit() {}
}
